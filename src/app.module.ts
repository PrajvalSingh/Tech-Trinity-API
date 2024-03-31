import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { SharedModule } from './globals.module';
import { MemesModule } from './memes/memes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PostsModule, CommentsModule, SharedModule, MemesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
