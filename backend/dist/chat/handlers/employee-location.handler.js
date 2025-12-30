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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeLocationHandler = void 0;
const common_1 = require("@nestjs/common");
const employees_service_1 = require("../../employees/employees.service");
let EmployeeLocationHandler = class EmployeeLocationHandler {
    employeesService;
    intent = 'EMPLOYEE_LOCATION';
    constructor(employeesService) {
        this.employeesService = employeesService;
    }
    async handle(_message, entities, debug) {
        const employeeName = String(entities.employeeName ?? '').trim();
        if (!employeeName) {
            return {
                answer: 'Indica el nombre del empleado para buscar su ubicacion.',
                debug: debug ? { reason: 'missing_name' } : undefined,
            };
        }
        const matches = await this.employeesService.findByName(employeeName);
        const queryInfo = { table: 'empleados', filter: { nombre: employeeName } };
        if (matches.length === 0) {
            return {
                answer: `No encontre empleados con nombre parecido a "${employeeName}".`,
                debug: debug ? { query: queryInfo, count: 0 } : undefined,
            };
        }
        if (matches.length > 1) {
            const options = matches
                .map((employee, index) => {
                const deptName = employee.departamento?.nombre ?? 'Sin departamento';
                const location = employee.departamento?.ubicacion ?? 'Sin sede';
                return `${index + 1}) ${employee.nombre} - ${deptName} (${location})`;
            })
                .join(' ');
            return {
                answer: `Hay mas de un empleado con ese nombre. Indica cual: ${options}`,
                debug: debug
                    ? { query: queryInfo, count: matches.length }
                    : undefined,
            };
        }
        const [employee] = matches;
        const deptName = employee.departamento?.nombre ?? 'Sin departamento';
        const location = employee.departamento?.ubicacion ?? 'Sin sede';
        return {
            answer: `${employee.nombre} es de ${deptName} en la ${location}.`,
            debug: debug ? { query: queryInfo, count: 1 } : undefined,
        };
    }
};
exports.EmployeeLocationHandler = EmployeeLocationHandler;
exports.EmployeeLocationHandler = EmployeeLocationHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employees_service_1.EmployeesService])
], EmployeeLocationHandler);
//# sourceMappingURL=employee-location.handler.js.map