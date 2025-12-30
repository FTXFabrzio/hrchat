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
exports.DepartmentsService = void 0;
const common_1 = require("@nestjs/common");
const departments_repository_1 = require("./repositories/departments.repository");
let DepartmentsService = class DepartmentsService {
    departmentsRepository;
    constructor(departmentsRepository) {
        this.departmentsRepository = departmentsRepository;
    }
    list(search) {
        return this.departmentsRepository.findAll(search);
    }
    create(payload) {
        return this.departmentsRepository.create(payload);
    }
    update(id, payload) {
        return this.departmentsRepository.update(id, payload);
    }
    remove(id) {
        return this.departmentsRepository.remove(id);
    }
};
exports.DepartmentsService = DepartmentsService;
exports.DepartmentsService = DepartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(departments_repository_1.DEPARTMENTS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], DepartmentsService);
//# sourceMappingURL=departments.service.js.map