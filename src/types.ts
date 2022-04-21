import { Event } from '@prisma/client';

export type CreateEventBody = Partial<Event> & { creator: number; };
export type RegisterAttendeeBody = { user: number; };
export type FileResponseObject = { id: number; event: number; fileLocation: string; };
