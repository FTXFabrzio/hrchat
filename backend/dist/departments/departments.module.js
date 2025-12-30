"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const database_module_1 = require("../database/database.module");
const departments_controller_1 = require("./departments.controller");
const departments_service_1 = require("./departments.service");
const departments_repository_1 = require("./repositories/departments.repository");
const supabase_departments_repository_1 = require("./repositories/supabase-departments.repository");
let DepartmentsModule = class DepartmentsModule {
};
exports.DepartmentsModule = DepartmentsModule;
exports.DepartmentsModule = DepartmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, auth_module_1.AuthModule],
        controllers: [departments_controller_1.DepartmentsController],
        providers: [
            departments_service_1.DepartmentsService,
            {
                provide: departments_repository_1.DEPARTMENTS_REPOSITORY,
                useClass: supabase_departments_repository_1.SupabaseDepartmentsRepository,
            },
        ],
        exports: [departments_service_1.DepartmentsService, departments_repository_1.DEPARTMENTS_REPOSITORY],
    })
], DepartmentsModule);
//# sourceMappingURL=departments.module.js.map