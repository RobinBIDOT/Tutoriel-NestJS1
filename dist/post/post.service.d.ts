import { AddPostDto } from "./dtos/addPostDto";
import { Repository } from "typeorm";
import { Post } from "./post.entity";
import { User } from "../user/user.entity";
export declare class PostService {
    private readonly userRepository;
    constructor(userRepository: Repository<Post>);
    postAddPost(body: AddPostDto, user: User): Promise<string>;
}
