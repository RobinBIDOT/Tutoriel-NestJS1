import { SignupDto } from './dtos/signupDto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dtos/loginDto';
export declare class UserService {
    private readonly usersRepository;
    private readonly logger;
    constructor(usersRepository: Repository<User>);
    postSignup(body: SignupDto): Promise<string>;
    postLogin(body: LoginDto): Promise<User>;
}
