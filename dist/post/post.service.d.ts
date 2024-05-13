import { AddPostDto } from "./dtos/addPostDto";
import { Repository } from "typeorm";
import { Post } from "./post.entity";
import { User } from "../user/user.entity";
export declare class PostService {
    private readonly postRepository;
    constructor(postRepository: Repository<Post>);
    postAddPost(body: AddPostDto, user: User): Promise<string>;
    getAllPosts(): Promise<Post[]>;
}
