import { Injectable } from '@nestjs/common';
import { SignupDto } from './dtos/signupDto';
import { InjectRepository } from '@nestjs/typeorm';
import {User} from "./user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}
    postSignup(body: SignupDto) {
        
    }
}
