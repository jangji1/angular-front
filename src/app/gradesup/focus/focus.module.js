"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var comon_share_module_1 = require("../../common/module/comon-share.module");
var focus_routing_1 = require("./focus.routing");
var learn_main_component_1 = require("./learn/learn-main.component");
var FocusModule = /** @class */ (function () {
    function FocusModule() {
    }
    FocusModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                focus_routing_1.FocusRouting,
                comon_share_module_1.CommonSharedModule,
            ],
            declarations: [
                learn_main_component_1.LearnMainComponent
            ],
            providers: [
                common_1.CommonModule,
            ],
        })
    ], FocusModule);
    return FocusModule;
}());
exports.FocusModule = FocusModule;
//# sourceMappingURL=focus.module.js.map