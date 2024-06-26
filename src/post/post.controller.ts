import { Body, Controller, Get, Param, Post, Render, Res, Session } from '@nestjs/common';
import { AddPostDto } from "./dtos/addPostDto";
import { PostService } from "./post.service";
import { User } from "../user/user.entity";
import { Response } from "express";

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get("/add")
    @Render("post/addPost")
    getAddPost() {}

    @Post("/add")
    async postAddPost(@Body() body: AddPostDto, @Session() session: Record<string, any>) {
        try {
            const currentUser: User = session.user;
            await this.postService.postAddPost(body, currentUser);
            return { message: 'Article ajouté avec succès' };
        } catch (error) {
            console.error(error);
            return { message: 'Erreur lors de l\'ajout de l\'article' };
        }
    }

    @Get("/detail/:id")
    @Render("post/detail")
    async getDetailPost(@Param("id") id: string, @Res() res: Response) {
        try {
            const post = await this.postService.getDetailPost(id);
            return { post };
        } catch (error) {
            res.status(404).render("errors/404", { message: error.message });
        }
    }
}
