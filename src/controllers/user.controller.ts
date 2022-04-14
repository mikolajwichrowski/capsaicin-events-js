import { Controller, Get, Body, Res, Param, HttpException, HttpStatus } from '@nestjs/common';
import { User } from "@prisma/client"
import { UserService } from '../services/user.service';

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("")
  async list(): Promise<Partial<User>[]> {
    const allUserObjects = await this.userService.getUsers()

    return allUserObjects.map((fullUserObject) => ({
      id: fullUserObject.id,
      username: fullUserObject.username
    }));
  }

  @Get(":id")
  async get(
    @Param('id') id: string
  ): Promise<Partial<User>> {
    const idInteger = parseInt(id) || 0
    const fullUserObject = await this.userService.getUserById(idInteger)

    if (!fullUserObject) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return {
      id: fullUserObject.id,
      username: fullUserObject.username
    };
  }
}
