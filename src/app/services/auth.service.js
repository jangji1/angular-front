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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var router_1 = require("@angular/router");
var net_service_1 = require("./net.service");
var config_1 = require("../config/config");
var AuthService = /** @class */ (function (_super) {
    __extends(AuthService, _super);
    function AuthService(route, router, http) {
        var _this = _super.call(this, http) || this;
        _this.route = route;
        _this.router = router;
        _this.jsonHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        return _this;
    }
    AuthService.prototype.login = function (loginInfo) {
        var _this = this;
        var observable = _super.prototype.reqPost.call(this, '/common/login.ajax', loginInfo, this.jsonHeaders);
        observable.subscribe(function (response) {
            if (response.result) {
                if (response.result.success) {
                    _this.redirectUrl = _this.route.snapshot.queryParams['returnUrl'];
                    //유저정보 저장
                    if (response.result.userInfo) {
                        // console.log('auth.service',response.result.userInfo)
                        localStorage.setItem(config_1.config.localStorageUserInfoKey, JSON.stringify(response.result.userInfo));
                    }
                    if (_this.redirectUrl && '' != _this.redirectUrl) {
                        _this.router.navigate([_this.redirectUrl]);
                    }
                    else {
                        _this.router.navigate(['/']);
                    }
                }
                else {
                    localStorage.removeItem(config_1.config.authKey);
                    alert(response.result.errorMsg);
                }
            }
        }, function (error) {
            localStorage.removeItem(config_1.config.authKey);
            console.error("Error : ", error);
            //alert('data를 가지고 올 수 없습니다.\nError :'+error);
        });
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem(config_1.config.authKey);
        this.router.navigate(['/login']);
    };
    AuthService.prototype.isLogin = function () {
        // console.log('로그인 체크 합니다.~');
        if (localStorage.getItem(config_1.config.authKey)) {
            // console.log('data 있으니까 로그인 되어 있습니다.');
            return true;
        }
        else {
            // console.log('data 없으니 로그인 안되어 있습니다.');
            return false;
        }
    };
    AuthService.prototype.getUserInfo = function () {
        if (!this.isLogin()) {
            return null;
        }
        var userInfo = localStorage.getItem(config_1.config.localStorageUserInfoKey);
        if (userInfo) {
            // console.log('userInfo 있음', JSON.parse(userInfo))
            return JSON.parse(userInfo);
        }
        else {
            return null;
        }
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            http_1.Http])
    ], AuthService);
    return AuthService;
}(net_service_1.NetService));
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map