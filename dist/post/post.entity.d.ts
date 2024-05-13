import { User } from "../user/user.entity";
export declare class Post {
    readonly id: number;
    readonly title: string;
    readonly content: string;
    readonly created_at: Date;
    readonly updated_at: Date;
    user: User;
}
