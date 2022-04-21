import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthMiddleware } from '../auth/auth.middleware';
import { EventService } from './event.service';
import { EventController } from './event.controller';

@Module({
  imports: [],
  controllers: [EventController],
  providers: [UserService, EventService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
