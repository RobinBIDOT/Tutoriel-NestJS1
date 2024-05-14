import {
    Body,
    Controller,
    Get,
    Post,
    Render,
    Redirect,
    UseInterceptors,
    ClassSerializerInterceptor,
    Session,
    HttpException,
    HttpStatus,
    InternalServerErrorException,
    Logger, UnauthorizedException, NotFoundException, ConflictException,
} from '@nestjs/common';
import { SignupDto } from './dtos/signupDto';
import { UserService } from './user.service';
import { LoginDto } from './dtos/loginDto';

@Controller('user')
export class UserController {
    private readonly logger = new Logger(UserController.name);

    constructor(private readonly userService: UserService) {}

    @Get('/signup')
    @Render('user/signup')
    getSignup() {}

    @Get('/login')
    @Render('user/login')
    getLogin() {}

    @Post('/signup')
    @Redirect('/user/login')
    async postSignup(@Body() body: SignupDto) {
        try {
            const message = await this.userService.postSignup(body);
            return { message };
        } catch (error) {
            this.logger.error('Error during signup request', error.stack);
            if (error instanceof ConflictException) {
                throw new HttpException(error.message, HttpStatus.CONFLICT);
            }
            throw new InternalServerErrorException('Internal server error');
        }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/login')
    @Redirect('/')
    async postLogin(@Body() body: LoginDto, @Session() session: Record<string, any>) {
        try {
            const user = await this.userService.postLogin(body);
            session.user = user;
            session.connected = true;
            return session;
        } catch (error) {
            this.logger.error('Error during login request', error.stack);
            if (error instanceof NotFoundException || error instanceof UnauthorizedException) {
                throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
            }
            throw new InternalServerErrorException('Internal server error');
        }
    }

    @Post('/logout')
    @Redirect('/user/login')
    postLogout(@Session() session: Record<string, any>) {
        session.destroy((err) => {
            if (err) {
                this.logger.error('Error during logout', err.stack);
                throw new InternalServerErrorException('Logout failed');
            }
        });
    }
}
