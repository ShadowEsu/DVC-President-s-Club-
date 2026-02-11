
export enum UserRole {
  ADMIN = 'ADMIN',
  PRESIDENT = 'PRESIDENT',
  STUDENT = 'STUDENT'
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

export interface MeetingSchedule {
  day: DayOfWeek;
  startTime: string; // "HH:MM" 24h format
  endTime: string;   // "HH:MM" 24h format
  location: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  clubIds: string[];
}

export interface Club {
  id: string;
  name: string;
  category: string;
  description: string;
  contactEmail: string;
  // Structured schedule for the table and conflict detection
  schedule?: MeetingSchedule[];
  // Legacy string for display
  defaultMeetingTime?: string;
  leaders: string[];
  approved: boolean;
}

export enum EventType {
  SESSION = 'SESSION',
  ONE_TIME = 'ONE_TIME',
  COLLAB = 'COLLAB'
}

export interface Event {
  id: string;
  title: string;
  clubIds: string[];
  type: EventType;
  start: string; // ISO string
  end: string;   // ISO string
  location: string;
  description: string;
  tags: string[];
  visibility: 'public' | 'presidents-only' | 'draft';
  recurrenceRule?: string; // e.g., 'WEEKLY'
  seriesId?: string;
  exceptionDates?: string[];
  conflictAcknowledged?: boolean;
  createdBy: string;
  capacity?: number;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  category: 'urgent' | 'general' | 'collaboration' | 'funding' | 'reminders';
  createdBy: string;
  createdAt: string;
  scheduledAt?: string;
  pinned: boolean;
  attachments?: string[];
}

export interface SavedEvent {
  userId: string;
  eventId: string;
  savedAt: string;
}
