import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [UserModule, AuthModule, EventModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', '..', 'uploads'),
    serveRoot: "/uploads/"
  }),],
  controllers: [],
  providers: [],
})
export class AppModule { }
