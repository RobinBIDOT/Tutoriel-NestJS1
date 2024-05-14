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
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const signupDto_1 = require("./dtos/signupDto");
const user_service_1 = require("./user.service");
const loginDto_1 = require("./dtos/loginDto");
let UserController = UserController_1 = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    getSignup() { }
    getLogin() { }
    async postSignup(body) {
        try {
            const message = await this.userService.postSignup(body);
            return { message };
        }
        catch (error) {
            this.logger.error('Error during signup request', error.stack);
            if (error instanceof common_1.ConflictException) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.CONFLICT);
            }
            throw new common_1.InternalServerErrorException('Internal server error');
        }
    }
    async postLogin(body, session) {
        try {
            const user = await this.userService.postLogin(body);
            session.user = user;
            session.connected = true;
            return session;
        }
        catch (error) {
            this.logger.error('Error during login request', error.stack);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.UnauthorizedException) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.UNAUTHORIZED);
            }
            throw new common_1.InternalServerErrorException('Internal server error');
        }
    }
    postLogout(session) {
        session.destroy((err) => {
            if (err) {
                this.logger.error('Error during logout', err.stack);
                throw new common_1.InternalServerErrorException('Logout failed');
            }
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('/signup'),
    (0, common_1.Render)('user/signup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getSignup", null);
__decorate([
    (0, common_1.Get)('/login'),
    (0, common_1.Render)('user/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getLogin", null);
__decorate([
    (0, common_1.Post)('/signup'),
    (0, common_1.Redirect)('/user/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signupDto_1.SignupDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "postSignup", null);
__decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Post)('/login'),
    (0, common_1.Redirect)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginDto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "postLogin", null);
__decorate([
    (0, common_1.Post)('/logout'),
    (0, common_1.Redirect)('/user/login'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "postLogout", null);
exports.UserController = UserController = UserController_1 = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map