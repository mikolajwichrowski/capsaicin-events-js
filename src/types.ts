import { Event, User } from '@prisma/client';


export type EventWithCreator = Partial<Event> & { creator: Partial<User>; };
export type CreateEventBody = Partial<Event> & { creator: number; };
