import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'
import { ReactionWithUser } from 'prisma/types';

const prisma = new PrismaClient()

@Injectable()
export class ReactionService {
    async createReaction(userId: number, eventId: number, type: string, message?: string, availibilityDate?: string): Promise<ReactionWithUser> {
        return await prisma.reaction.create({
            data: {
                userId,
                eventId,
                type,
                message,
                availibilityDate,
                createdAt: new Date()
            },
            include: {
                user: true,
            },
        })
    }

    async getReactionsByEvent(eventId: number): Promise<ReactionWithUser[]> {
        return prisma.reaction.findMany({
            where: {
                eventId
            },
            include: {
                user: true
            }
        })
    }
}