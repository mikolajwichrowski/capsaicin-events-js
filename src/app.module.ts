import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
// TODO: Make a module for each app

import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { AuthMiddleware } from './auth/auth.middleware';
import { EventService } from './event/event.service';
import { EventController } from './event/event.controller';

@Module({
  imports: [],
  controllers: [AuthController, UserController, EventController],
  providers: [UserService, EventService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/api/register', method: RequestMethod.POST },
        { path: '/api/authenticate', method: RequestMethod.POST }
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
