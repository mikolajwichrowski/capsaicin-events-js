import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { UserService } from './services/user.service';
import { AuthController } from './controllers/auth.controller';
import { AuthMiddleware } from './middleware/auth.middleware';
import { UserController } from './controllers/user.controller';
import { EventService } from './services/event.service';
import { EventController } from './controllers/event.controller';

@Module({
  imports: [],
  controllers: [AppController, AuthController, UserController, EventController],
  providers: [AppService, UserService, EventService],
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
