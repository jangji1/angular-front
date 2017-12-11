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
var player_component_1 = require("../component/player/player.component");
var pdf_component_1 = require("../component/pdf/pdf.component");
var checktime_index_1 = require("../../checktime/checktime.index");
var CommonSharedModule = /** @class */ (function () {
    function CommonSharedModule() {
    }
    CommonSharedModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
            ],
            declarations: [
                player_component_1.PlayerComponent,
                pdf_component_1.PdfComponent,
                checktime_index_1.TalkView,
            ],
            exports: [
                player_component_1.PlayerComponent,
                pdf_component_1.PdfComponent,
                checktime_index_1.TalkView,
            ],
            providers: []
        })
    ], CommonSharedModule);
    return CommonSharedModule;
}());
exports.CommonSharedModule = CommonSharedModule;
//# sourceMappingURL=comon-share.module.js.map