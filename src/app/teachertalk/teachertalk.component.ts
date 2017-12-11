import { Component, OnInit, ViewChild, HostListener, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { TeachertalkService } from './teachertalk.service';
import { config } from '../config/config';

@Component({
  moduleId: module.id,
  templateUrl: `teachertalk.component.html`,
  styleUrls: [`teachertalk.component.css`]
})
export class TeachertalkComponent implements OnInit {
  websocketUri = `${config.ws}/nadmin/middle/teacherTalkSend`;
  webSocket: WebSocket = null;
  stuId: number;
  data: any[] = JSON.parse(localStorage.getItem('teacherTalkMsg'));
  paging = {
    totalCnt: 0,
    newCnt: 0,
    pageSize: 30,
    pageNo: 1,
    endPageNo: 1
  }
  scrollPos = 0;
  deleteMsg: any = {
    talkNo: null,
    idx: null
  }

  @ViewChild('ssamtalk') container: any;

  @HostListener('window:scroll', ['$event'])
  scroll(e: any) {
    if ($(window).scrollTop() == 0) {
      if (this.paging.pageNo <= this.paging.endPageNo) {
        this.scrollPos = (this.data.length) - (this.paging.pageNo * this.paging.pageSize);
        this.paging.pageNo = this.paging.pageNo + 1;
      }
    };
  }

  constructor(
    public routeParams: ActivatedRoute,
    public service: TeachertalkService,
    public ref: ChangeDetectorRef
  ) {
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

  ngOnInit() {
    this.routeParams.params.subscribe(params => {
      this.stuId = params['stuId'];
    });

    // 로컬에 메세지 정보가 없는 경우
    if (!this.data) {
      this.syncMessage();
    } else {
      this.data = JSON.parse(localStorage.getItem('teacherTalkMsg'));
      this.ref.detectChanges();
      this.paging.totalCnt = this.data.length;
      this.paging.endPageNo = Math.ceil(this.paging.totalCnt / this.paging.pageSize);
      this.scrollPos = this.data.length - 1;
    }

    this.webSocketInit();
  }

  ngAfterViewInit() {
    scrollTo(0, $(document).height());
    this.newMessage();
  }

  ngAfterViewChecked() {
    if ($(window).scrollTop() == 0) {
      if (this.paging.pageNo <= this.paging.endPageNo) {
        if ($(`.sec[data-idx=${this.scrollPos}]`).offset()) {
          scrollTo(0, $(`.sec[data-idx=${this.scrollPos}]`).offset().top);
        }
      }
    };
  }

  convert12H(time: string) {
    const ampmLabel = ['오전', '오후'];
    const timeRegExFormat = /^([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
    let timeToken = time.match(timeRegExFormat);

    let intHours = parseInt(timeToken[1]);
    let intMinutes = parseInt(timeToken[2]);
    let intSeconds = parseInt(timeToken[3]);
    let strHours12H = ('0' + (intHours == 12 ? 12 : intHours % 12)).slice(-2);
    let strMinutes = intMinutes < 10 ? '0' + intMinutes : intMinutes;
    let strSecondes = intSeconds < 10 ? '0' + intSeconds : intSeconds;

    return `${ampmLabel[parseInt(String(intHours / 12))]} ${strHours12H}:${strMinutes}`;
  }

  /**
   * 웹소켓 준비
   */
  webSocketInit() {
    this.webSocket = new WebSocket(`${this.websocketUri}/${this.stuId}`);
    // 웹소켓 오픈
    this.webSocket.onopen = (event) => {
      console.log('onopen: ', event);
    };
    // 에러
    this.webSocket.onerror = (event) => {
      console.log('Web Socket Connect Error: ', event);
    };
    // 메세지 받기
    this.webSocket.onmessage = (event) => {
      console.log('onmessage: ', event);
      this.newMessage();
    };
  }

  /**
   * 웹소켓 푸시
   */
  webSocketSend = (msg: string) => {
    var message = {
      msgContent: $.trim(msg),
      stuId: this.stuId,
    };
    this.webSocket.send(JSON.stringify(message));
  }

  sendMessage = (msg: string) => {
    let params = {
      talkType: 'S',
      msgType: 'T',
      msgContent: msg,
      stuId: this.stuId
    };

    this.service.registTalkMsg(params)
      .subscribe(
      res => {
        if (res.result) {
          this.webSocketSend(msg);
          this.data.push(res.result.newMsg);
          this.ref.detectChanges();
          this.scrollPos = this.data.length - 1;
          localStorage.setItem('teacherTalkMsg', JSON.stringify(this.data));

          scrollTo(0, $(document).height());
        }
      },
      err => {
        if (err) {
          alert('네트워크 오류');
        }
      }
      )
  }

  sendImgMessage = (res: any) => {
    let newMsg = JSON.parse(res);
    this.webSocketSend(newMsg.msgContent);
    this.data.push(newMsg);
    this.ref.detectChanges();
    this.scrollPos = this.data.length - 1;
    localStorage.setItem('teacherTalkMsg', JSON.stringify(this.data));

    scrollTo(0, $(document).height());
  }

  syncMessage = () => {
    this.service.teacherTalkSyncMsg({ stuId: this.stuId })
      .subscribe(
      res => {
        if (res.result) {
          this.data = res.result.syncMsgList.filter(function (item: any) {
            return item.senderDelYn == 'N'
          });
          this.ref.detectChanges();
          this.paging.totalCnt = this.data.length;
          this.paging.endPageNo = Math.ceil(this.paging.totalCnt / this.paging.pageSize);
          this.scrollPos = this.data.length - 1;

          localStorage.setItem('teacherTalkMsg', JSON.stringify(this.data));
          scrollTo(0, $(document).height());
        }
      },
      err => {
        if (err) {
          alert('네트워크 오류');
        }
      }
      )
  }

  readMessage = () => {
    this.service.completeMsgRead({ stuId: this.stuId })
      .subscribe(
      res => {
        if (res.result) {
          scrollTo(0, $(document).height());
        }
      },
      err => {
        if (err) {
          alert('네트워크 오류');
        }
      }
      )
  }

  newMessage = () => {
    this.service.teacherTalkNewMsg({ stuId: this.stuId })
      .subscribe(
      res => {
        if (res.result) {
          this.paging.newCnt = res.result.newMessageCount;
          this.paging.pageSize = this.paging.newCnt > 30 ? this.paging.newCnt : 30;
          let newMsgList = res.result.newMsgList.filter(function (item: any) {
            return item.senderDelYn == 'N'
          });
          this.data.push(...newMsgList);
          this.ref.detectChanges();
          this.scrollPos = this.data.length - 1;
          localStorage.setItem('teacherTalkMsg', JSON.stringify(this.data));

          if (this.paging.newCnt > 0) {
            this.readMessage();
          }
        }
      },
      err => {
        if (err) {
          alert('네트워크 오류');
        }
      }
      )
  }

  callbackDialog = (tag: number, state: boolean) => {
    switch (tag) {
      case 1:
        if (state) this.deleteMessage();
        return;
      case 2:
        return;
      default:
        return;
    }
  }

  deleteConfirm = (talkNo: number, idx: number) => {
    this.deleteMsg = {
      talkNo,
      idx
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
  }

  deleteMessage = () => {
    let params = {
      talkNo: this.deleteMsg.talkNo,
      stuId: this.stuId
    };

    this.service.deleteTalkMsg(params)
      .subscribe(
      res => {
        if (res.result) {
          this.data.splice(this.deleteMsg.idx, 1);
          this.ref.detectChanges();
          localStorage.setItem('teacherTalkMsg', JSON.stringify(this.data));

          window['dialogBridge'].showToast('삭제 되었습니다.');
        }
      },
      err => {
        if (err) {
          alert('네트워크 오류');
        }
      }
      )

  }

  openDoc = (link: string) => {
    alert(`TODO : ${link}`);
  }

  touchView = () => {
    window['dialogBridge'].onTouchWebView();
  }
}