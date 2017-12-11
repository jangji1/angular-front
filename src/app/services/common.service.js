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
var core_1 = require("@angular/core");
var net_service_1 = require("./net.service");
var auth_service_1 = require("./auth.service");
var common_code_item_1 = require("./common-code.item");
var router_1 = require("@angular/router");
var config_1 = require("../config/config");
/**
 * 전역에서 공통으로 사용할 싱글톤 서비스
 */
var CommonService = /** @class */ (function () {
    function CommonService(netService, authService, route) {
        this.netService = netService;
        this.authService = authService;
        this.route = route;
        this.commonCode = new common_code_item_1.CommonCodeItem();
        if (authService.isLogin()) {
            // this.refreshCodeData();
        }
    }
    CommonService.prototype.refreshCodeData = function () {
        var _this = this;
        this.netService.reqGet('/code/allCodeList.ajax')
            .subscribe(function (res) {
            //아래 공통 코드 추가/삭제/수정시 common-resolver.service.ts에도 같이 수정해야 합니다.
            for (var _i = 0, _a = res.result; _i < _a.length; _i++) {
                var base = _a[_i];
                switch (base.code_base_id) {
                    case 10001://학년
                        _this.commonCode.setGradeCodeList(base.detailList);
                        break;
                    case 10002://과목
                        _this.commonCode.setSubjectCodeList(base.detailList);
                        break;
                    case 10003://단계
                        _this.commonCode.setTermCodeList(base.detailList);
                        break;
                    case 10004://제공업체
                        _this.commonCode.setCompanyCodeList(base.detailList);
                        break;
                    case 10005://비교과유형
                        _this.commonCode.setLevelCodeList(base.detailList);
                        break;
                    case 10007://컴포넌트
                        _this.commonCode.setComponentCodeList(base.detailList);
                        break;
                    case 10008://제공서비스
                        _this.commonCode.setServiceCodeList(base.detailList);
                        break;
                    case 10012://교육자료배포
                        _this.commonCode.setEduDataCodeList(base.detailList);
                        break;
                    case 10013://기출예상문제회차
                        _this.commonCode.setExistExpectCodeList(base.detailList);
                        break;
                }
            }
            localStorage.setItem(config_1.config.localStorageCommonCodeKey, JSON.stringify(_this.commonCode));
        }, function (err) {
            if (err) {
                alert("코드 가져오기를 실패 하였습니다.");
            }
        });
    };
    CommonService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [net_service_1.NetService,
            auth_service_1.AuthService,
            router_1.ActivatedRoute])
    ], CommonService);
    return CommonService;
}());
exports.CommonService = CommonService;
//# sourceMappingURL=common.service.js.map