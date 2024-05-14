"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const common_2 = require("@nestjs/common");
const session = require("express-session");
const mySqlSession = require("express-mysql-session");
const localsData_1 = require("./middlewares/localsData");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('Bootstrap');
    app.useGlobalPipes(new common_2.ValidationPipe());
    app.setBaseViewsDir((0, path_1.join)(__dirname, "..", "views"));
    app.useStaticAssets((0, path_1.join)(__dirname, "..", "public"));
    app.setViewEngine("ejs");
    const options = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'blog'
    };
    const MySQLStore = mySqlSession(session);
    const store = new MySQLStore(options);
    app.use(session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
        store: store,
    }));
    app.use(localsData_1.localData);
    await app.listen(3000);
    logger.log('Application is running on: ' + await app.getUrl());
}
bootstrap();
//# sourceMappingURL=main.js.map