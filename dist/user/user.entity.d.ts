import { Post } from "../post/post.entity";
export declare class User {
    readonly id: number;
    readonly username: string;
    readonly email: string;
    password: string;
    posts: Post[];
}
