import { AddPostDto } from "./dtos/addPostDto";
import { PostService } from "./post.service";
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getAddPost(): void;
    postAddPost(body: AddPostDto, session: Record<string, any>): Promise<string>;
}
