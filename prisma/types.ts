import { Event, User, Attendee, Reaction } from '@prisma/client';


export type EventWithCreator = Partial<Event> & { creator: Partial<User>; };
export type AttendeeWithUser = Partial<Attendee> & { user: Partial<User>; };
export type ReactionWithUser = Partial<Reaction> & { user: Partial<User>; };