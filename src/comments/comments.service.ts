import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class CommentsService {
  constructor(@Inject("PRISMA_CLIENT") private readonly prisma: PrismaClient) {}

  async getCommentsByPostId(id: string): Promise<object[]> {
    let comments: object[];

    await this.prisma.comment.findMany({
      where: {
        postId: id,
      },
    }).then((data) => comments = data)
      .catch((err) => {
        throw new InternalServerErrorException(
          `Failed to fetch all of the comments for this post! Error: ${err}`,
        );
      });

    return comments;
  }

  async createComment(
    postId: string,
    username: string,
    text: string,
  ): Promise<object> {
    let comment: object;

    await this.prisma.comment.create({
      data: {
        comment: text,
        postId,
        username,
      },
    }).then((data) => comment = data)
      .catch((err) => {
        throw new InternalServerErrorException(
          `Failed to create comment! Error: ${err}`,
        );
      });

    await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        comments: {
          increment: 1,
        },
      },
    }).catch((err) => {
        throw new InternalServerErrorException(
          `Failed to update no. of comments for the post! Error: ${err}`,
        );
      });

    return comment;
  }

  async deleteComment(
    id:string
  ): Promise<object> {
    let comment: any;

    await this.prisma.comment.delete({
      where: {
        id
      },
    }).then(data => comment = data)
      .catch((err) => {
      throw new InternalServerErrorException(
        `Failed to delete comment! Error: ${err}`,
      );
    });

    await this.prisma.post.update({
      where: {
        id: comment.postId
      },
      data: {
        comments: {
          decrement: 1,
        },
      },
    }).then((data) => comment = data)
      .catch((err) => {
        throw new InternalServerErrorException(
          `Failed to update no. of comments for the post! Error: ${err}`,
        );
      });

    return comment;
  }
}
