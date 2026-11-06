// src/components/RoleGuard.tsx
import React from 'react';
import { UserRole } from '../types/edu';

interface Props {
  role: UserRole | null;
  allow: UserRole[];
  children: React.ReactNode;
}

export const RoleGuard: React.FC<Props> = ({ role, allow, children }) => {
  if (!role) return <div className="p-6 text-center">Loading...</div>;
  if (!allow.includes(role)) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block rounded-md bg-red-50 px-4 py-3 text-red-700">
          Access denied. This page is for teachers.
        </div>
      </div>
    );
  }
  return <>{children}</>;
};
