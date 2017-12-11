import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ChecktimeService } from './checktime.service';
import { TalkNode, TalkManager } from './checktime.index';
import { ActivatedRoute } from "@angular/router";

@Component({
  moduleId: module.id,
  templateUrl: './checktime.main.component.html',
  styleUrls: ['checktime.main.component.css']
})

export class ChecktimeMainComponent implements OnInit, AfterViewChecked {

  private period: number = 1000;
  private talkManager: TalkManager;
  public talkViewList: TalkNode[] = [];
  public inputType: string = '';
  private inputText: string = '';
  private selectAnswers: string[];
  private selectExamples: string[];
  private selectCheck: number[] = [];
  private currentInputIndex = 0;
  checktimeStudyId: number; 

  @ViewChild('checktime') private scrollContainer: ElementRef;

  constructor(
    private service: ChecktimeService,
    public routeParams: ActivatedRoute,
    public ref: ChangeDetectorRef
  ) {

  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnInit() {
    this.routeParams.params.subscribe(params => {
      this.checktimeStudyId = params['checktimeStudyId'];
    });
    this.service.retrieveInduceTalkList({ induceStudyId : this.checktimeStudyId })
      .subscribe(
      res => {
        if (res.result) {
          this.initInduceData(res.result.list);
          setTimeout(this.timeout, this.period);
        }
        else {
          alert("유도학습 데이터를 불러오지 못했습니다.");
        }
      },
      err => {
        if (err) {
          alert("유도학습 데이터를 불러오지 못했습니다.");
        }
      }
      );
  }


  private initInduceData(listData: any) {
    let talkNode = new TalkNode();
    talkNode.idx = 0;
    talkNode.type = 'R';   //최상위    

    for (let talk of listData) {
      if (talk.induceStudyTalkIdup < 0) {
        let child = new TalkNode();
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

    for (let node of talkNode.childList) {
      this.findChild(listData, node);
    }

    this.talkManager = new TalkManager(talkNode);
  }

  private findChild(listData: any, node: TalkNode) {
    let idx = 0;
    for (let talk of listData) {
      if (talk.induceStudyTalkIdup == node.induceStudyTalkId && talk.idx == idx) {
        let child = new TalkNode();
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
  }

  private putExamples(childNode: TalkNode, rawTalk: any) {
    if (rawTalk.type == 'Q' || rawTalk.type == 'S') {
      childNode.examples.push(rawTalk.example1);
      childNode.examples.push(rawTalk.example2);
      childNode.examples.push(rawTalk.example3);
      childNode.examples.push(rawTalk.example4);
      childNode.examples.push(rawTalk.example5);
    }
    else if (rawTalk.type == 'E') {
      let examStr = rawTalk.example1;
      for (let i = 0; i < examStr.length; i++) {
        let alphabet = examStr.substr(i, 1);
        childNode.examples.push(alphabet);
      }
    }
    else if (rawTalk.type == 'W') {
      childNode.examples = rawTalk.example1.split('@');
    }
  }


  timeout = () => {
    let node: TalkNode = this.talkManager.findNext();
    if (node != null) {
      this.addTalk(node);
      if (node.type == 'T') {
        this.inputType = '';
        setTimeout(this.timeout, this.period);
      }
      else {
        this.inputText = '';
        this.inputType = node.type;
        if (this.inputType == 'S' || this.inputType == 'E' || this.inputType == 'W') {
          this.currentInputIndex = 0;
          this.selectAnswers = [];
          for (let i = 0; i < node.answer.length; i++) {
            let alphabet = node.answer.substr(i, 1);
            this.selectAnswers.push(alphabet);
          }
          this.selectExamples = node.examples;
          if (this.inputType == 'S') {
            this.selectCheck = [0, 0, 0, 0, 0];
          }
          else {
            for (let i = 0; i < this.selectAnswers.length; i++) {
              this.selectCheck.push(0);
            }
          }
        }
      }
    }
    else {
      alert("유도학습 완료");
    }
  }

  private checkAnswer() {
    let mine: TalkNode = new TalkNode();
    mine.text = this.inputText;
    mine.owner = 1;
    mine.type = 'T';
    this.addTalk(mine);

    let node: TalkNode = this.talkManager.answerProcess(this.inputText);
    this.addTalk(node);
    if (node.type == 'T') {
      setTimeout(this.timeout, this.period);
    }
    else {
      this.inputType = node.type;
    }
  }

  private checkSelect() {
    let mine: TalkNode = new TalkNode();
    mine.owner = 1;
    mine.type = 'T';
    mine.text = '';


    let index = 1;
    let answerText = '';
    if (this.inputType == 'S') {
      for (let num of this.selectCheck) {
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

    let node: TalkNode = this.talkManager.answerProcess(answerText);
    this.addTalk(node);
    if (node.type == 'T') {
      setTimeout(this.timeout, this.period);
    }
    else {
      this.inputType = node.type;
    }
  }

  private setSelect(index: number) {
    this.selectCheck[index] = 1 - this.selectCheck[index];
  }

  private addTalk(talk: TalkNode) {
    this.talkViewList.push(talk);
    this.ref.detectChanges();
    this.scrollToBottom();
  }

  private scrollToBottom() {
    try {
      if (this.scrollContainer != null) {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.log(err);
    }
  }

  private inputTypeE(select: string, idx: number) {
    if (this.selectAnswers[this.currentInputIndex] == select) {
      this.inputText += select;
      this.currentInputIndex++;
      this.selectCheck[idx] = 1;
    }
  }

  private inputTypeW(idx: number) {
    if (this.selectAnswers[this.currentInputIndex] == '' + (idx + 1)) {
      this.inputText += this.selectExamples[idx] + ' ';
      this.currentInputIndex++;
      this.selectCheck[idx] = 1;
    }
  }
}