"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonCodeItem = /** @class */ (function () {
    function CommonCodeItem() {
        this.gradeCodeList = null; //학년 코드 10001
        this.subjectCodeList = null; //과목코드 10002
        this.termCodeList = null; //단계코드 10003
        this.companyCodeList = null; //제공업체 10004
        this.levelCodeList = null; //비교과 유형 10005
        this.componentCodeList = null; //컴포넌트 10007
        this.serviceCodeList = null; //제공서비스 10008
        this.eduDataCodeList = null; //교육자료배포 10012
        this.existExpectCodeList = null; //기출예상문제 10013
    }
    CommonCodeItem.prototype.getGradeCodeList = function () {
        return this.gradeCodeList;
    };
    CommonCodeItem.prototype.setGradeCodeList = function (param) {
        this.gradeCodeList = param;
    };
    CommonCodeItem.prototype.getSubjectCodeList = function () {
        return this.subjectCodeList;
    };
    CommonCodeItem.prototype.setSubjectCodeList = function (param) {
        this.subjectCodeList = param;
    };
    CommonCodeItem.prototype.getTermCodeList = function () {
        return this.termCodeList;
    };
    CommonCodeItem.prototype.setTermCodeList = function (param) {
        this.termCodeList = param;
    };
    CommonCodeItem.prototype.getCompanyCodeList = function () {
        return this.companyCodeList;
    };
    CommonCodeItem.prototype.setCompanyCodeList = function (param) {
        this.companyCodeList = param;
    };
    CommonCodeItem.prototype.getLevelCodeList = function () {
        return this.levelCodeList;
    };
    CommonCodeItem.prototype.setLevelCodeList = function (param) {
        this.levelCodeList = param;
    };
    CommonCodeItem.prototype.getComponentCodeList = function () {
        return this.componentCodeList;
    };
    CommonCodeItem.prototype.setComponentCodeList = function (param) {
        this.componentCodeList = param;
    };
    CommonCodeItem.prototype.getServiceCodeList = function () {
        return this.serviceCodeList;
    };
    CommonCodeItem.prototype.setServiceCodeList = function (param) {
        this.serviceCodeList = param;
    };
    CommonCodeItem.prototype.getEduDataCodeList = function () {
        return this.eduDataCodeList;
    };
    CommonCodeItem.prototype.setEduDataCodeList = function (param) {
        this.eduDataCodeList = param;
    };
    CommonCodeItem.prototype.getExistExpectCodeList = function () {
        return this.existExpectCodeList;
    };
    CommonCodeItem.prototype.setExistExpectCodeList = function (param) {
        this.existExpectCodeList = param;
    };
    CommonCodeItem.prototype.setCodeDataFromJson = function (jsonData) {
        this.gradeCodeList = jsonData.gradeCodeList;
        this.subjectCodeList = jsonData.subjectCodeList;
        this.termCodeList = jsonData.termCodeList;
        this.companyCodeList = jsonData.companyCodeList;
        this.levelCodeList = jsonData.levelCodeList;
        this.componentCodeList = jsonData.componentCodeList;
        this.serviceCodeList = jsonData.serviceCodeList;
        this.eduDataCodeList = jsonData.eduDataCodeList;
        this.existExpectCodeList = jsonData.existExpectCodeList;
    };
    return CommonCodeItem;
}());
exports.CommonCodeItem = CommonCodeItem;
//# sourceMappingURL=common-code.item.js.map