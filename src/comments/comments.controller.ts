import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CommentsService } from "./comments.service";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get("post/:id")
  async getCommentsByPostId(@Param("id") id: string): Promise<object[]> {
    return (await this.commentsService.getCommentsByPostId(id));
  }

  @Post("new")
  async createComment(
    @Body() body: { postId: string; username: string; comment: string },
  ): Promise<object> {
    return (await this.commentsService.createComment(
      body.postId,
      body.username,
      body.comment,
    ));
  }

  @Delete("delete/:id")
  async deleteComment(@Param("id") id: string) {
    return (await this.commentsService.deleteComment(id));
  }
}
