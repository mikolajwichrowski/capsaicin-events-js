import { Event, User, Attendee } from '@prisma/client';


export type EventWithCreator = Partial<Event> & { creator: Partial<User>; };
export type AttendeeWithUser = Partial<Attendee> & { user: Partial<User>; };

export type CreateEventBody = Partial<Event> & { creator: number; };
export type RegisterAttendeeBody = { user: number }