import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { SignupDto } from './dtos/signupDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/loginDto';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async postSignup(body: SignupDto): Promise<string> {
        try {
            const { password, email } = body;

            // Check if email is already in use
            const existingUser = await this.usersRepository.findOne({ where: { email } });
            if (existingUser) {
                throw new ConflictException('Email already in use');
            }

            const hash = await bcrypt.hash(password, 10);
            const user = this.usersRepository.create({ ...body, password: hash });
            await this.usersRepository.save(user);
            return 'User Created!';
        } catch (error) {
            this.logger.error('Error during user signup', error.stack);
            throw new ConflictException(error.message);
        }
    }

    async postLogin(body: LoginDto): Promise<User> {
        try {
            const { password, email } = body;
            const user = await this.usersRepository.findOne({
                where: { email },
                select: ['id', 'email', 'username', 'password'], // Ensure password is included in the select
            });
            if (!user) throw new NotFoundException('User Not Found');

            const match = await bcrypt.compare(password, user.password);
            if (!match) throw new UnauthorizedException('Invalid Password');

            delete user.password; // Remove password from user object before returning
            return user;
        } catch (error) {
            this.logger.error('Error during user login', error.stack);
            throw new InternalServerErrorException(error.message);
        }
    }
}
