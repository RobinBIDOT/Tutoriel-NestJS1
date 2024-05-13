import {Injectable } from '@nestjs/common';
import { AddPostDto } from "./dtos/addPostDto";
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm";
import {Post} from "./post.entity";
import {User} from "../user/user.entity";

@Injectable()
export class PostService {
    constructor(@InjectRepository(Post) private readonly postRepository : Repository<Post>) {}
    async postAddPost(body: AddPostDto, user : User) {
        const post = this.postRepository.create(body)
        post.user = user
        await this.postRepository.save(post)
        return "Created Article"
    }

    async getAllPosts() {
        const posts = await this.postRepository.find({order : {created_at : "DESC"}})
        return posts
    }
}
