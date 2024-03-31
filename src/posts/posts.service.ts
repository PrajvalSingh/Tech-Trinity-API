import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PostsService {
  constructor(@Inject("PRISMA_CLIENT") private readonly prisma: PrismaClient) {}

  async getAllPosts(): Promise<object[]> {
    let posts: object[];
    await this.prisma.post.findMany()
      .then((data) => posts = data)
      .catch((err) => {
        throw new InternalServerErrorException(
          `Failed to fetch all of the posts! Error: ${err}`,
        );
      });

    return posts;
  }

  async getPostById(id: string): Promise<object> {
    let post: object;

    await this.prisma.post.findUnique({
      where: {
        id,
      },
    }).then((data) => post = data)
      .catch((err) => {
        throw new InternalServerErrorException(
          `Failed to fetch the post! Error: ${err}`,
        );
      });

    return post;
  }

  async getPostByTag(tag: string): Promise<object[]> {
    let posts: object[];

    await this.prisma.post.findMany({
      where: {
        tags: {
          has: tag,
        },
      },
    }).then((data) => posts = data)
      .catch((err) => {
        throw new InternalServerErrorException(
          `Failed to fetch the post! Error: ${err}`,
        );
      });

    return posts;
  }

  async search(query: string): Promise<object[]> {
    let posts: object[];

    await this.prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { body: { contains: query } },
        ],
      },
    }).then((data) => posts = data)
      .catch((err) => {
        throw new InternalServerErrorException(
          `Failed to fetch the posts! Error: ${err}`,
        );
      });

    return posts;
  }

  async like(id: string, access_token: string): Promise<void> {
    await this.prisma.post.update({
      where: {
        id,
      },
      data: {
        likes: {
          increment: 1,
        },
      },
    }).catch((err) => {
      throw new InternalServerErrorException(
        `Failed to like the post! Error: ${err}`,
      );
    });

    await this.prisma.user.update({
      where: {
        access_token,
      },
      data: {
        has_liked: {
          push: id,
        },
      },
    });
  }

  async unlike(id: string, access_token: string): Promise<void> {
    await this.prisma.post.update({
      where: {
        id,
      },
      data: {
        likes: {
          decrement: 1,
        },
      },
    }).catch((err) => {
      throw new InternalServerErrorException(
        `Failed to unlike the post! Error: ${err}`,
      );
    });

    await this.prisma.user.update({
      where: {
        access_token,
      },
      data: {
        has_liked: {
          set: await this.prisma.user.findUnique({
            where: {
              access_token,
            },
          }).then((user) => user.has_liked.filter((likeId) => likeId !== id)),
        },
      },
    });

  }

  async hasLiked(id: string, access_token: string): Promise<object> {
    return {found: await this.prisma.user.findUnique({
      where: {
        access_token,
      },
    }).then((user) => user.has_liked.includes(id))};
  }
}
