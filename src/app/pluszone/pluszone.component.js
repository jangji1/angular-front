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
var pluszone_service_1 = require("./pluszone.service");
var PluszoneComponent = /** @class */ (function () {
    function PluszoneComponent(routeParams, pluszoneService) {
        var _this = this;
        this.routeParams = routeParams;
        this.pluszoneService = pluszoneService;
        this.data = {};
        this.page = 0;
        this.isMovie = false;
        this.settings = {};
        this.retrieveCourse = function (elearnCourseId) {
            var params = { elearnCourseId: elearnCourseId };
            _this.pluszoneService.retrieveCourse(params)
                .subscribe(function (res) {
                if (res.result) {
                    _this.data = res.result.data;
                }
            }, function (err) {
                if (err) {
                    alert('네트워크 오류');
                }
            });
        };
        this.movePage = function (dir) {
            if (dir === 'prev') {
                _this.page = _this.page - 1;
                _this.isMovie = false;
            }
            else if (dir === 'next') {
                if (_this.page !== 0 && _this.data.courseContentsList) {
                    if (_this.data.courseContentsList[_this.page].type === 'movie') {
                        _this.page = _this.page + 1;
                        _this.isMovie = true;
                    }
                    else {
                        _this.page = _this.page + 1;
                    }
                }
                else {
                    _this.page = _this.page + 1;
                }
            }
        };
        // 앱 컨트롤 영역
        /**
         * 학습하기 종료
         * @desc Native의 onClickClose(boolean isComplete) 를 호출합니다. true : 학습완료 O , false: 학습완료 X
         */
        this.onClickClose = function () {
            console.log('onClickClose() 호출');
            var duration = 0;
            var progress = 0;
            ;
            if (_this.player) {
                _this.player.video.nativeElement.pause();
                duration = _this.player.video.nativeElement.duration;
                progress = Number(((_this.player.playTime / duration) * 100).toFixed(1));
                if (progress >= 66.6) {
                    window['pluszone'].isComplete = true;
                }
            }
            // 네이티브 함수 호출
            window['android'].onClickClose(window['pluszone'].isComplete);
        };
        /**
         * 동영상 종료 취소하기
         * @desc 영상을 이어서 계속 재생합니다.
         */
        this.resume = function () {
            console.log('resume() 호출');
            if (_this.player) {
                _this.player.video.nativeElement.play();
            }
        };
        /**
         * 별점 팝업
         * @desc 별점 팝업을 호출합니다.
         */
        this.onComplete = function () {
            console.log('onComplete() 호출');
            _this.player.video.nativeElement.pause();
            // 네이티브 함수 호출
            window['android'].onComplete();
        };
        /**
         * 별점 팝업 - 다시보기
         * @desc 영상을 처음부터 다시 재생합니다.
         */
        this.replay = function () {
            console.log('replay() 호출');
            if (_this.player) {
                if (_this.player.settings.startTime !== undefined) {
                    _this.player.video.nativeElement.currentTime = _this.player.settings.startTime;
                }
                else {
                    _this.player.video.nativeElement.currentTime = 0;
                }
                _this.player.video.nativeElement.play();
            }
        };
        /**
         * 별점 팝업 - 학습종료
         * @desc 별점 처리 후 Native의 onClose() 를 호출합니다. 숫자형의 score(별점)를 받습니다.
         * @param score
         */
        this.complete = function (score) {
            console.log('replay() 호출');
            console.log('score : ', score);
            // 네이티브 함수 호출
            window['android'].onClose();
        };
        this.routeParams.params.subscribe(function (params) {
            _this.elearnCourseId = params['elearnCourseId'];
        });
        this.retrieveCourse(this.elearnCourseId);
        // 외부 호출 함수
        window['pluszone'] = {
            isComplete: false,
            onClickClose: this.onClickClose,
            replay: this.replay,
            resume: this.resume,
            onComplete: this.onComplete,
            complete: this.complete
        };
    }
    PluszoneComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.ViewChild('player'),
        __metadata("design:type", Object)
    ], PluszoneComponent.prototype, "player", void 0);
    PluszoneComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'pluszone.component.html',
            styleUrls: ['pluszone.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            pluszone_service_1.PluszoneService])
    ], PluszoneComponent);
    return PluszoneComponent;
}());
exports.PluszoneComponent = PluszoneComponent;
//# sourceMappingURL=pluszone.component.js.map