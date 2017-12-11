import { Injectable } from '@angular/core';
import { NetService } from './net.service';
import { AuthService } from './auth.service';

import {CommonCodeItem} from './common-code.item';
import { ActivatedRoute } from '@angular/router';

import { config } from '../config/config';
/**
 * 전역에서 공통으로 사용할 싱글톤 서비스
 */
@Injectable()
export class CommonService{

    public formData: any;       //리스트 폼 데이터(FormGroup)을 저장하기 위한 변수
    public selectListItem: any; //상세페이지로 넘기기 위한 아이템 정보

    private commonCode = new CommonCodeItem();

    constructor(
        private netService: NetService,
        private authService: AuthService,
        private route: ActivatedRoute,
    ){
        if(authService.isLogin()){
            // this.refreshCodeData();
        }
    }

    public refreshCodeData(){
        this.netService.reqGet('/code/allCodeList.ajax')
        .subscribe(
            res => {
                //아래 공통 코드 추가/삭제/수정시 common-resolver.service.ts에도 같이 수정해야 합니다.
                for (let base of res.result){
                    switch(base.code_base_id){
                        case 10001: //학년
                            this.commonCode.setGradeCodeList(base.detailList);
                        break;
                        case 10002: //과목
                            this.commonCode.setSubjectCodeList(base.detailList);
                        break;
                        case 10003: //단계
                            this.commonCode.setTermCodeList(base.detailList);
                        break;
                        case 10004: //제공업체
                            this.commonCode.setCompanyCodeList(base.detailList);
                        break;
                        case 10005: //비교과유형
                            this.commonCode.setLevelCodeList(base.detailList);
                        break;
                        case 10007: //컴포넌트
                            this.commonCode.setComponentCodeList(base.detailList);
                        break;
                        case 10008: //제공서비스
                            this.commonCode.setServiceCodeList(base.detailList);
                        break;
                        case 10012: //교육자료배포
                            this.commonCode.setEduDataCodeList(base.detailList);
                        break;
                        case 10013: //기출예상문제회차
                            this.commonCode.setExistExpectCodeList(base.detailList);
                        break;
                    }
                }
                
                localStorage.setItem(config.localStorageCommonCodeKey,JSON.stringify(this.commonCode));
            },
            err => {
                if (err){
                    alert("코드 가져오기를 실패 하였습니다.");
                }
            }
        )
    }
}