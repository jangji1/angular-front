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
var PlayerComponent = /** @class */ (function () {
    function PlayerComponent() {
        var _this = this;
        // 플레이어 상태
        this.isFullscreen = false;
        this.isMiniview = false;
        this.isLock = false;
        this.isRepeat = false;
        this.isNav = false;
        this.isVolume = false;
        this.repeata = null;
        this.repeatb = null;
        this.playTime = 0;
        this.volumeDrag = false;
        // Seekbar
        this.seekValue = 0;
        this.isShowLabel = false;
        this.seekDrag = false;
        /**
         * 메타데이타 로드
         */
        this.loadmetadata = function () {
            _this.init();
            _this.setOptions(_this.settings);
            _this.playerOut();
        };
        /**
         * 초기화
         */
        this.init = function () {
            _this.dragResize(); // 미니뷰 사이즈 조절/이동(jQuery-ui)
        };
        /**
         * 사용자 설정 변경
         */
        this.setOptions = function (options) {
            // reset status
            _this.seekValue = 0;
            _this.playTime = 0;
            // 사용자 설정 값 세팅
            _this.settings = options;
            // 시작, 종료시간이 지정되었을 때
            if (_this.settings.startTime !== undefined && _this.settings.endTime !== undefined) {
                _this.video.nativeElement.pause();
                _this.video.nativeElement.currentTime = _this.settings.startTime;
                _this.setStartEnd();
            }
            else {
                _this.video.nativeElement.pause();
                if (_this.movieInfo.courseMovieChapterList) {
                    _this.settings.startTime = _this.HmsToSeconds(_this.movieInfo.courseMovieChapterList[0].startTime);
                    _this.settings.endTime = _this.HmsToSeconds(_this.movieInfo.courseMovieChapterList[0].endTime);
                    _this.selectMovie(0);
                }
                else {
                    _this.video.nativeElement.currentTime = 0;
                }
                _this.setStartEnd();
            }
            // 미니뷰로 지정했을 때
            if (_this.settings.miniview) {
                _this.isMiniview = false;
                _this.miniview();
            }
            // 현 재생시간을 지정했을 때
            if (_this.settings.currentTime != undefined) {
                // 시작, 종료시간이 지정되었을 때
                if (_this.settings.startTime !== undefined && _this.settings.endTime !== undefined) {
                    _this.video.nativeElement.currentTime = _this.settings.startTime + _this.settings.currentTime;
                }
                else {
                    _this.video.nativeElement.currentTime = _this.settings.currentTime;
                }
            }
            // 배속을 지정했을 때
            if (_this.settings.speed != undefined) {
                if (_this.settings.speed < 1.4 && _this.settings.speed > 0.8) {
                    _this.video.nativeElement.playbackRate = _this.settings.speed;
                }
            }
            else {
                _this.textspeed.nativeElement.innerHTML = _this.video.nativeElement.playbackRate.toFixed(1);
            }
            // 볼륨을 지정했을 때
            if (_this.settings.volume != undefined) {
                //this.rangevolume.nativeElement.value = this.settings.volume;
                _this.textvolume.nativeElement.innerHTML = (_this.video.settings.volume * 100) + '%';
            }
            else {
                //this.rangevolume.nativeElement.value = this.video.nativeElement.volume;
                _this.textvolume.nativeElement.innerHTML = (_this.video.nativeElement.volume * 100) + '%';
            }
            // 자동 재생
            if (_this.video.nativeElement.autoplay) {
                _this.video.nativeElement.play();
            }
        };
        /**
         * 시작/종료 시간 설정
         */
        this.setStartEnd = function () {
            // 시작시간이 지정되었을 때
            if (_this.settings.startTime !== undefined) {
                var currentTime = _this.video.nativeElement.currentTime - _this.settings.startTime;
                _this.currenttime.nativeElement.innerHTML = _this.secondsToHms(Math.floor(currentTime)); // 현 재생시간
            }
            else {
                _this.currenttime.nativeElement.innerHTML = _this.secondsToHms(Math.floor(_this.video.nativeElement.currentTime));
            }
            // 종료시간이 지정되었을 때
            if (_this.settings.endTime !== undefined) {
                var endTime = _this.settings.endTime - _this.settings.startTime;
                _this.totaltime.nativeElement.innerHTML = _this.secondsToHms(Math.floor(endTime)); // 총 재생시간
            }
            else {
                _this.totaltime.nativeElement.innerHTML = _this.secondsToHms(Math.floor(_this.video.nativeElement.duration));
            }
        };
        /**
         * 볼륨 조정
         */
        this.volume = function () {
            _this.isVolume = !_this.isVolume;
        };
        this.changeVolume = function () {
            _this.textvolume.nativeElement.innerHTML = (_this.video.nativeElement.volume * 100) + '%';
        };
        this.touchStartVolume = function (e) {
            var pageY = e.type === 'touchstart' ? e.touches[0].pageY : e.pageY;
            _this.startPageY = pageY;
            _this.startVolume = _this.video.nativeElement.volume;
            _this.volumeDrag = true;
        };
        this.touchEndVolume = function (e) {
            if (_this.volumeDrag) {
                _this.volumeDrag = false;
            }
        };
        this.progressVolume = function (e) {
            if (_this.volumeDrag) {
                var pageY = e.type === 'touchmove' ? e.touches[0].pageY : e.pageY;
                var moveRange = Math.floor((pageY - _this.startPageY) / 17) / 10;
                var changeVolume = Number((_this.startVolume - moveRange).toFixed(1));
                if (changeVolume >= 0 && changeVolume <= 1) {
                    _this.video.nativeElement.volume = changeVolume;
                }
            }
        };
        /**
         * 재생 일시정지
         */
        this.playpause = function () {
            if (_this.video.nativeElement.paused) {
                if (Math.floor(_this.settings.endTime) !== Math.floor(_this.video.nativeElement.currentTime)) {
                    _this.video.nativeElement.play();
                }
            }
            else {
                _this.video.nativeElement.pause();
            }
        };
        /**
         * 풀스크린
         */
        this.fullscreen = function () {
            _this.isFullscreen = !_this.isFullscreen;
        };
        /**
         * Seekbar
         */
        this.timeUpdate = function () {
            var seekValue;
            if (!_this.video.nativeElement.paused) {
                // 시작시간, 종료시간이 지정되었을 때
                _this.changeSeekValue();
                // 시작시간이 지정되었을 때
                _this.changeSeekTime();
                // 라벨
                if (_this.seekValue < 5) {
                    _this.seeklabel.nativeElement.style.left = '5%';
                }
                else if (_this.seekValue > 95) {
                    _this.seeklabel.nativeElement.style.left = '95%';
                }
                else {
                    _this.seeklabel.nativeElement.style.left = _this.seekValue + '%';
                }
                // 반복구간이 설정되었을 때
                if (_this.repeata && _this.repeatb) {
                    if (Math.floor(_this.video.nativeElement.currentTime) == Math.floor(_this.repeatb)) {
                        _this.video.nativeElement.pause();
                        _this.video.nativeElement.currentTime = _this.repeata;
                        _this.video.nativeElement.play();
                    }
                }
            }
        };
        /**
         * 프로그레스바 업데이트
         */
        this.changeSeekValue = function () {
            var seekValue;
            if (_this.settings.startTime !== undefined && _this.settings.endTime !== undefined) {
                seekValue = 100 - (_this.settings.endTime - _this.video.nativeElement.currentTime) * (100 / (_this.settings.endTime - _this.settings.startTime));
                _this.seekValue = seekValue;
                // 지정된 종료시간에 도달하면 
                if (Math.floor(_this.settings.endTime) < Math.floor(_this.video.nativeElement.currentTime)) {
                    _this.ended();
                }
            }
            else {
                seekValue = (100 / (_this.video.nativeElement.duration)) * _this.video.nativeElement.currentTime;
                _this.seekValue = seekValue;
            }
        };
        /**
         * 현재시간 업데이트
         */
        this.changeSeekTime = function () {
            if (_this.settings.startTime !== undefined) {
                var currentTime = _this.video.nativeElement.currentTime - _this.settings.startTime;
                _this.currenttime.nativeElement.innerHTML = _this.secondsToHms(Math.floor(currentTime)); // 현 재생시간
                _this.seeklabel.nativeElement.innerHTML = _this.secondsToHms(Math.floor(currentTime));
            }
            else {
                _this.currenttime.nativeElement.innerHTML = _this.secondsToHms(Math.floor(_this.video.nativeElement.currentTime));
                _this.seeklabel.nativeElement.innerHTML = _this.secondsToHms(Math.floor(_this.video.nativeElement.currentTime));
            }
        };
        this.touchStartSeek = function (e) {
            _this.video.nativeElement.pause();
            _this.isShowLabel = true;
            clearTimeout(_this.labelTimer);
            var pageX = e.type === 'touchstart' ? e.touches[0].pageX : e.pageX;
            _this.seekPageX = pageX;
            _this.seekDrag = true;
            _this.progressSeek(_this.seekPageX);
        };
        this.touchEndSeek = function (e) {
            _this.video.nativeElement.play();
            _this.labelTimer = setTimeout(function () {
                _this.isShowLabel = false;
            }, 1000);
            _this.updateSeek();
            if (_this.seekDrag) {
                _this.seekDrag = false;
            }
        };
        this.moveSeek = function (e) {
            if (_this.seekDrag) {
                var pageX = e.type === 'touchmove' ? e.touches[0].pageX : e.pageX;
                _this.seekPageX = pageX;
                _this.progressSeek(_this.seekPageX);
            }
        };
        this.progressSeek = function (x) {
            var position = x;
            var percentage = 100 * position / _this.seek.nativeElement.clientWidth;
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }
            _this.seekValue = percentage;
            var time;
            //시작시간, 종료시간이 지정되었을 때
            if (_this.settings.startTime !== undefined && _this.settings.endTime !== undefined) {
                time = _this.settings.startTime + (_this.settings.endTime - _this.settings.startTime) * (Number(_this.seekValue) / 100);
            }
            else {
                time = _this.video.nativeElement.duration * (Number(_this.seekValue) / 100);
            }
            // 라벨
            if (_this.settings.startTime !== undefined && _this.settings.endTime !== undefined) {
                var currentTime = time - _this.settings.startTime;
                _this.currenttime.nativeElement.innerHTML = _this.secondsToHms(Math.floor(currentTime)); // 현 재생시간
                _this.seeklabel.nativeElement.innerHTML = _this.secondsToHms(Math.floor(currentTime));
            }
            else {
                _this.currenttime.nativeElement.innerHTML = _this.secondsToHms(Math.floor(time)); // 현 재생시간
                _this.seeklabel.nativeElement.innerHTML = _this.secondsToHms(Math.floor(time));
            }
            if (_this.seekValue < 5) {
                _this.seeklabel.nativeElement.style.left = '5%';
            }
            else if (_this.seekValue > 95) {
                _this.seeklabel.nativeElement.style.left = '95%';
            }
            else {
                _this.seeklabel.nativeElement.style.left = _this.seekValue + '%';
            }
        };
        this.updateSeek = function () {
            var time;
            //시작시간, 종료시간이 지정되었을 때
            if (_this.settings.startTime !== undefined && _this.settings.endTime !== undefined) {
                time = _this.settings.startTime + (_this.settings.endTime - _this.settings.startTime) * (Number(_this.seekValue) / 100);
            }
            else {
                time = _this.video.nativeElement.duration * (Number(_this.seekValue) / 100);
            }
            // 구간반복 상태일때
            if (_this.isRepeat) {
                if (!_this.repeata) {
                    _this.repeata = time;
                    _this.seekrepeata.nativeElement.style.left = _this.seekValue + '%';
                }
                else if (!_this.repeatb) {
                    if (_this.repeata < time) {
                        _this.repeatb = time;
                        _this.seekrepeatb.nativeElement.style.left = _this.seekValue + '%';
                    }
                }
                _this.isRepeat = false;
            }
            _this.video.nativeElement.currentTime = time;
        };
        /**
         * 구간 반복
         */
        this.repeat = function () {
            if (_this.repeata && _this.repeatb) {
                _this.repeata = null, _this.repeatb = null;
                _this.isRepeat = false;
                return false;
            }
            if (!_this.isRepeat) {
                if (_this.repeata && _this.repeatb) {
                    _this.video.nativeElement.currentTime = _this.repeata;
                }
                _this.isRepeat = true;
            }
        };
        /**
         * 영상 종료
         */
        this.ended = function () {
            window['pluszone'].onComplete();
        };
        /**
         * 되감기/빨리감기
         */
        this.rewindForward = function (dir) {
            if (dir && !_this.isMiniview) {
                var seekValue = void 0;
                if (dir === '+') {
                    // 종료시간이 지정되었을 때
                    if (_this.settings.endTime !== undefined) {
                        if (_this.video.nativeElement.currentTime > _this.settings.endTime - 2) {
                            _this.video.nativeElement.currentTime = _this.settings.endTime;
                        }
                        else {
                            _this.video.nativeElement.currentTime += 2;
                        }
                    }
                    else {
                        _this.video.nativeElement.currentTime += 2;
                    }
                }
                else if (dir === '-') {
                    // 시작시간이 지정되었을 때
                    if (_this.settings.startTime !== undefined) {
                        if (_this.video.nativeElement.currentTime < _this.settings.startTime + 2) {
                            _this.video.nativeElement.currentTime = _this.settings.startTime;
                        }
                        else {
                            _this.video.nativeElement.currentTime -= 2;
                        }
                    }
                    else {
                        _this.video.nativeElement.currentTime -= 2;
                    }
                }
                _this.changeSeekValue();
                _this.changeSeekTime();
            }
        };
        /**
         * 미니뷰 사이즈 조절/이동(jQuery-ui)
         */
        this.dragResize = function () {
            jQuery(_this.container.nativeElement).draggable({
                containment: "#main",
                disabled: true,
                scroll: false,
                snap: "#main",
                handle: ".myvideo"
            }).resizable({
                containment: "#main",
                aspectRatio: true,
                handles: "ne, se, sw, nw",
                minWidth: 150,
                disabled: true
            });
        };
        /**
         * 미니뷰
         */
        this.miniview = function () {
            // 잠금상태일때 동작 불가
            if (_this.isLock)
                return false;
            if (!_this.isMiniview) {
                jQuery(_this.container.nativeElement).draggable("enable"); // 사이즈 조절/이동 가능(jQuery-ui)
                jQuery(_this.container.nativeElement).resizable("enable");
                _this.isMiniview = true;
            }
            else {
                jQuery(_this.container.nativeElement).draggable("disable"); // 사이즈 조절/이동 불가(jQuery-ui)
                jQuery(_this.container.nativeElement).resizable("disable");
                _this.isMiniview = false;
            }
        };
        /**
         * 잠금
         */
        this.lock = function () {
            _this.isLock = !_this.isLock;
        };
        /**
         * 네비게이터
         */
        this.nav = function () {
            _this.isNav = !_this.isNav;
        };
        /**
         * 영상 선택
         */
        this.selectMovie = function (idx) {
            _this.selectMovieIdx = idx;
        };
        /**
         * 배속
         */
        this.alterPlayBackRate = function (dir) {
            if (dir) {
                var currentPlayBackRate = _this.video.nativeElement.playbackRate;
                if (dir === '+') {
                    if (currentPlayBackRate < 1.5) {
                        if (currentPlayBackRate === 1.2) {
                            _this.video.nativeElement.playbackRate += 0.3;
                        }
                        else {
                            _this.video.nativeElement.playbackRate += 0.2;
                        }
                    }
                }
                else if (dir === '-') {
                    if (currentPlayBackRate > 0.8) {
                        if (currentPlayBackRate === 1.5) {
                            _this.video.nativeElement.playbackRate -= 0.3;
                        }
                        else {
                            _this.video.nativeElement.playbackRate -= 0.2;
                        }
                    }
                }
                _this.textspeed.nativeElement.innerHTML = _this.video.nativeElement.playbackRate.toFixed(1);
            }
        };
        /**
         * 캡처
         */
        this.capture = function () {
            var ratio = _this.video.nativeElement.videoWidth / _this.video.nativeElement.videoHeight;
            var w = _this.video.nativeElement.videoWidth; // 동영상 원본 사이즈
            var h = _this.video.nativeElement.videoHeight; // 동영상 원본 사이즈
            var context = _this.canvas.nativeElement.getContext("2d");
            _this.canvas.nativeElement.width = w;
            _this.canvas.nativeElement.height = h;
            context.fillRect(0, 0, w, h);
            context.drawImage(_this.video.nativeElement, 0, 0, w, h);
            _this.downloadcapture.nativeElement.click();
        };
        /**
         * 캡처 다운로드
         */
        this.downloadCanvas = function () {
            _this.downloadcapture.nativeElement.href = _this.canvas.nativeElement.toDataURL();
            _this.downloadcapture.nativeElement.download = "capture.png"; // 다운로드 이미지명
        };
        /**
         * 비디오 정보
         */
        this.getVideoInfo = function () {
        };
        /**
         * 플레이어 동작 없을 시 컨트롤러 숨김
         */
        this.playerIn = function () {
            clearTimeout(_this.usePlayerTimer);
        };
        this.playerOut = function () {
            _this.usePlayerTimer = setTimeout(function () {
                _this.isLock = true;
            }, 7000);
        };
        /**
         * 재생시간 측정
         */
        this.startTimer = function () {
            _this.playTimer = setInterval(function () {
                _this.playTime = (_this.playTime + (1 * _this.video.nativeElement.playbackRate));
            }, 1000);
        };
        this.stopTimer = function () {
            clearInterval(_this.playTimer);
        };
        /**
         * 팝업 호출
         */
        this.onClickClose = function () {
            window['pluszone'].onClickClose();
        };
    }
    /**
     * 시분초 변환
     */
    PlayerComponent.prototype.secondsToHms = function (s) {
        var hours = Math.floor(s / 3600);
        var minutes = Math.floor((s - (hours * 3600)) / 60);
        var seconds = s - (hours * 3600) - (minutes * 60);
        var hms;
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (hours === '00')
            hms = minutes + ':' + seconds;
        else
            hms = hours + ':' + minutes + ':' + seconds;
        return hms;
    };
    PlayerComponent.prototype.HmsToSeconds = function (hms) {
        var a = hms.split(':');
        var s = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
        return s;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PlayerComponent.prototype, "source", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PlayerComponent.prototype, "subtitles", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "settings", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "movePage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "movieInfo", void 0);
    __decorate([
        core_1.ViewChild('customVideo'),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "container", void 0);
    __decorate([
        core_1.ViewChild('myVideo'),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "video", void 0);
    __decorate([
        core_1.ViewChild('btnRepeat'),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "repeatbutton", void 0);
    __decorate([
        core_1.ViewChild('btnPlaypause'),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "playbutton", void 0);
    __decorate([
        core_1.ViewChild('btnFullscreen'),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "fullscreenbutton", void 0);
    __decorate([
        core_1.ViewChild('btnRewind'),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "rewindbutton", void 0);
    __decorate([
        core_1.ViewChild('btnForward'),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "forwardbutton", void 0);
    __decorate([
        core_1.ViewChild('btnSlower'),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "slowerbutton", void 0);
    __decorate([
        core_1.ViewChild('btnFaster'),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "fasterbutton", void 0);
    __decorate([
        core_1.ViewChild('btnMini'),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "minibutton", void 0);
    __decorate([
        core_1.ViewChild('btnCapture'),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "capturebutton", void 0);
    __decorate([
        core_1.ViewChild('btnLock'),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "lockbutton", void 0);
    __decorate([
        core_1.ViewChild('seekbar'),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "seek", void 0);
    __decorate([
        core_1.ViewChild('seekLabel'),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "seeklabel", void 0);
    __decorate([
        core_1.ViewChild('seekRepeatA'),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "seekrepeata", void 0);
    __decorate([
        core_1.ViewChild('seekRepeatB'),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "seekrepeatb", void 0);
    __decorate([
        core_1.ViewChild('currentTime'),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "currenttime", void 0);
    __decorate([
        core_1.ViewChild('totalTime'),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "totaltime", void 0);
    __decorate([
        core_1.ViewChild('canvas'),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "canvas", void 0);
    __decorate([
        core_1.ViewChild('canvasImage'),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "downloadcapture", void 0);
    __decorate([
        core_1.ViewChild('txtSpeed'),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "textspeed", void 0);
    __decorate([
        core_1.ViewChild('volumeCtrl'),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "volumecontrol", void 0);
    __decorate([
        core_1.ViewChild('txtVolume'),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "textvolume", void 0);
    __decorate([
        core_1.ViewChild('rangeVolume'),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "rangevolume", void 0);
    PlayerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'player',
            templateUrl: 'player.component.html',
            styleUrls: ['player.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], PlayerComponent);
    return PlayerComponent;
}());
exports.PlayerComponent = PlayerComponent;
//# sourceMappingURL=player.component.js.map