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
var checktime_talk_model_1 = require("./checktime.talk.model");
var TalkView = /** @class */ (function () {
    function TalkView() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", checktime_talk_model_1.TalkNode)
    ], TalkView.prototype, "talkNode", void 0);
    TalkView = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: '[talk-view]',
            templateUrl: './checktime.talk.view.component.html',
            styleUrls: ['checktime.talk.view.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], TalkView);
    return TalkView;
}());
exports.TalkView = TalkView;
//# sourceMappingURL=checktime.talk.view.component.js.map