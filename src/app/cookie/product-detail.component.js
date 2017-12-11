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
var product_service_1 = require("./product.service");
var CookieProductDetailComponent = /** @class */ (function () {
    function CookieProductDetailComponent(routeParams, productService) {
        var _this = this;
        this.routeParams = routeParams;
        this.productService = productService;
        this.data = {};
        this.retrieveProductDetail = function (cookieProductId) {
            var params = { cookieProductId: cookieProductId };
            _this.productService.retrieveProductDetail(params)
                .subscribe(function (res) {
                if (res.result) {
                    _this.data = res.result.productDetail;
                }
            }, function (err) {
                if (err) {
                    alert('네트워크 오류');
                }
            });
        };
    }
    CookieProductDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeParams.params.subscribe(function (params) {
            _this.cookieProductId = params['cookieProductId'];
        });
        this.retrieveProductDetail(this.cookieProductId);
    };
    CookieProductDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            template: "\n        <div class=\"product\">\n            <div class=\"innertube\" [innerHTML]=\"data.productCont | safeHtml\"></div>\n        </div>",
            styles: ["\n        .product {\n            overflow: auto;\n        }\n        .product .innertube {\n            height: 100%;\n        }\n    "]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            product_service_1.CookieProductService])
    ], CookieProductDetailComponent);
    return CookieProductDetailComponent;
}());
exports.CookieProductDetailComponent = CookieProductDetailComponent;
//# sourceMappingURL=product-detail.component.js.map