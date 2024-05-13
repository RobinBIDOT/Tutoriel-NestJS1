import { SignupDto } from "./dtos/signupDto";
import { UserService } from "./user.service";
import { LoginDto } from "./dtos/loginDto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getSignup(): void;
    getLogin(): void;
    postSignup(body: SignupDto): Promise<{
        message: String;
    }>;
    postLogin(body: LoginDto, session: Record<string, any>): Promise<Record<string, any>>;
    postLogout(session: Record<string, any>): void;
}
