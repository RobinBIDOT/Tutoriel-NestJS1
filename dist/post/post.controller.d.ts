import { AddPostDto } from "./dtos/addPostDto";
import { PostService } from "./post.service";
import { Response } from "express";
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getAddPost(): void;
    postAddPost(body: AddPostDto, session: Record<string, any>): Promise<string>;
    getDetailPost(id: string, res: Response): Promise<{
        post: import("./post.entity").Post;
    }>;
}
