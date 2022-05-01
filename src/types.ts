import { User } from '@prisma/client';

export class CreateEventBody {
    description: string;
    picture: string;
    location: string;
}

export class RegisterAttendeeBody { user: number; }

export class FileResponseObject { id: number; event: number; fileLocation: string; }

export class ReactionResponseObject {
    id: number;
    event: number;
    user: Partial<User>;
    type: string;
    message: string | null;
    availibilityDate: Date | null;
    createdAt: Date;
}
