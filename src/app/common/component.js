"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonComponent = /** @class */ (function () {
    function CommonComponent() {
        this.pageNo = 1;
        this.totalCnt = 10; // total numbar of page not items 
        this.listSize = 10; // max page size
    }
    CommonComponent.prototype.initPagenation = function () {
        this.totalCnt = 0;
        this.listSize = 0;
        this.listStartIndex = 0;
        this.pageNo = 0;
    };
    CommonComponent.prototype.setPagination = function (info) {
        if (info) {
            this.totalCnt = info.pageInfo.totalCnt;
            this.listSize = info.pageInfo.listSize;
            this.listStartIndex = this.totalCnt - (this.listSize * (this.pageNo - 1));
        }
    };
    CommonComponent.prototype.setPage = function (pageNo) {
        this.pageNo = pageNo;
    };
    ;
    CommonComponent.prototype.pageChanged = function (event) {
        //this method will trigger every page click  
        // console.log('Number items per page: ' + event.itemsPerPage);
    };
    ;
    return CommonComponent;
}());
exports.CommonComponent = CommonComponent;
//# sourceMappingURL=component.js.map