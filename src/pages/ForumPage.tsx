import { useState } from 'react';
import {
  Search,
  Users,
  MessageSquare,
  MessagesSquare,
  Megaphone,
  Pin,
  List,
  TrendingUp,
  NotebookPen,
  Lightbulb,
  BookOpenText,
  User,
  Clock,
  Heart,
  Reply,
} from 'lucide-react';

export default function ForumPage() {
  const [showModal, setShowModal] = useState(false);

  const [activeFilter, setActiveFilter] = useState('All Posts');

  const filters = [
    { label: 'All Posts', icon: List },
    { label: 'General Discussion', icon: MessagesSquare },
    { label: 'Homework Help', icon: NotebookPen },
    { label: 'Study Tips', icon: Lightbulb },
    { label: 'Subject Discussion', icon: BookOpenText },
    { label: 'Announcements', icon: Megaphone },
  ];

  const threads = [
    {
      title: 'Suggestion: Add more university prep materials',
      content: 'The university prep section is great, but could we get more specific resources for university entrance exams, especially for fields like engineering or medicine? Maybe practice tests?',
      author: 'Yonas_Unbound',
      date: '22/10/2021',
      category: 'General Discussion',
      isStarter: true,
    },
    {
      title: 'Re: Suggestion: Add more university prep materials',
      content: 'I second this! Practice tests for university faculties would be incredibly helpful. It would make Ethiopia an even more comprehensive platform for higher education preparation.',
      author: 'Sara_FutureDoctor',
      date: '22/10/2021',
      category: 'General Discussion',
    },
    {
      title: 'Best resources for Grade 8 Science project?',
      content: 'My kids teacher suggested a project on renewable energy sources in Ethiopia. Are there any specific video lessons or digital/text books on Ethiopia that you\'d recommend for Grade 8 science students? Thanks in advance!',
      author: 'AskScienceParent',
      date: '21/10/2021',
      category: 'Homework Help',
      isStarter: true,
    },
    {
      title: 'Re: Best resources for Grade 8 Science project?',
      content: 'Definitely check out the "Environmental Science" unit under Grade 8. There\'s a fantastic video series on hydropower and geothermal energy which actually relates well to the Ethiopia. The digital library also has a book called "Engineering Green Future" that\'s super informative!',
      author: 'Teacher_Abebe',
      date: '21/10/2021',
      category: 'Homework Help',
    },
    {
      title: 'Tips for mastering Amharic grammar?',
      content: 'I\'m finding Amharic grammar quite challenging, especially verb conjugations. Does anyone have effective study tips or resources they\'ve used on Ethiopian Learning Hub?',
      author: 'Leisa_Student',
      date: '20/07/2021',
      category: 'Study Tips',
      isStarter: true,
    },
    {
      title: 'Re: Tips for mastering Amharic grammar?',
      content: 'I agree, it can be tough! What helped me was consistently using the "Practice Quizzes" feature in the Amharic section. Also, try the AI tutor chatbot for specific conjugation questions, it\'s surprisingly useful!',
      author: 'Sofia_Learns',
      date: '20/07/2021',
      category: 'Study Tips',
    },
  ];
  const [searchQuery, setSearchQuery] = useState('');

  const filteredThreads = threads.filter(thread => {
  const matchesCategory =
    activeFilter === 'All Posts' || thread.category === activeFilter;

  const matchesSearch =
    thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thread.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thread.author.toLowerCase().includes(searchQuery.toLowerCase());

  return matchesCategory && matchesSearch;
});

  const postCount = filteredThreads.length;

  return (
    <div className="px-4 md:px-6 lg:px-12 py-12 bg-gray-100">
      {/* Header */}
<div className="mb-10">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
    <h1 className="font-sectionTitle text-4xl md:text-5xl text-gray-900 flex items-center gap-4">
      <MessageSquare size={40} strokeWidth={2.5} className="text-blue-600" />
      Discussion Forum
    </h1>
    <button
      className="px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm font-medium self-start md:self-auto"
      onClick={() => setShowModal(true)}
    >
      + New Post
    </button>
  </div>
  <p className="text-lg text-gray-600 max-w-4xl">
    Connect with students, parents, and teachers. Ask questions, share knowledge, and learn together with students, parents, and teachers.
  </p>
</div>


      {/* Search + Filters */}
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-8 shadow-sm">
        <div className="space-y-4">
          {/* Search + Post Count */}
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-3 text-gray-400" />
              <input
  type="text"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  placeholder="Search posts, topics, or authors..."
  className="w-full pl-10 pr-3 py-3 border bg-gray-100 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
/>

            </div>
            <div className="text-sm text-gray-600 ml-4 whitespace-nowrap">
              {postCount} posts found
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {filters.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => setActiveFilter(label)}
                className={`flex items-center gap-2 px-1 py-1 rounded text-sm border transition ${
                  activeFilter === label
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-gray-100 text-blue-500 border-gray-300 hover:bg-blue-100 hover:border-blue-500'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <Stat label="Total Posts" value={String(postCount)} icon={<MessageSquare size={35} />} iconColor="text-blue-600" />
        <Stat label="Active Members" value="6" icon={<Users size={35} />} iconColor="text-green-600" />
        <Stat label="Today's Posts" value="0" icon={<TrendingUp size={35} />} iconColor="text-yellow-600" />
        <Stat label="Announcements" value="0" icon={<Pin size={35} />} iconColor="text-red-500" />
      </div>

      {/* Threads */}
      <div className="space-y-6">
     {filteredThreads.length === 0 ? (
  <div className="bg-gray-100 border border-gray-300 rounded-xl py-16 px-6 text-center shadow-sm flex flex-col items-center justify-center space-y-6">
    <div className="p-2">
      <MessageSquare size={60} className="text-gray-400 mb-1" />
    </div>
      <h3 className="font-sectionTitle text-3xl text-gray-500 mb-2">No posts found</h3>
      <p className="text-gray-600 mb-2">Try adjusting your search or filters.</p>
      <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-400 transition">
        + Create First Post
      </button>
    </div>
  ) : (
    filteredThreads.map((thread, index) => (
      <Thread
        key={index}
        title={thread.title}
        content={thread.content}
        author={thread.author}
        date={thread.date}
        category={thread.category}
        isStarter={thread.isStarter}
      />
    ))
  )}
</div>
      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="relative bg-gray-100 rounded-xl shadow-lg w-full max-w-xl p-6">
      {/* 🔹 Close Button in Top-Right */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold focus:outline-none"
        aria-label="Close"
      >
        ×
      </button>
      <h2 className="font-sectionTitle text-2xl text-gray-800 mb-4">Create New Post</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('Post created');
          setShowModal(false);
        }}
        className="space-y-4"
      > 
        <div>
        <h3 className="text-lg font-semibold text-blue-500 mb-2">Title</h3> 
        <input
          type="text"
          placeholder="What's your question or topic?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        </div>
        <div>
        <h3 className="text-lg font-semibold text-blue-500 mb-2">Category</h3>
        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-blue-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>General Discussion</option>
          <option>Homework Help</option>
          <option>Study Tips</option>
          <option>Subject Discussion</option>
          <option>Announcements</option>
        </select>
        </div>
        <div>
  <h3 className="text-lg font-semibold text-blue-500 mb-2">Content</h3>
  <textarea
  placeholder="Share your thoughts, ask your question, or start a discussion..."
  rows={5}
  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm resize-none bg-gray-100 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
  style={{ transition: 'height 0.2s ease-in-out' }}
  required
  onInput={(e) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
    
  }}
/>

</div>

        <div className="flex justify-end gap-4 pt-2">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-gray-200 text-blue-500 border border-blue-300 rounded hover:border-blue-500 hover:bg-blue-200 transition text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm font-medium"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      {/* Join the Conversation */}
      <div className="mt-16 bg-blue-100 border border-blue-300 rounded-xl px-6 py-10 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <MessageSquare size={40} className="text-blue-600" />
          <h2 className="font-sectionTitle text-4xl">Join the Conversation</h2>
          <p className="text-gray-700 max-w-xl">
            Sign in to create posts, reply to discussions, and connect with the Ethiopian learning community.
          </p>
          <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-400 transition-transform transform hover:scale-105">
            Sign In to Participate
          </button>
        </div>
      </div>
    </div>
  );
}

// Stat Component
function Stat({
  label,
  value,
  icon,
  iconColor = 'text-indigo-600',
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  iconColor?: string;
}) {
  return (
    <div className="w-full bg-gray-100 border border-gray-300 rounded-lg p-4 flex flex-col items-center">
      <div className={`${iconColor} mb-2`}>{icon}</div>
      <div className="text-3xl font-bold text-gray-800 mb-3 tracking-tight">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

// Thread Component
function Thread({
  title,
  content,
  author,
  date,
  category,
  isStarter = false,
}: {
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  isStarter?: boolean;
}) {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 shadow-sm">
      <div className="flex gap-4">
        {/* Left icon column */}
        <div className="flex-shrink-0">
          <div className="p-3 bg-white rounded-full border border-gray-300">
            <MessageSquare size={20} className="text-blue-500" />
          </div>
        </div>

        {/* Right content column */}
        <div className="flex-1 space-y-3">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

          {/* Content */}
          <p className="text-gray-700">{content}</p>

          {/* Meta + Actions Row */}
          <div className="flex justify-between items-center text-sm text-gray-500">
            {/* Author + Date + Category + Starter Badge */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1">
                <User size={18} className="text-gray-600" />
                {author}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={18} className="text-gray-600" />
                {date}
              </span>
              <span className="text-blue-500 px-2 py-1 rounded border border-blue-500">
                {category}
              </span>
              {isStarter && (
                <span className="text-green-700 bg-green-100 px-2 py-1 rounded border border-green-400 font-medium">
                  Thread Starter
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 px-1 py-1 rounded text-sm text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition">
                <Heart size={16} />
                Like
              </button>
              <button className="flex items-center gap-1 px-1 py-1 rounded text-sm text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition">
                <Reply size={16} />
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

