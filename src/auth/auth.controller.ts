import { Param, Controller, Inject, Post } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

type User = {
  id: string;
  access_token: string;
  has_liked: string[];
};

@Controller('auth')
export class AuthController {
  constructor(@Inject("PRISMA_CLIENT") private readonly prisma: PrismaClient) {}

  @Post("/create/:token")
  async create(@Param('token') access_token: string): Promise<User> {
    let user: User;
    await this.prisma.user.create({
      data: {
        access_token: access_token,
      },
    }).then((data) => user = data);

    return user;
  }

  @Post("/check/:token")
  async check(@Param('token') access_token: string): Promise<object> {
    const user = await this.prisma.user.findUnique({
      where: {
        access_token: access_token,
      },
    });

    return { found: !!user };
  }
}
