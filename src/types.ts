import { Event, Reaction, User } from '@prisma/client';

export type CreateEventBody = Partial<Event> & { creator: number; };
export type RegisterAttendeeBody = { user: number; };
export type FileResponseObject = { id: number; event: number; fileLocation: string; };
export type ReactionResponseObject = {
    id: number; 
    event: number; 
    user: Partial<User>; 
    type: string;
    message: string | null;
    availibilityDate: Date | null;
    createdAt: Date;
};
