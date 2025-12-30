"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = exports.SUPABASE_CLIENT = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const supabase_js_1 = require("@supabase/supabase-js");
exports.SUPABASE_CLIENT = Symbol('SUPABASE_CLIENT');
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            {
                provide: exports.SUPABASE_CLIENT,
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const url = configService.get('SUPABASE_URL');
                    const serviceRoleKey = configService.get('SUPABASE_SERVICE_ROLE_KEY');
                    if (!url || !serviceRoleKey) {
                        throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
                    }
                    return (0, supabase_js_1.createClient)(url, serviceRoleKey, {
                        auth: { persistSession: false, autoRefreshToken: false },
                    });
                },
            },
        ],
        exports: [exports.SUPABASE_CLIENT],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map