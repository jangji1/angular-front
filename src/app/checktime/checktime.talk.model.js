"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*******************************************************************
 * 유도학습 데이터 모델
 ******************************************************************/
var TalkNode = /** @class */ (function () {
    function TalkNode() {
        this.examples = [];
        this.childList = [];
    }
    return TalkNode;
}());
exports.TalkNode = TalkNode;
/**
 * 유도학습 매니저
 */
var TalkManager = /** @class */ (function () {
    function TalkManager(talkList) {
        this.talkList = talkList;
        this.currentList = talkList;
    }
    TalkManager.prototype.getCurrentTalk = function () {
        return this.currentList;
    };
    TalkManager.prototype.findNext = function () {
        //Find Child
        if (this.currentList.childList != null && this.currentList.childList.length > 0) {
            this.currentList = this.currentList.childList[0];
            return this.currentList;
        }
        else {
            if (this.currentList.parentNode != null && (this.currentList.parentNode.type == 'T' || this.currentList.parentNode.type == 'R')) {
                var bros = this.findBros();
                if (bros != null) {
                    this.currentList = bros;
                    return this.currentList;
                }
                else {
                    if (this.currentList.parentNode.type == 'R') {
                        return null;
                    }
                }
            }
            var next = this.findAncestor();
            this.currentList = next;
            return this.currentList;
        }
    };
    TalkManager.prototype.findBros = function () {
        var parent = this.currentList.parentNode;
        if (this.currentList.idx < parent.childList.length - 1) {
            return parent.childList[this.currentList.idx + 1];
        }
        return null;
    };
    TalkManager.prototype.findAncestor = function () {
        var parent = this.currentList.parentNode;
        var grandParent = parent.parentNode;
        //조부모가 질문일 경우 부모는 답변중 하나이므로 부모의 형제를 찾으면 안된다. 조부모의 형제를 찾는다.
        if (grandParent.type == 'Q' || grandParent.type == 'S') {
            this.currentList = grandParent;
            return this.findBros();
        }
        else {
            this.currentList = parent;
            return this.findBros();
        }
    };
    //대답에 따른 처리
    TalkManager.prototype.answerProcess = function (answer) {
        var idx = 1;
        if (this.currentList.type == 'Q') {
            var ansArray = this.currentList.answer.split(';');
            for (var _i = 0, ansArray_1 = ansArray; _i < ansArray_1.length; _i++) {
                var ansStr = ansArray_1[_i];
                if (ansStr == answer) {
                    idx = 0;
                    break;
                }
            }
        }
        else if (this.currentList.type == 'S') {
            if (answer == this.currentList.answer) {
                idx = 0;
            }
        }
        else if (this.currentList.type == 'E' || this.currentList.type == 'W') {
            idx = 0;
        }
        this.currentList = this.currentList.childList[idx];
        return this.currentList;
    };
    return TalkManager;
}());
exports.TalkManager = TalkManager;
//# sourceMappingURL=checktime.talk.model.js.map