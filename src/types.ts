export type UserRole = 'parent' | 'tutor';

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  preferredMode: 'online' | 'home';
  isVerified?: boolean;
  subjects?: string;
  qualification?: string;
  childName?: string;
  grade?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookRecommendation {
  id: string;
  title: string;
  subject: string;
  grade: string;
  description: string;
  emoji: string;
}

export interface ModelPaper {
  id: string;
  title: string;
  subject: string;
  category: 'class10' | 'class12' | 'jee' | 'neet';
  marksCode: string;
  duration: string;
  downloadsCount: number;
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
  };
}
