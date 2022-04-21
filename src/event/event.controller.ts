import { Controller, Get, Body, Post, Param, HttpException, HttpStatus } from '@nestjs/common';
import { EventService } from './event.service';
import { EventWithCreator, CreateEventBody, RegisterAttendeeBody, AttendeeWithUser } from "../../prisma/types";
import { AttendeeService } from 'src/attendee/attendee.service';

@Controller("events")
export class EventController {
  constructor(
    private readonly eventService: EventService, 
    private readonly attendeeService: AttendeeService
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
    @Body() body: CreateEventBody
  ): Promise<EventWithCreator> {
    const requiredKeys = [
      "description",
      "picture",
      "location",
      "creator"
    ]

    const missingKeysInBody = requiredKeys.find((key) => !body.hasOwnProperty(key))
    if (missingKeysInBody) {
      throw new HttpException("Bad request", HttpStatus.BAD_REQUEST)
    }

    const newEvent = await this.eventService.createEvent(body.description, body.picture, body.location, body.creator)
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
  ): Promise<void> {

  }

  @Post(":id/upload")
  async uploadFile(
    @Param('id') id: number
  ): Promise<void> {

  }

  @Get(":id/reactions")
  async getReactions(
    @Param('id') id: number
  ): Promise<void> {

  }

  @Post(":id/react")
  async makeReaction(
    @Param('id') id: number
  ): Promise<void> {

  }
}
