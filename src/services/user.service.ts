import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

@Injectable()
export class UserService {
  async createUser(username: string, password: string): Promise<User> {
    return await prisma.user.create({
      data: {
        username,
        password
      }
    })
  }

  getUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    return prisma.user.findFirst({
      where: { username, password }
    })
  }

  getUsers(): Promise<User[]> {
      return prisma.user.findMany()
  }

  getUserById(id: number): Promise<User> {
    return prisma.user.findFirst({
      where: { id }
    })
  }

}
