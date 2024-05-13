import {Body, Controller, Get, Post, Render, Redirect, UseInterceptors, ClassSerializerInterceptor, Session } from '@nestjs/common';
import {SignupDto} from "./dtos/signupDto";
import {UserService} from "./user.service";
import {LoginDto} from "./dtos/loginDto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get("/signup")
    @Render("user/signup")
    getSignup(){}

    @Get("/login")
    @Render("user/login")
    getLogin(){}

    @Post("/signup")
    @Redirect("/user/login")
    async postSignup(@Body() body: SignupDto) {
        return {message: await this.userService.postSignup(body)}
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post("/login")
    @Redirect("/")
    async postLogin(@Body() body: LoginDto, @Session() session : Record<string, any>){
        const user = await this.userService.postLogin(body)
        session.user = user
        session.connected = true
        return session
    }

    @Post("/logout")
    @Redirect("login")
    postLogout(@Session() session : Record<string, any>) {
        session.destroy( err => {});
    }
}
