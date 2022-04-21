import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [UserModule, AuthModule, EventModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
