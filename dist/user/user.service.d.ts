import { SignupDto } from './dtos/signupDto';
import { User } from "./user.entity";
import { Repository } from "typeorm";
export declare class UserService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    postSignup(body: SignupDto): void;
}
