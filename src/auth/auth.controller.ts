import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { User } from "@prisma/client"
import { UserService } from '../user/user.service';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) { }

  @Post("register")
  async register(
    @Body() body: Partial<User>,
    @Res({ passthrough: true }) res
  ): Promise<Partial<User>> {
    const newUser = await this.userService.createUser(body.username, body.password)
    res.cookie('logged_id', 'yes');
    res.cookie('user_id', newUser.id);
    return {
      id: newUser.id,
      username: newUser.username
    }
  }

  @Post("authenticate")
  async authenticate(
    @Body() body: Partial<User>,
    @Res({ passthrough: true }) res
  ): Promise<string> {
    const user = await this.userService.getUserByUsernameAndPassword(body.username, body.password)

    if (!user) {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN)
    }

    res.cookie('logged_id', 'yes');
    res.cookie('user_id', user.id);
    return ""
  }
}
