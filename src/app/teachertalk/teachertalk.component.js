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
var teachertalk_service_1 = require("./teachertalk.service");
var config_1 = require("../config/config");
var TeachertalkComponent = /** @class */ (function () {
    function TeachertalkComponent(routeParams, service, ref) {
        var _this = this;
        this.routeParams = routeParams;
        this.service = service;
        this.ref = ref;
        this.websocketUri = config_1.config.ws + "/nadmin/middle/teacherTalkSend";
        this.webSocket = null;
        this.data = JSON.parse(localStorage.getItem('teacherTalkMsg'));
        this.paging = {
            totalCnt: 0,
            newCnt: 0,
            pageSize: 30,
            pageNo: 1,
            endPageNo: 1
        };
        this.scrollPos = 0;
        this.deleteMsg = {
            talkNo: null,
            idx: null
        };
        /**
         * 웹소켓 푸시
         */
        this.webSocketSend = function (msg) {
            var message = {
                msgContent: $.trim(msg),
                stuId: _this.stuId,
            };
            _this.webSocket.send(JSON.stringify(message));
        };
        this.sendMessage = function (msg) {
            var params = {
                talkType: 'S',
                msgType: 'T',
                msgContent: msg,
                stuId: _this.stuId
            };
            _this.service.registTalkMsg(params)
                .subscribe(function (res) {
                if (res.result) {
                    _this.webSocketSend(msg);
                    _this.data.push(res.result.newMsg);
                    _this.ref.detectChanges();
                    _this.scrollPos = _this.data.length - 1;
                    localStorage.setItem('teacherTalkMsg', JSON.stringify(_this.data));
                    scrollTo(0, $(document).height());
                }
            }, function (err) {
                if (err) {
                    alert('네트워크 오류');
                }
            });
        };
        this.sendImgMessage = function (res) {
            var newMsg = JSON.parse(res);
            _this.webSocketSend(newMsg.msgContent);
            _this.data.push(newMsg);
            _this.ref.detectChanges();
            _this.scrollPos = _this.data.length - 1;
            localStorage.setItem('teacherTalkMsg', JSON.stringify(_this.data));
            scrollTo(0, $(document).height());
        };
        this.syncMessage = function () {
            _this.service.teacherTalkSyncMsg({ stuId: _this.stuId })
                .subscribe(function (res) {
                if (res.result) {
                    _this.data = res.result.syncMsgList.filter(function (item) {
                        return item.senderDelYn == 'N';
                    });
                    _this.ref.detectChanges();
                    _this.paging.totalCnt = _this.data.length;
                    _this.paging.endPageNo = Math.ceil(_this.paging.totalCnt / _this.paging.pageSize);
                    _this.scrollPos = _this.data.length - 1;
                    localStorage.setItem('teacherTalkMsg', JSON.stringify(_this.data));
                    scrollTo(0, $(document).height());
                }
            }, function (err) {
                if (err) {
                    alert('네트워크 오류');
                }
            });
        };
        this.readMessage = function () {
            _this.service.completeMsgRead({ stuId: _this.stuId })
                .subscribe(function (res) {
                if (res.result) {
                    scrollTo(0, $(document).height());
                }
            }, function (err) {
                if (err) {
                    alert('네트워크 오류');
                }
            });
        };
        this.newMessage = function () {
            _this.service.teacherTalkNewMsg({ stuId: _this.stuId })
                .subscribe(function (res) {
                if (res.result) {
                    _this.paging.newCnt = res.result.newMessageCount;
                    _this.paging.pageSize = _this.paging.newCnt > 30 ? _this.paging.newCnt : 30;
                    var newMsgList = res.result.newMsgList.filter(function (item) {
                        return item.senderDelYn == 'N';
                    });
                    (_a = _this.data).push.apply(_a, newMsgList);
                    _this.ref.detectChanges();
                    _this.scrollPos = _this.data.length - 1;
                    localStorage.setItem('teacherTalkMsg', JSON.stringify(_this.data));
                    if (_this.paging.newCnt > 0) {
                        _this.readMessage();
                    }
                }
                var _a;
            }, function (err) {
                if (err) {
                    alert('네트워크 오류');
                }
            });
        };
        this.callbackDialog = function (tag, state) {
            switch (tag) {
                case 1:
                    if (state)
                        _this.deleteMessage();
                    return;
                case 2:
                    return;
                default:
                    return;
            }
        };
        this.deleteConfirm = function (talkNo, idx) {
            _this.deleteMsg = {
                talkNo: talkNo,
                idx: idx
            };
            /**
             * 네이티브 함수 호출
             * public void showDialog(int tag, String title, String message, String confirmtTtle, String cancelTitle)
             */
            console.log('showDialog() 호출');
            window['dialogBridge'].showWebDialog(1, '삭제', '메시지를 삭제하겠습니까?', '삭제', '취소');
            /* if (confirm('메시지를 삭제하시겠습니까?')) {
              this.callbackDialog(1, true);
            } */
        };
        this.deleteMessage = function () {
            var params = {
                talkNo: _this.deleteMsg.talkNo,
                stuId: _this.stuId
            };
            _this.service.deleteTalkMsg(params)
                .subscribe(function (res) {
                if (res.result) {
                    _this.data.splice(_this.deleteMsg.idx, 1);
                    _this.ref.detectChanges();
                    localStorage.setItem('teacherTalkMsg', JSON.stringify(_this.data));
                    window['dialogBridge'].showToast('삭제 되었습니다.');
                }
            }, function (err) {
                if (err) {
                    alert('네트워크 오류');
                }
            });
        };
        this.openDoc = function (link) {
            alert("TODO : " + link);
        };
        this.touchView = function () {
            window['dialogBridge'].onTouchWebView();
        };
        window['teachertalk'] = {
            sendMessage: this.sendMessage,
            sendImgMessage: this.sendImgMessage,
            syncMessage: this.syncMessage,
            readMessage: this.readMessage,
            newMessage: this.newMessage,
            deleteMessage: this.deleteMessage,
            callbackDialog: this.callbackDialog
        };
    }
    TeachertalkComponent.prototype.scroll = function (e) {
        if ($(window).scrollTop() == 0) {
            if (this.paging.pageNo <= this.paging.endPageNo) {
                this.scrollPos = (this.data.length) - (this.paging.pageNo * this.paging.pageSize);
                this.paging.pageNo = this.paging.pageNo + 1;
            }
        }
        ;
    };
    TeachertalkComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeParams.params.subscribe(function (params) {
            _this.stuId = params['stuId'];
        });
        // 로컬에 메세지 정보가 없는 경우
        if (!this.data) {
            this.syncMessage();
        }
        else {
            this.data = JSON.parse(localStorage.getItem('teacherTalkMsg'));
            this.ref.detectChanges();
            this.paging.totalCnt = this.data.length;
            this.paging.endPageNo = Math.ceil(this.paging.totalCnt / this.paging.pageSize);
            this.scrollPos = this.data.length - 1;
        }
        this.webSocketInit();
    };
    TeachertalkComponent.prototype.ngAfterViewInit = function () {
        scrollTo(0, $(document).height());
        this.newMessage();
    };
    TeachertalkComponent.prototype.ngAfterViewChecked = function () {
        if ($(window).scrollTop() == 0) {
            if (this.paging.pageNo <= this.paging.endPageNo) {
                if ($(".sec[data-idx=" + this.scrollPos + "]").offset()) {
                    scrollTo(0, $(".sec[data-idx=" + this.scrollPos + "]").offset().top);
                }
            }
        }
        ;
    };
    TeachertalkComponent.prototype.convert12H = function (time) {
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
    /**
     * 웹소켓 준비
     */
    TeachertalkComponent.prototype.webSocketInit = function () {
        var _this = this;
        this.webSocket = new WebSocket(this.websocketUri + "/" + this.stuId);
        // 웹소켓 오픈
        this.webSocket.onopen = function (event) {
            console.log('onopen: ', event);
        };
        // 에러
        this.webSocket.onerror = function (event) {
            console.log('Web Socket Connect Error: ', event);
        };
        // 메세지 받기
        this.webSocket.onmessage = function (event) {
            console.log('onmessage: ', event);
            _this.newMessage();
        };
    };
    __decorate([
        core_1.ViewChild('ssamtalk'),
        __metadata("design:type", Object)
    ], TeachertalkComponent.prototype, "container", void 0);
    __decorate([
        core_1.HostListener('window:scroll', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TeachertalkComponent.prototype, "scroll", null);
    TeachertalkComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: "teachertalk.component.html",
            styleUrls: ["teachertalk.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            teachertalk_service_1.TeachertalkService,
            core_1.ChangeDetectorRef])
    ], TeachertalkComponent);
    return TeachertalkComponent;
}());
exports.TeachertalkComponent = TeachertalkComponent;
//# sourceMappingURL=teachertalk.component.js.map