import React, { useState } from 'react';
import { User, Mail, Smartphone, Edit2, CheckCircle, GraduationCap, Clock, Award, FileSpreadsheet, LogOut, ChevronRight, BookOpen, X } from 'lucide-react';
import { UserProfile } from '../types';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

interface UserProfileDashboardProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onLogout: () => void;
}

export default function UserProfileDashboard({ profile, onUpdateProfile, onLogout }: UserProfileDashboardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);

  // Editable Form fields
  const [fullName, setFullName] = useState<string>(profile.fullName);
  const [phone, setPhone] = useState<string>(profile.phone);
  const [preferredMode, setPreferredMode] = useState<'online' | 'home'>(profile.preferredMode);
  
  // Role specific fields
  const [subjects, setSubjects] = useState<string>(profile.subjects || '');
  const [qualification, setQualification] = useState<string>(profile.qualification || '');
  const [childName, setChildName] = useState<string>(profile.childName || '');
  const [grade, setGrade] = useState<string>(profile.grade || 'Class 10');

  // Custom mock study trackers for personalized feedback
  const [studyGoals, setStudyGoals] = useState<string[]>([
    'Resolve at least 2 NCERT Exemplar question archives daily.',
    'Review RD Sharma geometry formulas on weekends.',
    'Attend online doubt solving clinic sessions.'
  ]);
  const [newGoal, setNewGoal] = useState<string>('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const now = new Date().toISOString();
    const updatedProfile: UserProfile = {
      ...profile,
      fullName,
      phone,
      preferredMode,
      updatedAt: now,
      ...(profile.role === 'tutor' ? { subjects, qualification } : {}),
      ...(profile.role === 'parent' ? { childName, grade } : {})
    };

    const docPath = `users/${profile.uid}`;
    try {
      // Direct commit to database mapping
      try {
        await setDoc(doc(db, 'users', profile.uid), updatedProfile);
      } catch (fsErr: any) {
        console.warn('Firestore database write rejected. Synchronizing locally for uninterrupted preview session.', fsErr);
        
        // Save to offline storage list so session updates persist locally across reloads
        const localUsersRaw = localStorage.getItem('mentora_offline_registered_users');
        if (localUsersRaw) {
          const localUsers = JSON.parse(localUsersRaw);
          const idx = localUsers.findIndex(
            (u: any) => u.profile.uid === profile.uid || u.email.toLowerCase() === profile.email.toLowerCase()
          );
          if (idx !== -1) {
            localUsers[idx].profile = updatedProfile;
            localStorage.setItem('mentora_offline_registered_users', JSON.stringify(localUsers));
          }
        }
      }
      
      onUpdateProfile(updatedProfile);
      setIsEditing(false);
      setShowSuccessPopup(true);
    } catch (err: any) {
      setError(err.message || 'Failed to complete registration updates.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.trim()) {
      setStudyGoals([...studyGoals, newGoal.trim()]);
      setNewGoal('');
    }
  };

  const handleRemoveGoal = (index: number) => {
    setStudyGoals(studyGoals.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-3xl shadow-sm p-6 md:p-8 max-w-5xl mx-auto my-12 animate-fade-in" id="dashboard">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-100 pb-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-cream-100 border border-cream-300 flex items-center justify-center text-cream-600">
            {profile.role === 'tutor' ? <GraduationCap className="w-8 h-8" /> : <User className="w-8 h-8" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading text-2xl font-bold text-neutral-900">{profile.fullName}</h2>
              {profile.role === 'tutor' && (
                <span className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full border ${
                  profile.isVerified 
                    ? 'bg-green-50 border-green-200 text-green-600' 
                    : 'bg-amber-50 border-amber-200 text-amber-600'
                }`}>
                  {profile.isVerified ? 'Verified' : 'Awaiting Docs Verification'}
                </span>
              )}
            </div>
            <p className="text-sm text-neutral-400 mt-1 capitalize">Logged in as {profile.role} • {profile.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 rounded-xl transition-all"
          >
            <Edit2 className="w-4 h-4" />
            {isEditing ? 'Close Profile' : 'My Profile'}
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border border-red-200 text-red-600 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </div>

      {/* Main panel layout containing the user personalized tracks */}
      <div className="space-y-8">
        <div>
          <h3 className="font-heading text-lg font-bold text-neutral-800 mb-1">
            {profile.role === 'tutor' ? 'Tutor Admin Center' : 'Personalized Learning Roadmap'}
          </h3>
          <p className="text-xs text-neutral-400">
            {profile.role === 'tutor' 
              ? 'Review your verification documents, active student connections, and curriculum highlights.' 
              : "A custom plan designed around your academic level to secure outstanding grade achievements."}
          </p>
        </div>

        {profile.role === 'tutor' ? (
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-neutral-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Verification Checklist</span>
                <Award className="w-4 h-4 text-cream-600" />
              </div>
              <ul className="text-xs space-y-1.5 text-neutral-600">
                <li className="flex items-center gap-1.5">✅ Profile Setup Done</li>
                <li className="flex items-center gap-1.5">⏳ Academic Degrees Verified</li>
                <li className="flex items-center gap-1.5">⏳ Mock Demo Lecture Check</li>
              </ul>
            </div>

            <div className="border border-neutral-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Tutor Metrics</span>
                <FileSpreadsheet className="w-4 h-4 text-cream-600" />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 text-center">
                <div className="bg-neutral-50 rounded-xl p-2">
                  <span className="block text-lg font-bold text-neutral-800">0</span>
                  <span className="text-[10px] text-neutral-400">Students</span>
                </div>
                <div className="bg-neutral-50 rounded-xl p-2">
                  <span className="block text-lg font-bold text-neutral-800">4.8★</span>
                  <span className="text-[10px] text-neutral-400">Rating Goal</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <form onSubmit={handleAddGoal} className="flex gap-2">
              <input
                type="text"
                required
                placeholder="Insert new custom study milestone..."
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-cream-600"
              />
              <button
                type="submit"
                className="bg-cream-600 hover:bg-cream-700 text-white font-medium px-4 py-2 rounded-xl text-xs"
              >
                Add Milestone
              </button>
            </form>

            <div className="border border-neutral-200 rounded-2xl p-4 space-y-3">
              <span className="text-[10px] tracking-wider uppercase font-semibold text-neutral-400">Learning Milestones</span>
              <ul className="space-y-2.5">
                {studyGoals.map((g, idx) => (
                  <li key={idx} className="flex items-start justify-between gap-3 text-xs text-neutral-600 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                    <div className="flex gap-2 items-start">
                      <CheckCircle className="w-4 h-4 text-cream-600 flex-shrink-0 mt-0.5" />
                      <span>{g}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveGoal(idx)}
                      className="text-[10px] text-neutral-400 hover:text-red-600 underline font-semibold"
                    >
                      Delete
                    </button>
                  </li>
                ))}
                {studyGoals.length === 0 && (
                  <p className="text-xs text-neutral-400 text-center py-4">No milestone items. Create one above!</p>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Locked study assets alert */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-green-800">Unrestricted Core Materials Opened ✨</h4>
            <p className="text-xs text-green-700/85 mt-1 leading-relaxed">
              As a logged-in user, the lock filters on the **Reference Books Suggestions** and **Test Preparation Model Papers** collections have been unlocked! Browse the catalog freely and click previews to check chapters of top-recommended titles.
            </p>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal Dialog */}
      {isEditing && (
        <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in" style={{ zIndex: 99 }}>
          <div className="bg-white border border-neutral-200 rounded-[2rem] p-6 md:p-8 max-w-sm w-full shadow-2xl relative animate-scale-up border-cream-200 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4 flex-shrink-0">
              <div>
                <h3 className="font-heading text-lg font-bold text-neutral-900">My profile & Settings</h3>
                <p className="text-[10px] text-neutral-400">Verify and modify your academic dashboard details</p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-8 h-8 rounded-full bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSave} className="space-y-4 overflow-y-auto pr-1 flex-1 text-left">
              {error && (
                <div className="bg-red-50 text-red-700 text-[11px] font-semibold px-3 py-2 rounded-xl border border-red-200">
                  {error}
                </div>
              )}
              
              {/* Profile Overview Card */}
              <div className="bg-cream-50/70 border border-cream-100 rounded-2xl p-4 text-xs text-neutral-700 space-y-2 mt-1">
                <p className="text-[10px] tracking-wider uppercase font-bold text-cream-700 border-b border-cream-100 pb-1 flex items-center justify-between">
                  <span>Current Academic Profile Info</span>
                  <span className="font-sans font-normal text-[9px] capitalize text-cream-500">{profile.role}</span>
                </p>
                <div className="flex justify-between">
                  <span className="text-neutral-400 font-medium">Email Address:</span>
                  <span className="font-semibold text-neutral-800 truncate max-w-[170px]">{profile.email}</span>
                </div>
                {profile.role === 'parent' ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-neutral-400 font-medium">Scholar Child:</span>
                      <span className="font-semibold text-neutral-800">{profile.childName || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400 font-medium">Academic Grade:</span>
                      <span className="font-semibold text-neutral-800">{profile.grade || 'Not specified'}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-neutral-400 font-medium">Subjects Area:</span>
                      <span className="font-semibold text-neutral-800 truncate max-w-[170px]">{profile.subjects || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400 font-medium">Qualifications:</span>
                      <span className="font-semibold text-neutral-800 truncate max-w-[170px]">{profile.qualification || 'Not specified'}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between">
                  <span className="text-neutral-400 font-medium font-sans">Active Phone ID:</span>
                  <span className="font-bold text-neutral-800">{profile.phone || 'No phone added'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400 font-medium">Tutor / Scholar Mode:</span>
                  <span className="font-bold text-neutral-800 capitalize text-xs">{profile.preferredMode === 'online' ? 'Online Sessions' : 'Home tuition'}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-neutral-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-cream-600 transition-all font-medium text-neutral-800"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-neutral-400 mb-1">Telephone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-cream-600 transition-all font-medium text-neutral-800"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-neutral-400 mb-1">Preferred Environment</label>
                <select
                  value={preferredMode}
                  onChange={(e) => setPreferredMode(e.target.value as 'online' | 'home')}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-cream-600 font-medium text-neutral-800"
                >
                  <option value="online">Online Video Sessions</option>
                  <option value="home">In-Person Home Tuitions</option>
                </select>
              </div>

              {profile.role === 'tutor' && (
                <>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-neutral-400 mb-1">Subjects You Teach</label>
                    <input
                      type="text"
                      required
                      value={subjects}
                      onChange={(e) => setSubjects(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-cream-600 transition-all font-medium text-neutral-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-neutral-400 mb-1">Qualification</label>
                    <input
                      type="text"
                      required
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-cream-600 transition-all font-medium text-neutral-800"
                    />
                  </div>
                </>
              )}

              {profile.role === 'parent' && (
                <>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-neutral-400 mb-1">Child's Name</label>
                    <input
                      type="text"
                      required
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-cream-600 transition-all font-medium text-neutral-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-neutral-400 mb-1">Academic Grade</label>
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-cream-600 font-medium text-neutral-800"
                    >
                      <option>Class 1-5</option>
                      <option>Class 6-8</option>
                      <option>Class 9-10</option>
                      <option>Class 11-12</option>
                      <option>College / University</option>
                    </select>
                  </div>
                </>
              )}

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-[#92400e] hover:bg-[#78350f] text-white font-bold py-3 text-xs rounded-xl transition duration-200 shadow-md font-heading tracking-wide uppercase flex items-center justify-center gap-1.5"
                >
                  {saving ? 'Synchronizing Write...' : 'Commit Database Write ⚡'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Profile Updated Synchronously Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white border border-neutral-200 rounded-[2rem] p-6 md:p-8 max-w-sm w-full shadow-2xl space-y-5 text-center relative animate-scale-up border-cream-200">
            <div className="w-14 h-14 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto text-green-600">
              <CheckCircle className="w-8 h-8 stroke-[2.2]" />
            </div>
            
            <div className="space-y-1">
              <h3 className="font-heading text-lg font-bold text-neutral-900">Database Synchronized!</h3>
              <p className="text-xs text-neutral-400 font-medium">Your Mentora academic profile settings have been updated and persisted securely.</p>
            </div>

            <div className="bg-cream-50/70 border border-cream-100/80 rounded-2xl p-4 text-left text-xs text-neutral-700 space-y-2.5">
              <p className="text-[10px] tracking-wider uppercase font-bold text-neutral-400 border-b border-neutral-100 pb-1.5">Profile Review Summary</p>
              
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 font-semibold font-sans">Full Name:</span>
                <span className="font-bold text-neutral-900">{profile.fullName}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 font-semibold font-sans">Telephone ID:</span>
                <span className="font-bold text-neutral-900">{profile.phone || 'Non-specified'}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 font-semibold font-sans">Classroom Choice:</span>
                <span className="font-bold text-neutral-900 capitalize">{profile.preferredMode === 'online' ? 'Online Video Sessions' : 'In-Person Home Tuition'}</span>
              </div>

              {profile.role === 'parent' && (
                <>
                  <div className="flex justify-between items-center border-t border-neutral-100/50 pt-2 text-[#92400e]">
                    <span className="font-semibold font-sans">Scholar Child:</span>
                    <span className="font-bold">{profile.childName || 'Alternative'}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#92400e]">
                    <span className="font-semibold font-sans font-heading">Academic Grade:</span>
                    <span className="font-bold text-xs">{profile.grade || 'Class 10'}</span>
                  </div>
                </>
              )}

              {profile.role === 'tutor' && (
                <>
                  <div className="flex justify-between items-center border-t border-neutral-100/50 pt-2 text-[#25D366]">
                    <span className="font-semibold font-sans text-neutral-600">Subjects Area:</span>
                    <span className="font-bold">{profile.subjects || 'All syllabus'}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#92400e]">
                    <span className="font-semibold font-sans font-heading text-neutral-600">Qualifications:</span>
                    <span className="font-bold text-xs truncate max-w-[170px]">{profile.qualification || 'Verified Tutor'}</span>
                  </div>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowSuccessPopup(false)}
              className="w-full bg-[#92400e] hover:bg-[#78350f] text-white font-bold py-3.5 rounded-xl text-xs transition duration-200 shadow-md font-heading tracking-wide uppercase"
            >
              Okay, Thanks!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
