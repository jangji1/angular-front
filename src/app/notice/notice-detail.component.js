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
var router_1 = require("@angular/router");
var notice_service_1 = require("./notice.service");
var NoticeDetailComponent = /** @class */ (function () {
    function NoticeDetailComponent(routeParams, noticeService) {
        var _this = this;
        this.routeParams = routeParams;
        this.noticeService = noticeService;
        this.data = {};
        this.noticeDetail = function (noticeId) {
            var params = { noticeId: noticeId };
            _this.noticeService.noticeDetail(params)
                .subscribe(function (res) {
                if (res.result) {
                    _this.data = res.result.detail;
                }
            }, function (err) {
                if (err) {
                    alert('네트워크 오류');
                }
            });
        };
    }
    NoticeDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeParams.params.subscribe(function (params) {
            _this.noticeId = params['noticeId'];
        });
        this.noticeDetail(this.noticeId);
    };
    NoticeDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            template: "\n        <div class=\"notice\">\n            <div class=\"innertube\" [innerHTML]=\"data.contents | safeHtml\">\n              <div></div>\n            </div>\n        </div>",
            styles: ["\n        .notice {\n            overflow: auto;\n        }\n        .product .innertube {\n            height: 100%;\n        }\n    "]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            notice_service_1.NoticeService])
    ], NoticeDetailComponent);
    return NoticeDetailComponent;
}());
exports.NoticeDetailComponent = NoticeDetailComponent;
//# sourceMappingURL=notice-detail.component.js.map