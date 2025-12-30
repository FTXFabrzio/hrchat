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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const employees_repository_1 = require("./repositories/employees.repository");
let EmployeesService = class EmployeesService {
    employeesRepository;
    constructor(employeesRepository) {
        this.employeesRepository = employeesRepository;
    }
    list(filters) {
        return this.employeesRepository.findAll(filters);
    }
    create(payload) {
        this.assertValidDates(payload.fecha_inicio, payload.fecha_fin);
        return this.employeesRepository.create(payload);
    }
    update(id, payload) {
        this.assertValidDates(payload.fecha_inicio, payload.fecha_fin);
        return this.employeesRepository.update(id, payload);
    }
    remove(id) {
        return this.employeesRepository.remove(id);
    }
    findByName(name) {
        return this.employeesRepository.findByName(name);
    }
    assertValidDates(start, end) {
        if (start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);
            if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
                throw new common_1.BadRequestException('Invalid date format');
            }
            if (endDate < startDate) {
                throw new common_1.BadRequestException('fecha_fin must be after fecha_inicio');
            }
        }
    }
};
exports.EmployeesService = EmployeesService;
exports.EmployeesService = EmployeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(employees_repository_1.EMPLOYEES_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], EmployeesService);
//# sourceMappingURL=employees.service.js.map