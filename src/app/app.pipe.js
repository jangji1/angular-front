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
var platform_browser_1 = require("@angular/platform-browser");
var NumPipe = /** @class */ (function () {
    function NumPipe() {
    }
    NumPipe.prototype.transform = function (value, args) {
        if (value.length < 1)
            return value;
        return value.replace(/[^0-9]/g, '');
    };
    NumPipe = __decorate([
        core_1.Pipe({
            name: 'num'
        })
    ], NumPipe);
    return NumPipe;
}());
exports.NumPipe = NumPipe;
var NanPipe = /** @class */ (function () {
    function NanPipe() {
    }
    NanPipe.prototype.transform = function (value, args) {
        if (value.length < 1)
            return value;
        return value.replace(/[0-9]/g, '');
    };
    NanPipe = __decorate([
        core_1.Pipe({
            name: 'nan'
        })
    ], NanPipe);
    return NanPipe;
}());
exports.NanPipe = NanPipe;
var SafeHtmlPipe = /** @class */ (function () {
    function SafeHtmlPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafeHtmlPipe.prototype.transform = function (html) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    };
    SafeHtmlPipe = __decorate([
        core_1.Pipe({
            name: 'safeHtml'
        }),
        __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
    ], SafeHtmlPipe);
    return SafeHtmlPipe;
}());
exports.SafeHtmlPipe = SafeHtmlPipe;
var Convert12HPipe = /** @class */ (function () {
    function Convert12HPipe() {
    }
    Convert12HPipe.prototype.transform = function (time) {
        var ampmLabel = ['오전', '오후'];
        var timeRegExFormat = /^([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
        var timeToken = time.match(timeRegExFormat);
        var intHours = parseInt(timeToken[1]);
        var intMinutes = parseInt(timeToken[2]);
        var intSeconds = parseInt(timeToken[3]);
        var strHours12H = ('0' + (intHours == 12 ? 12 : intHours % 12)).slice(-2);
        var strMinutes = intMinutes < 10 ? '0' + intMinutes : intMinutes;
        var strSecondes = intSeconds < 10 ? '0' + intSeconds : intSeconds;
        return ampmLabel[parseInt(String(intHours / 12))] + " " + strHours12H + ":" + strMinutes;
    };
    Convert12HPipe = __decorate([
        core_1.Pipe({
            name: 'convert12H'
        })
    ], Convert12HPipe);
    return Convert12HPipe;
}());
exports.Convert12HPipe = Convert12HPipe;
var WeekdayPipe = /** @class */ (function () {
    function WeekdayPipe() {
    }
    WeekdayPipe.prototype.transform = function (value, args) {
        var weekKor = ['월', '화', '수', '목', '금', '토', '일'];
        return weekKor[value] + '요일';
    };
    WeekdayPipe = __decorate([
        core_1.Pipe({
            name: 'weekday'
        })
    ], WeekdayPipe);
    return WeekdayPipe;
}());
exports.WeekdayPipe = WeekdayPipe;
//# sourceMappingURL=app.pipe.js.map