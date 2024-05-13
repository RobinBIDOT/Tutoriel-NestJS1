import { PostService } from "./post/post.service";
export declare class AppController {
    private readonly postService;
    constructor(postService: PostService);
    getHome(): Promise<{
        posts: import("./post/post.entity").Post[];
    }>;
}
