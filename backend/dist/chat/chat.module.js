"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const employees_module_1 = require("../employees/employees.module");
const chat_controller_1 = require("./chat.controller");
const chat_constants_1 = require("./chat.constants");
const chat_service_1 = require("./chat.service");
const intent_classifier_1 = require("./intent-classifier");
const employee_location_handler_1 = require("./handlers/employee-location.handler");
const unknown_intent_handler_1 = require("./handlers/unknown-intent.handler");
const chat_webhook_service_1 = require("./chat-webhook.service");
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [employees_module_1.EmployeesModule, auth_module_1.AuthModule],
        controllers: [chat_controller_1.ChatController],
        providers: [
            chat_service_1.ChatService,
            chat_webhook_service_1.ChatWebhookService,
            intent_classifier_1.IntentClassifier,
            employee_location_handler_1.EmployeeLocationHandler,
            unknown_intent_handler_1.UnknownIntentHandler,
            {
                provide: chat_constants_1.CHAT_HANDLERS,
                useFactory: (employeeLocationHandler, unknownIntentHandler) => [employeeLocationHandler, unknownIntentHandler],
                inject: [employee_location_handler_1.EmployeeLocationHandler, unknown_intent_handler_1.UnknownIntentHandler],
            },
        ],
    })
], ChatModule);
//# sourceMappingURL=chat.module.js.map