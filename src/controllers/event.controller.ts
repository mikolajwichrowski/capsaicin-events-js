import { Controller, Get, Body, Post, Param, HttpException, HttpStatus } from '@nestjs/common';
import { EventService } from 'src/services/event.service';
import { EventWithCreator, CreateEventBody } from "src/types";

@Controller("events")
export class EventController {
  constructor(private readonly eventService: EventService) { }

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
    @Param('id') id: string
  ): Promise<EventWithCreator> {
    const idInteger = parseInt(id) || 0
    const fullEventObject = await this.eventService.getEventById(idInteger)

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
}
