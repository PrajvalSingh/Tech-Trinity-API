import { Controller, Get, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Controller('memes')
export class MemesController {
  constructor(@Inject('PRISMA_CLIENT') private readonly prisma: PrismaClient) {}

  @Get()
  async getMemes(): Promise<object> {
    return await this.prisma.meme.findMany();
  }
}
