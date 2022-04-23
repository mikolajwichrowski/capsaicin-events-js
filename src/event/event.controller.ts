import { Controller, Get, Body, Post, Param, HttpException, HttpStatus, UseInterceptors, UploadedFile, Request } from '@nestjs/common';

import { EventWithCreator, AttendeeWithUser } from "src/../prisma/types";
import { CreateEventBody, FileResponseObject, ReactionResponseObject, RegisterAttendeeBody } from "src/types";

import { EventService } from './event.service';
import { FileService } from 'src/file/file.service';
import { ReactionService } from 'src/reaction/reaction.service';
import { AttendeeService } from 'src/attendee/attendee.service';

import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller("events")
export class EventController {
  constructor(
    private readonly eventService: EventService, 
    private readonly attendeeService: AttendeeService,
    private readonly fileService: FileService,
    private readonly reactionService: ReactionService
  ) { }

  @Get("")
  async list(): Promise<EventWithCreator[]> {
    const allEventObjects = await this.eventService.getEvents()

    return allEventObjects.map(({ id, creator, description, picture, location }) => ({
      id,
      description,
      picture,
      location,
      creator: {
        id: creator.id,
        username: creator.username
      }
    }));
  }

  @Get(":id")
  async get(
    @Param('id') id: number
  ): Promise<EventWithCreator> {
    const fullEventObject = await this.eventService.getEventById(id)

    if (!fullEventObject) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return {
      id: fullEventObject.id,
      description: fullEventObject.description,
      picture: fullEventObject.picture,
      location: fullEventObject.location,
      creator: {
        id: fullEventObject.creator.id,
        username: fullEventObject.creator.username
      }
    };
  }

  @Post()
  async create(
    @Body() body: CreateEventBody,
    @Request() req,
  ): Promise<EventWithCreator> {
    const requiredKeys = [
      "description",
      "picture",
      "location",
    ]

    const userIdString = req.cookies["user_id"]
    const userId = parseInt(userIdString) || 0

    const missingKeysInBody = requiredKeys.find((key) => !body.hasOwnProperty(key))
    if (missingKeysInBody) {
      throw new HttpException("Bad request", HttpStatus.BAD_REQUEST)
    }

    const newEvent = await this.eventService.createEvent(body.description, body.picture, body.location, userId)
    return {
      id: newEvent.id,
      description: newEvent.description,
      picture: newEvent.picture,
      location: newEvent.location,
      creator: {
        id: newEvent.creator.id,
        username: newEvent.creator.username
      }
    };
  }

  @Get(":id/attendees")
  async getAttendees(
    @Param('id') id: number
  ): Promise<AttendeeWithUser[]> {
    const allAttendeeObjects = await this.attendeeService.getAttendeesByEventId(id)
    return allAttendeeObjects.map(fullAttendeeObject => ({
      id: fullAttendeeObject.id,
      user: {
        id: fullAttendeeObject.user.id,
        username: fullAttendeeObject.user.username
      },
    }))
  }

  @Post(":id/register")
  async createAttendee(
    @Param('id') id: number,
    @Body() body: RegisterAttendeeBody
  ): Promise<AttendeeWithUser> {
    if (!body.hasOwnProperty("user")) {
      throw new HttpException("Bad request", HttpStatus.BAD_REQUEST)
    }

    const newAttendeeObject = await this.attendeeService.createAttendee(id, body.user)
    return {
      id: newAttendeeObject.id,
      user: {
        id: newAttendeeObject.user.id,
        username: newAttendeeObject.user.username
      },
    }
  }

  @Get(":id/files")
  async getFiles(
    @Param('id') id: number
  ): Promise<FileResponseObject[]> {
    const allFileObjects = await this.fileService.getFilesByEventId(id)
    return allFileObjects.map(fullFileObject => ({
      id: fullFileObject.id,
      event: fullFileObject.eventId,
      fileLocation: fullFileObject.fileLocation
    }))
  }

  @Post(":id/upload")
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File
  ): Promise<FileResponseObject> {
    const newFileObject = await this.fileService.createFile(id, file.destination)
    return {
      id: newFileObject.id,
      event: newFileObject.eventId,
      fileLocation: newFileObject.fileLocation
    }
  }

  @Get(":id/reactions")
  async getReactions(
    @Param('id') id: number
  ): Promise<ReactionResponseObject[]> {
    const allReactionObjects = await this.reactionService.getReactionsByEvent(id)
    return allReactionObjects.map(fullReactionObject => ({
      id: fullReactionObject.id,
      event: fullReactionObject.eventId,
      type: fullReactionObject.type,
      availibilityDate: fullReactionObject.availibilityDate,
      message: fullReactionObject.message,
      createdAt: fullReactionObject.createdAt,
      user: {
        id: fullReactionObject.user.id,
        username: fullReactionObject.user.username
      },
    }))
  }

  @Post(":id/react")
  async makeReaction(
    @Param('id') id: number,
    @Body() body: any,
    @Request() req
  ): Promise<ReactionResponseObject> {
    if(["COMMENT", "AVAILIBILITY"].includes(body.type)) {
      throw new HttpException("Bad request, type must be one of two [\"COMMENT\", \"AVAILIBILITY\"]", HttpStatus.BAD_REQUEST)
    }

    const messageOrDate = body.message ?? body.availibilityDate
    if(!messageOrDate) {
      throw new HttpException("Bad request, either pass a `message` or `availibilityDate`", HttpStatus.BAD_REQUEST)
    }

    const userIdString = req.cookies["user_id"]
    const userId = parseInt(userIdString) || 0

    const fullReactionObject = await this.reactionService.createReaction(
      userId,
      id,
      body.type,
      body.message,
      body.availibilityDate
    )

    return {
      id: fullReactionObject.id,
      event: fullReactionObject.eventId,
      type: fullReactionObject.type,
      availibilityDate: fullReactionObject.availibilityDate,
      message: fullReactionObject.message,
      createdAt: fullReactionObject.createdAt,
      user: {
        id: fullReactionObject.user.id,
        username: fullReactionObject.user.username
      },
    }
  }
}
