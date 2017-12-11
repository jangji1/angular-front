"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var platform_browser_2 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var forms_1 = require("@angular/forms");
var app_routing_1 = require("./app.routing");
var pageNotFound_component_1 = require("./common/pageNotFound.component");
var index_1 = require("./guards/index");
var auth_service_1 = require("./services/auth.service");
var net_service_1 = require("./services/net.service");
var common_service_1 = require("./services/common.service");
var comon_share_module_1 = require("./common/module/comon-share.module");
var home_component_1 = require("./home/home.component");
var pluszone_index_1 = require("./pluszone/pluszone.index");
var product_index_1 = require("./cookie/product.index");
var notice_index_1 = require("./notice/notice.index");
var checktime_index_1 = require("./checktime/checktime.index");
var teachertalk_index_1 = require("./teachertalk/teachertalk.index");
var app_pipe_1 = require("./app.pipe");
var MyHammerConfig = /** @class */ (function (_super) {
    __extends(MyHammerConfig, _super);
    function MyHammerConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.overrides = {
            'swipe': { direction: 31 },
            'pan': { threshold: 1 },
        };
        return _this;
    }
    return MyHammerConfig;
}(platform_browser_2.HammerGestureConfig));
exports.MyHammerConfig = MyHammerConfig;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                app_routing_1.routing,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.JsonpModule,
                comon_share_module_1.CommonSharedModule
            ],
            declarations: [
                app_component_1.AppComponent,
                pageNotFound_component_1.PageNotFoundComponent,
                home_component_1.HomeComponent,
                pluszone_index_1.PluszoneComponent,
                product_index_1.CookieProductDetailComponent,
                app_pipe_1.NumPipe,
                app_pipe_1.NanPipe,
                app_pipe_1.SafeHtmlPipe,
                app_pipe_1.Convert12HPipe,
                app_pipe_1.WeekdayPipe,
                checktime_index_1.ChecktimeMainComponent,
                teachertalk_index_1.TeachertalkComponent,
                notice_index_1.NoticeDetailComponent
            ],
            providers: [
                index_1.AuthGuard,
                net_service_1.NetService,
                common_service_1.CommonService,
                auth_service_1.AuthService,
                {
                    provide: platform_browser_2.HAMMER_GESTURE_CONFIG,
                    useClass: MyHammerConfig
                },
                pluszone_index_1.PluszoneService,
                product_index_1.CookieProductService,
                checktime_index_1.ChecktimeService,
                teachertalk_index_1.TeachertalkService,
                notice_index_1.NoticeService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map