import { Controller, Get, Param, Put } from "@nestjs/common";
import { PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(): Promise<object[]> {
    return (await this.postsService.getAllPosts());
  }

  @Get("id/:id")
  async getPostById(@Param("id") id: string): Promise<object> {
    return (await this.postsService.getPostById(id));
  }

  @Get("tag/:tag")
  async getPostByTag(@Param("tag") tag: string) {
    return (await this.postsService.getPostByTag(tag));
  }

  @Get("search/:query")
  async searchPosts(@Param("query") query: string) {
    return this.postsService.search(query);
  }

  @Put("like/:id/:access_token")
  async like(@Param("id") id: string, @Param('access_token') access_token: string) {
    return this.postsService.like(id, access_token);
  }

  @Put("unlike/:id/:access_token")
  async unlike(@Param("id") id: string, @Param('access_token') access_token: string) {
    return this.postsService.unlike(id, access_token);
  }

  @Get("has_liked/:id/:access_token")
  async hasLiked(@Param("id") id: string, @Param('access_token') access_token: string) {
    return this.postsService.hasLiked(id, access_token);
  }
}
