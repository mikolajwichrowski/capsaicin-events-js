import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { AuthMiddleware } from 'src/auth/auth.middleware';

import { EventController } from './event.controller';
import { EventService } from './event.service';
import { UserService } from 'src/user/user.service';
import { FileService } from 'src/file/file.service';
import { AttendeeService } from 'src/attendee/attendee.service';
import { ReactionService } from 'src/reaction/reaction.service';

@Module({
  imports: [],
  controllers: [EventController],
  providers: [UserService, EventService, AttendeeService, FileService, ReactionService],
})
export class EventModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/event/*', method: RequestMethod.ALL });
  }
}
