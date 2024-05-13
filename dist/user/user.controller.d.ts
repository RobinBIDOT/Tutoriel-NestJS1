import { SignupDto } from "./dtos/signupDto";
import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getSignup(): void;
    getLogin(): void;
    postSignup(body: SignupDto): void;
}
