import { Module } from '@nestjs/common';
import { MemesController } from './memes.controller';

@Module({
  controllers: [MemesController]
})
export class MemesModule {}
