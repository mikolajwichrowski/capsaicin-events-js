import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'
import { EventWithCreator } from '../../prisma/types';

const prisma = new PrismaClient()

@Injectable()
export class EventService {
  async createEvent(
    description: string,
    picture: string,
    location: string,
    creatorId: number
  ): Promise<EventWithCreator> {
    return await prisma.event.create({
      data: {
        description,
        picture,
        location,
        creatorId
      },
      include: {
        creator: true,
      },
    })
  }

  getEvents(): Promise<EventWithCreator[]> {
    return prisma.event.findMany({
      include: {
        creator: true,
      },
    })
  }

  getEventById(id: number): Promise<EventWithCreator> {
    return prisma.event.findFirst({
      where: { id },
      include: {
        creator: true,
      },
    })
  }
}

