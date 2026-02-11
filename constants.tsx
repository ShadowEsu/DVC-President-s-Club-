
import { Club, Event, EventType, Announcement } from './types';

/* 
   ==========================================================================
   STEP 1: DEFINE CLUB CATEGORIES
   ==========================================================================
   Add or remove categories here. These show up in the filters.
*/
export const CATEGORIES = [
  'STEM', 
  'Cultural', 
  'Service', 
  'Business', 
  'Arts', 
  'Academic', 
  'Sports', 
  'Advocacy'
];


/* 
   ==========================================================================
   STEP 2: CLUB DATA & MEETING TIMES
   ==========================================================================
   HOW TO CHANGE:
   - To change a time: Update the 'startTime' and 'endTime' (use 24h format like "15:00").
   - To change a day: Use 'Monday', 'Tuesday', 'Wednesday', 'Thursday', or 'Friday'.
   - To change a category: Use one of the names from STEP 1 above.
*/

// EDIT_CLUBS_START
export const INITIAL_CLUBS: Club[] = [
  { 
    id: '1', 
    name: 'AGS', 
    category: 'Academic', 
    description: 'Alpha Gamma Sigma Honor Society focusing on scholarship and service.', 
    contactEmail: 'ichow539@insite.4cd.edu', 
    leaders: ['Isabela Chow'], 
    approved: true,
    schedule: [{ day: 'Monday', startTime: '15:00', endTime: '16:00', location: 'L-151' }] 
  },
  { 
    id: '2', 
    name: 'CTC', 
    category: 'STEM', 
    description: 'Circuit Crafters & Technology Club for engineers and builders.', 
    contactEmail: 'bchoi218@insite.4cd.edu', 
    leaders: ['Adrian Choi'], 
    approved: true,
    schedule: [{ day: 'Thursday', startTime: '17:00', endTime: '18:30', location: 'ET-120' }]
  },
  { 
    id: '3', 
    name: 'WIB', 
    category: 'Business', 
    description: 'Women in Business networking and professional development.', 
    contactEmail: 'lfoster399@insite.4cd.edu', 
    leaders: ['Leila Foster'], 
    approved: true,
    schedule: [{ day: 'Wednesday', startTime: '14:00', endTime: '15:00', location: 'B-202' }]
  },
  { 
    id: '4', 
    name: 'WICS', 
    category: 'STEM', 
    description: 'Women in Computer Science community and tech support.', 
    contactEmail: 'stoshchakova237@insite.4cd.edu', 
    leaders: ['Sofiia Toshchakova'], 
    approved: true,
    schedule: [{ day: 'Thursday', startTime: '15:00', endTime: '16:00', location: 'L-151' }]
  },
  { 
    id: '5', 
    name: 'Project Bracket', 
    category: 'STEM', 
    description: 'Collaborative coding and hackathon preparation.', 
    contactEmail: 'cney758@insite.4cd.edu', 
    leaders: ['Conor Ney'], 
    approved: true,
    // CONFLICT EXAMPLE: Same time/day as WICS
    schedule: [{ day: 'Thursday', startTime: '15:00', endTime: '16:30', location: 'L-151' }]
  },
  { 
    id: '10', 
    name: 'Latinx Student Alliance', 
    category: 'Cultural', 
    description: 'Celebrating Latinx heritage and advocacy.', 
    contactEmail: 'cgutierrez001@insite.4cd.edu', 
    leaders: ['Cindy Gutierrez'], 
    approved: true,
    schedule: [{ day: 'Tuesday', startTime: '15:00', endTime: '16:00', location: 'SC-102' }]
  }
];
// EDIT_CLUBS_END


/* 
   ==========================================================================
   STEP 3: ONE-TIME EVENTS
   ==========================================================================
*/
export const INITIAL_EVENTS: Event[] = [
  {
    id: 'e2',
    title: 'Career Paths in Tech Mixer',
    clubIds: ['3', '4', '9'],
    type: EventType.COLLAB,
    start: '2025-10-21T14:00:00Z',
    end: '2025-10-21T16:00:00Z',
    location: 'Student Center Hall',
    description: 'Join WIB, WICS, and Project Bracket for a career panel with DVC alumni.',
    tags: ['Networking', 'Professional'],
    visibility: 'public',
    createdBy: 'user_admin',
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'a1',
    title: 'ICC Funding Cycle #2 Now Open',
    body: 'Clubs can now submit their Spring funding requests through the portal. Deadline: Oct 30.',
    category: 'funding',
    createdBy: 'Admin',
    createdAt: new Date().toISOString(),
    pinned: true
  }
];
