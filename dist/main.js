"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setBaseViewsDir((0, path_1.join)(__dirname, "..", "views"));
    app.useStaticAssets((0, path_1.join)(__dirname, "..", "public"));
    app.setViewEngine("ejs");
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map