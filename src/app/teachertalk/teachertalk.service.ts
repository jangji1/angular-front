import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { NetService } from '../services/net.service';

@Injectable()
export class TeachertalkService extends NetService {
  private jsonHeaders = new Headers({ 'Content-Type': 'application/json' });
  private formHeaders = new Headers({ 'Content-Type': 'x-www-form-urlencoded' });


  constructor(
    http: Http
  ) {
    super(http);

  }

  /**
   * 로컬에 메세지 정보가 없는 경우, 서버와 동기화할 최근 2개월 메세지 내역
   * @param param 
   */
  teacherTalkSyncMsg(param: any) {
    return super.reqGet(`/api/teacherTalk/teacherTalkSyncMsg.djson?stuId=${param.stuId}`);
  }

  /**
   * 새 메세지 작성시 등록 처리
   * @param param 
   */
  registTalkMsg(param: any) {
    return super.reqPost('/api/teacherTalk/registTalkMsg.djson', param, this.jsonHeaders);
  }

  completeMsgRead(param: any) {
    return super.reqGet(`/api/teacherTalk/completeMsgRead.djson?stuId=${param.stuId}`);
  }

  deleteTalkMsg(param: any) {
    return super.reqGet(`/api/teacherTalk/deleteTalkMsg.djson?stuId=${param.stuId}&talkNo=${param.talkNo}`);
  }

  teacherTalkNewMsg(param: any) {
    return super.reqGet(`/api/teacherTalk/teacherTalkNewMsg.djson?stuId=${param.stuId}`);
  }
}