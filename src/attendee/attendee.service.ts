import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'
import { AttendeeWithUser } from 'src/../prisma/types';

const prisma = new PrismaClient()

@Injectable()
export class AttendeeService {
  async createAttendee(
    eventId: number,
    userId: number
  ): Promise<AttendeeWithUser> {
    return await prisma.attendee.create({
      data: {
        userId,
        eventId
      },
      include: {
        user: true,
        event: true,
      },
    })
  }

  getAttendeesByEventId(eventId: number): Promise<AttendeeWithUser[]> {
    return prisma.attendee.findMany({
      where: {
        eventId
      },
      include: {
        user: true,
        event: true,
      },
    })
  }
}

