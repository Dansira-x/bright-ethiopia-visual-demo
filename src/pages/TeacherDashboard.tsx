// src/pages/TeacherDashboard.tsx
import { useEffect, useMemo, useState } from 'react';
import { Activity, ClassRoom, LessonPlan, Message, Resource, Score, Student } from '../types/edu';
import { api } from '../lib/api';
import { byGrade, classStudents } from '../lib/mockData';

const TabKeys = ['Overview', 'Classes', 'Curriculum', 'Analytics', 'Messages', 'Resources', 'Assessments', 'Settings'] as const;
type TabKey = typeof TabKeys[number];

export default function TeacherDashboard() {
  // Replace with actual auth context
  const [tab, setTab] = useState<TabKey>('Overview');

  const [teacherName, setTeacherName] = useState<string>('Loading...');
  const [classes, setClasses] = useState<ClassRoom[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [plans, setPlans] = useState<LessonPlan[]>([]);
  const [scores, setScores] = useState<Score[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const me = await api.me();
      setTeacherName(me.name);
      const cls = await api.classesByTeacher(me.id);
      setClasses(cls);
      setStudents(await api.students());
      setActivities(await api.activities());
      setPlans(await api.lessonPlans());
      setScores(await api.scores());
      setMessages(await api.messages());
      setResources(await api.resources());
      setLoading(false);
    })();
  }, []);

  return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-indigo-50 border-b border-indigo-100 px-4 py-2 text-center text-sm text-indigo-800">Demo Preview — Teacher dashboard with illustrative sample data.</div>
        <header className="sticky top-0 z-10 border-b bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-xl font-semibold">Teacher Dashboard</span>
              <span className="rounded bg-indigo-100 px-2 py-1 text-sm text-indigo-700">{teacherName}</span>
            </div>
            <nav className="flex flex-wrap gap-2">
              {TabKeys.map(k => (
                <button
                  key={k}
                  className={`rounded-md px-3 py-2 text-sm ${tab === k ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => setTab(k)}
                >
                  {k}
                </button>
              ))}
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6">
          {loading ? (
            <div className="rounded-md bg-white p-6 shadow">Loading data...</div>
          ) : (
            <>
              {tab === 'Overview' && <Overview classes={classes} students={students} plans={plans} messages={messages} />}
              {tab === 'Classes' && <Classes classes={classes} students={students} onAddStudent={async (c, s) => {
                await api.addStudentToClass(c.id, s.id);
                // Optimistic update
                setClasses(prev => prev.map(pc => pc.id === c.id ? { ...pc, studentIds: Array.from(new Set([...pc.studentIds, s.id])) } : pc));
              }} />}
              {tab === 'Curriculum' && <Curriculum classes={classes} activities={activities} plans={plans} />}
              {tab === 'Analytics' && <Analytics classes={classes} students={students} scores={scores} activities={activities} />}
              {tab === 'Messages' && <Messages classes={classes} messages={messages} onSend={async (payload) => {
                const saved = await api.postMessage(payload);
                setMessages(prev => [saved, ...prev]);
              }} />}
              {tab === 'Resources' && <Resources resources={resources} />}
              {tab === 'Assessments' && <Assessments activities={activities} scores={scores} students={students} />}
              {tab === 'Settings' && <Settings />}
            </>
          )}
        </main>
      </div>
  );
}

// Overview
function Overview({
  classes,
  plans,
  messages,
}: {
  classes: ClassRoom[];
  students: Student[];
  plans: LessonPlan[];
  messages: Message[];
}) {
  const totalStudents = useMemo(() => classes.reduce((acc, c) => acc + c.studentIds.length, 0), [classes]);
  const upcoming = useMemo(() => plans.slice(0, 3), [plans]);
  const recentMsgs = useMemo(() => messages.slice(0, 3), [messages]);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="col-span-2 rounded-md bg-white p-5 shadow">
        <h2 className="mb-3 text-lg font-semibold">Snapshot</h2>
        <div className="grid grid-cols-3 gap-4">
          <Stat label="Classes" value={classes.length} />
          <Stat label="Students" value={totalStudents} />
          <Stat label="Upcoming lessons" value={upcoming.length} />
        </div>
        <div className="mt-6">
          <h3 className="mb-2 text-sm font-medium text-gray-600">Next lessons</h3>
          <ul className="space-y-2">
            {upcoming.map(lp => (
              <li key={lp.id} className="flex items-center justify-between rounded border px-3 py-2">
                <span>{lp.date} • {classes.find(c => c.id === lp.classId)?.name}</span>
                <span className="text-sm text-gray-500">{lp.activities.length} activities</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-md bg-white p-5 shadow">
        <h2 className="mb-3 text-lg font-semibold">Recent messages</h2>
        <ul className="space-y-2">
          {recentMsgs.map(m => (
            <li key={m.id} className="rounded border px-3 py-2">
              <div className="text-sm text-gray-600">{new Date(m.createdAt).toLocaleString()}</div>
              <div>{m.body}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-md bg-white p-5 shadow md:col-span-3">
        <h2 className="mb-3 text-lg font-semibold">Classes</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {classes.map(c => (
            <div key={c.id} className="rounded border p-4">
              <div className="font-medium">{c.name}</div>
              <div className="text-sm text-gray-600">Grade {c.grade}</div>
              <div className="mt-2 text-sm text-gray-600">{c.studentIds.length} students</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded border p-4">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}

// Classes
function Classes({
  classes,
  students,
  onAddStudent,
}: {
  classes: ClassRoom[];
  students: Student[];
  onAddStudent: (cls: ClassRoom, student: Student) => Promise<void>;
}) {
  const [query, setQuery] = useState('');
  return (
    <div className="space-y-6">
      <div className="rounded-md bg-white p-5 shadow">
        <h2 className="mb-3 text-lg font-semibold">Manage classes</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {classes.map(cls => {
            const roster = classStudents(cls, students);
            return (
              <div key={cls.id} className="rounded border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{cls.name}</div>
                    <div className="text-sm text-gray-600">Grade {cls.grade}</div>
                  </div>
                  <div className="rounded bg-indigo-50 px-2 py-1 text-xs text-indigo-700">{roster.length} students</div>
                </div>
                <ul className="mt-3 space-y-1">
                  {roster.map(s => <li key={s.id} className="text-sm">{s.name}</li>)}
                </ul>
                <div className="mt-4">
                  <label className="text-sm text-gray-600">Add student</label>
                  <div className="mt-1 flex gap-2">
                    <input
                      placeholder="Search by name..."
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                      className="flex-1 rounded border px-3 py-2 text-sm"
                    />
                    <select
                      className="rounded border px-2 py-2 text-sm"
                      onChange={async e => {
                        const s = students.find(st => st.id === e.target.value);
                        if (s) await onAddStudent(cls, s);
                      }}
                    >
                      <option value="">Select student</option>
                      {students
                        .filter(s => s.name.toLowerCase().includes(query.toLowerCase()))
                        .map(s => (
                          <option key={s.id} value={s.id}>{s.name} (G{s.grade})</option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Curriculum
function Curriculum({
  classes,
  activities,
  plans,
}: {
  classes: ClassRoom[];
  activities: Activity[];
  plans: LessonPlan[];
}) {
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id ?? '');
  const selectedClass = useMemo(() => classes.find(c => c.id === selectedClassId), [classes, selectedClassId]);
  const filtered = useMemo(() => (selectedClass ? byGrade(activities, selectedClass.grade) : []), [activities, selectedClass]);

  return (
    <div className="space-y-6">
      <div className="rounded-md bg-white p-5 shadow">
        <h2 className="mb-3 text-lg font-semibold">Lesson planning</h2>
        <div className="flex gap-3">
          <select className="rounded border px-2 py-2 text-sm" value={selectedClassId} onChange={e => setSelectedClassId(e.target.value)}>
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-600">Suggested activities</h3>
            <ul className="space-y-2">
              {filtered.map(a => (
                <li key={a.id} className="rounded border px-3 py-2">
                  <div className="font-medium">{a.title}</div>
                  <div className="text-xs text-gray-600">{a.subject} • {a.type} • {a.durationMin} min</div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-600">Existing plans</h3>
            <ul className="space-y-2">
              {plans.filter(p => p.classId === selectedClassId).map(p => (
                <li key={p.id} className="rounded border px-3 py-2">
                  <div className="font-medium">{p.date}</div>
                  <div className="text-xs text-gray-600">{p.activities.length} activities</div>
                  {p.notes && <div className="mt-1 text-sm">{p.notes}</div>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Analytics
function Analytics({
  classes,
  students,
  scores,
  activities,
}: {
  classes: ClassRoom[];
  students: Student[];
  scores: Score[];
  activities: Activity[];
}) {
  const [classId, setClassId] = useState<string>(classes[0]?.id ?? '');
  const roster = useMemo(() => (classes.find(c => c.id === classId) ? classStudents(classes.find(c => c.id === classId)!, students) : []), [classId, classes, students]);

  const studentScores = useMemo(() => {
    return roster.map(s => {
      const ss = scores.filter(sc => sc.studentId === s.id);
      const avg = ss.length ? Math.round(ss.reduce((a, b) => a + b.score, 0) / ss.length) : 0;
      const last = ss.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())[0];
      return { student: s, avg, last };
    });
  }, [roster, scores]);

  return (
    <div className="space-y-6">
      <div className="rounded-md bg-white p-5 shadow">
        <h2 className="mb-3 text-lg font-semibold">Student progress</h2>
        <div className="flex gap-3">
          <select className="rounded border px-2 py-2 text-sm" value={classId} onChange={e => setClassId(e.target.value)}>
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 text-left">Student</th>
                <th className="border px-3 py-2 text-left">Average</th>
                <th className="border px-3 py-2 text-left">Last activity</th>
                <th className="border px-3 py-2 text-left">Score</th>
                <th className="border px-3 py-2 text-left">Attempts</th>
              </tr>
            </thead>
            <tbody>
              {studentScores.map(r => (
                <tr key={r.student.id}>
                  <td className="border px-3 py-2">{r.student.name}</td>
                  <td className="border px-3 py-2">{r.avg}%</td>
                  <td className="border px-3 py-2">
                    {r.last ? activities.find(a => a.id === r.last.activityId)?.title : '—'}
                  </td>
                  <td className="border px-3 py-2">{r.last?.score ?? '—'}</td>
                  <td className="border px-3 py-2">{r.last?.attempts ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Messages
function Messages({
  classes,
  messages,
  onSend,
}: {
  classes: ClassRoom[];
  messages: Message[];
  onSend: (payload: Omit<Message, 'id' | 'createdAt'>) => Promise<void>;
}) {
  const [mode, setMode] = useState<'class' | 'student' | 'parent' | 'admin'>('class');
  const [recipientId, setRecipientId] = useState<string>(classes[0]?.id ?? '');
  const [body, setBody] = useState<string>('');

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-md bg-white p-5 shadow">
        <h2 className="mb-3 text-lg font-semibold">Send a message</h2>
        <div className="flex gap-3">
          <select className="rounded border px-2 py-2 text-sm" value={mode} onChange={e => setMode(e.target.value as any)}>
            <option value="class">Class</option>
            <option value="student">Student</option>
            <option value="parent">Parent</option>
            <option value="admin">Admin</option>
          </select>
          {mode === 'class' && (
            <select className="rounded border px-2 py-2 text-sm" value={recipientId} onChange={e => setRecipientId(e.target.value)}>
              {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          )}
          {mode === 'admin' && (
            <select className="rounded border px-2 py-2 text-sm" value={recipientId} onChange={e => setRecipientId(e.target.value)}>
              <option value="admin">School Admin</option>
            </select>
          )}
        </div>
        <textarea
          className="mt-3 w-full rounded border px-3 py-2 text-sm"
          rows={4}
          placeholder="Type your message..."
          value={body}
          onChange={e => setBody(e.target.value)}
        />
        <div className="mt-3">
          <button
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
            onClick={() => body.trim() && onSend({ senderId: 't-001', recipientType: mode, recipientId, body })}
          >
            Send
          </button>
        </div>
      </div>

      <div className="rounded-md bg-white p-5 shadow">
        <h2 className="mb-3 text-lg font-semibold">Inbox</h2>
        <ul className="space-y-2">
          {messages.map(m => (
            <li key={m.id} className="rounded border px-3 py-2">
              <div className="text-xs text-gray-600">{new Date(m.createdAt).toLocaleString()} • {m.recipientType}</div>
              <div>{m.body}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Resources
function Resources({ resources }: { resources: Resource[] }) {
  const [subject, setSubject] = useState<string>('All');
  const filtered = useMemo(() => resources.filter(r => subject === 'All' || r.subject === subject), [resources, subject]);

  return (
    <div className="space-y-6">
      <div className="rounded-md bg-white p-5 shadow">
        <h2 className="mb-3 text-lg font-semibold">Resource library</h2>
        <div className="flex gap-3">
          <select className="rounded border px-2 py-2 text-sm" value={subject} onChange={e => setSubject(e.target.value)}>
            <option>All</option>
            <option>Language</option>
            <option>Math</option>
            <option>Science</option>
            <option>Social</option>
            <option>Arts</option>
          </select>
          <button className="rounded-md bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700">Upload new</button>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {filtered.map(r => (
            <div key={r.id} className="rounded border p-4">
              <div className="font-medium">{r.title}</div>
              <div className="text-xs text-gray-600">{r.subject} • {r.type}</div>
              <div className="mt-2">
                <a className="text-indigo-600 hover:underline" href={r.url}>Open</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Assessments
function Assessments({
  activities,
  scores,
  students,
}: {
  activities: Activity[];
  scores: Score[];
  students: Student[];
}) {
  const [activityId, setActivityId] = useState<string>(activities[0]?.id ?? '');
  const activity = activities.find(a => a.id === activityId);

  const rows = useMemo(() => {
    return students.map(s => {
      const sc = scores.filter(x => x.studentId === s.id && x.activityId === activityId).sort(
        (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      )[0];
      return { s, sc };
    });
  }, [students, scores, activityId]);

  return (
    <div className="space-y-6">
      <div className="rounded-md bg-white p-5 shadow">
        <h2 className="mb-3 text-lg font-semibold">Assessments</h2>
        <div className="flex gap-3">
          <select className="rounded border px-2 py-2 text-sm" value={activityId} onChange={e => setActivityId(e.target.value)}>
            {activities.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
          </select>
          {activity && <div className="rounded bg-indigo-50 px-2 py-1 text-xs text-indigo-700">{activity.subject} • {activity.type}</div>}
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 text-left">Student</th>
                <th className="border px-3 py-2 text-left">Latest score</th>
                <th className="border px-3 py-2 text-left">Attempts</th>
                <th className="border px-3 py-2 text-left">Submitted at</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.s.id}>
                  <td className="border px-3 py-2">{r.s.name}</td>
                  <td className="border px-3 py-2">{r.sc?.score ?? '—'}{typeof r.sc?.score === 'number' ? '%' : ''}</td>
                  <td className="border px-3 py-2">{r.sc?.attempts ?? '—'}</td>
                  <td className="border px-3 py-2">{r.sc ? new Date(r.sc.submittedAt).toLocaleString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Settings
function Settings() {
  const [lang, setLang] = useState<string>('Amharic');
  const [notif, setNotif] = useState<boolean>(true);

  return (
    <div className="space-y-6">
      <div className="rounded-md bg-white p-5 shadow">
        <h2 className="mb-3 text-lg font-semibold">Settings</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded border p-4">
            <div className="text-sm font-medium">Language</div>
            <select className="mt-2 w-full rounded border px-2 py-2 text-sm" value={lang} onChange={e => setLang(e.target.value)}>
              <option>Amharic</option>
              <option>English</option>
            </select>
          </div>
          <div className="rounded border p-4">
            <div className="text-sm font-medium">Notifications</div>
            <label className="mt-2 flex items-center gap-2 text-sm">
              <input type="checkbox" checked={notif} onChange={e => setNotif(e.target.checked)} />
              Email and SMS updates
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
