"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const database_module_1 = require("../database/database.module");
const employees_controller_1 = require("./employees.controller");
const employees_service_1 = require("./employees.service");
const employees_repository_1 = require("./repositories/employees.repository");
const supabase_employees_repository_1 = require("./repositories/supabase-employees.repository");
let EmployeesModule = class EmployeesModule {
};
exports.EmployeesModule = EmployeesModule;
exports.EmployeesModule = EmployeesModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, auth_module_1.AuthModule],
        controllers: [employees_controller_1.EmployeesController],
        providers: [
            employees_service_1.EmployeesService,
            {
                provide: employees_repository_1.EMPLOYEES_REPOSITORY,
                useClass: supabase_employees_repository_1.SupabaseEmployeesRepository,
            },
        ],
        exports: [employees_service_1.EmployeesService, employees_repository_1.EMPLOYEES_REPOSITORY],
    })
], EmployeesModule);
//# sourceMappingURL=employees.module.js.map