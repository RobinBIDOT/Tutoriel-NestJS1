import {Body, Controller, Get, Post, Render} from '@nestjs/common';
import {SignupDto} from "./dtos/signupDto";
import {UserService} from "./user.service";

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
    postSignup(@Body() body: SignupDto) {
        this.userService.postSignup(body)
    }
}
