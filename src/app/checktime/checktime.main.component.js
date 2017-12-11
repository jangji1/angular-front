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
var checktime_service_1 = require("./checktime.service");
var checktime_index_1 = require("./checktime.index");
var router_1 = require("@angular/router");
var ChecktimeMainComponent = /** @class */ (function () {
    function ChecktimeMainComponent(service, routeParams, ref) {
        var _this = this;
        this.service = service;
        this.routeParams = routeParams;
        this.ref = ref;
        this.period = 1000;
        this.talkViewList = [];
        this.inputType = '';
        this.inputText = '';
        this.selectCheck = [];
        this.currentInputIndex = 0;
        this.timeout = function () {
            var node = _this.talkManager.findNext();
            if (node != null) {
                _this.addTalk(node);
                if (node.type == 'T') {
                    _this.inputType = '';
                    setTimeout(_this.timeout, _this.period);
                }
                else {
                    _this.inputText = '';
                    _this.inputType = node.type;
                    if (_this.inputType == 'S' || _this.inputType == 'E' || _this.inputType == 'W') {
                        _this.currentInputIndex = 0;
                        _this.selectAnswers = [];
                        for (var i = 0; i < node.answer.length; i++) {
                            var alphabet = node.answer.substr(i, 1);
                            _this.selectAnswers.push(alphabet);
                        }
                        _this.selectExamples = node.examples;
                        if (_this.inputType == 'S') {
                            _this.selectCheck = [0, 0, 0, 0, 0];
                        }
                        else {
                            for (var i = 0; i < _this.selectAnswers.length; i++) {
                                _this.selectCheck.push(0);
                            }
                        }
                    }
                }
            }
            else {
                alert("유도학습 완료");
            }
        };
    }
    ChecktimeMainComponent.prototype.ngAfterViewChecked = function () {
        this.scrollToBottom();
    };
    ChecktimeMainComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeParams.params.subscribe(function (params) {
            _this.checktimeStudyId = params['checktimeStudyId'];
        });
        this.service.retrieveInduceTalkList({ induceStudyId: this.checktimeStudyId })
            .subscribe(function (res) {
            if (res.result) {
                _this.initInduceData(res.result.list);
                setTimeout(_this.timeout, _this.period);
            }
            else {
                alert("유도학습 데이터를 불러오지 못했습니다.");
            }
        }, function (err) {
            if (err) {
                alert("유도학습 데이터를 불러오지 못했습니다.");
            }
        });
    };
    ChecktimeMainComponent.prototype.initInduceData = function (listData) {
        var talkNode = new checktime_index_1.TalkNode();
        talkNode.idx = 0;
        talkNode.type = 'R'; //최상위    
        for (var _i = 0, listData_1 = listData; _i < listData_1.length; _i++) {
            var talk = listData_1[_i];
            if (talk.induceStudyTalkIdup < 0) {
                var child = new checktime_index_1.TalkNode();
                child.induceStudyTalkId = talk.induceStudyTalkId;
                child.induceStudyId = talk.induceStudyId;
                child.induceStudyTalkIdup = talk.induceStudyTalkIdup;
                child.idx = talk.idx;
                child.type = talk.type;
                child.text = talk.text;
                child.answer = talk.answer;
                this.putExamples(child, talk);
                child.owner = 0;
                child.parentNode = talkNode;
                talkNode.childList.push(child);
            }
        }
        for (var _a = 0, _b = talkNode.childList; _a < _b.length; _a++) {
            var node = _b[_a];
            this.findChild(listData, node);
        }
        this.talkManager = new checktime_index_1.TalkManager(talkNode);
    };
    ChecktimeMainComponent.prototype.findChild = function (listData, node) {
        var idx = 0;
        for (var _i = 0, listData_2 = listData; _i < listData_2.length; _i++) {
            var talk = listData_2[_i];
            if (talk.induceStudyTalkIdup == node.induceStudyTalkId && talk.idx == idx) {
                var child = new checktime_index_1.TalkNode();
                child.induceStudyTalkId = talk.induceStudyTalkId;
                child.induceStudyId = talk.induceStudyId;
                child.induceStudyTalkIdup = talk.induceStudyTalkIdup;
                child.idx = talk.idx;
                child.type = talk.type;
                child.text = talk.text;
                child.answer = talk.answer;
                this.putExamples(child, talk);
                child.owner = 0;
                child.parentNode = node;
                node.childList.push(child);
                this.findChild(listData, child);
                idx++;
            }
        }
    };
    ChecktimeMainComponent.prototype.putExamples = function (childNode, rawTalk) {
        if (rawTalk.type == 'Q' || rawTalk.type == 'S') {
            childNode.examples.push(rawTalk.example1);
            childNode.examples.push(rawTalk.example2);
            childNode.examples.push(rawTalk.example3);
            childNode.examples.push(rawTalk.example4);
            childNode.examples.push(rawTalk.example5);
        }
        else if (rawTalk.type == 'E') {
            var examStr = rawTalk.example1;
            for (var i = 0; i < examStr.length; i++) {
                var alphabet = examStr.substr(i, 1);
                childNode.examples.push(alphabet);
            }
        }
        else if (rawTalk.type == 'W') {
            childNode.examples = rawTalk.example1.split('@');
        }
    };
    ChecktimeMainComponent.prototype.checkAnswer = function () {
        var mine = new checktime_index_1.TalkNode();
        mine.text = this.inputText;
        mine.owner = 1;
        mine.type = 'T';
        this.addTalk(mine);
        var node = this.talkManager.answerProcess(this.inputText);
        this.addTalk(node);
        if (node.type == 'T') {
            setTimeout(this.timeout, this.period);
        }
        else {
            this.inputType = node.type;
        }
    };
    ChecktimeMainComponent.prototype.checkSelect = function () {
        var mine = new checktime_index_1.TalkNode();
        mine.owner = 1;
        mine.type = 'T';
        mine.text = '';
        var index = 1;
        var answerText = '';
        if (this.inputType == 'S') {
            for (var _i = 0, _a = this.selectCheck; _i < _a.length; _i++) {
                var num = _a[_i];
                if (num == 1) {
                    mine.text += this.selectExamples[index] + ',';
                    answerText += index;
                }
                index++;
            }
        }
        else if (this.inputType == 'E') {
            mine.text = this.inputText;
            answerText = this.inputText;
        }
        else if (this.inputType == 'W') {
            mine.text = this.inputText;
            answerText = this.inputText;
        }
        this.addTalk(mine);
        var node = this.talkManager.answerProcess(answerText);
        this.addTalk(node);
        if (node.type == 'T') {
            setTimeout(this.timeout, this.period);
        }
        else {
            this.inputType = node.type;
        }
    };
    ChecktimeMainComponent.prototype.setSelect = function (index) {
        this.selectCheck[index] = 1 - this.selectCheck[index];
    };
    ChecktimeMainComponent.prototype.addTalk = function (talk) {
        this.talkViewList.push(talk);
        this.ref.detectChanges();
        this.scrollToBottom();
    };
    ChecktimeMainComponent.prototype.scrollToBottom = function () {
        try {
            if (this.scrollContainer != null) {
                this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
            }
        }
        catch (err) {
            console.log(err);
        }
    };
    ChecktimeMainComponent.prototype.inputTypeE = function (select, idx) {
        if (this.selectAnswers[this.currentInputIndex] == select) {
            this.inputText += select;
            this.currentInputIndex++;
            this.selectCheck[idx] = 1;
        }
    };
    ChecktimeMainComponent.prototype.inputTypeW = function (idx) {
        if (this.selectAnswers[this.currentInputIndex] == '' + (idx + 1)) {
            this.inputText += this.selectExamples[idx] + ' ';
            this.currentInputIndex++;
            this.selectCheck[idx] = 1;
        }
    };
    __decorate([
        core_1.ViewChild('checktime'),
        __metadata("design:type", core_1.ElementRef)
    ], ChecktimeMainComponent.prototype, "scrollContainer", void 0);
    ChecktimeMainComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './checktime.main.component.html',
            styleUrls: ['checktime.main.component.css']
        }),
        __metadata("design:paramtypes", [checktime_service_1.ChecktimeService,
            router_1.ActivatedRoute,
            core_1.ChangeDetectorRef])
    ], ChecktimeMainComponent);
    return ChecktimeMainComponent;
}());
exports.ChecktimeMainComponent = ChecktimeMainComponent;
//# sourceMappingURL=checktime.main.component.js.map