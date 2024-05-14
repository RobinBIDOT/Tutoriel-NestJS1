"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let UserService = UserService_1 = class UserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async postSignup(body) {
        try {
            const { password, email } = body;
            const existingUser = await this.usersRepository.findOne({ where: { email } });
            if (existingUser) {
                throw new common_1.ConflictException('Email already in use');
            }
            const hash = await bcrypt.hash(password, 10);
            const user = this.usersRepository.create({ ...body, password: hash });
            await this.usersRepository.save(user);
            return 'User Created!';
        }
        catch (error) {
            this.logger.error('Error during user signup', error.stack);
            throw new common_1.ConflictException(error.message);
        }
    }
    async postLogin(body) {
        try {
            const { password, email } = body;
            const user = await this.usersRepository.findOne({
                where: { email },
                select: ['id', 'email', 'username', 'password'],
            });
            if (!user)
                throw new common_1.NotFoundException('User Not Found');
            const match = await bcrypt.compare(password, user.password);
            if (!match)
                throw new common_1.UnauthorizedException('Invalid Password');
            delete user.password;
            return user;
        }
        catch (error) {
            this.logger.error('Error during user login', error.stack);
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map