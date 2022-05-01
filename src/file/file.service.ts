import { Injectable } from '@nestjs/common';
import { PrismaClient, File } from '@prisma/client'
import { AttendeeWithUser } from 'src/../prisma/types';

const prisma = new PrismaClient()

@Injectable()
export class FileService {
  async createFile(
    eventId: number,
    fileLocation: string
  ): Promise<File> {
    return await prisma.file.create({
      data: {
        fileLocation,
        event: { connect: { id: eventId } }
      },
    })
  }

  getFilesByEventId(eventId: number): Promise<File[]> {
    return prisma.file.findMany({
      where: {
        eventId
      },
    })
  }
}

