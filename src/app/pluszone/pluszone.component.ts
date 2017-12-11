import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PluszoneService } from './pluszone.service';

@Component({
    moduleId: module.id,
    templateUrl: 'pluszone.component.html',
    styleUrls: ['pluszone.component.css']
})
export class PluszoneComponent implements OnInit{

    // selector
    @ViewChild('player') player: any;

    public elearnCourseId: number;
    public data: any = {};
    public page: number = 0;
    public isMovie: boolean = false;
    public settings: any = {
        //miniview: true,
        //width: 300,
        //height: 150,
        //top: Number(this.offsetTop) + 0,
        //left: Number(this.offsetLeft) + 0,
        //startTime: 30,
        //endTime: 45,
        //currentTime: 5,
    }

    constructor(
        public routeParams: ActivatedRoute,
        public pluszoneService : PluszoneService
    ){
        this.routeParams.params.subscribe(params => {
            this.elearnCourseId = params['elearnCourseId'];
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

    ngOnInit(): void {
        
    }

    retrieveCourse = (elearnCourseId: number) => {
        let params = {elearnCourseId};

        this.pluszoneService.retrieveCourse(params)
        .subscribe(
            res => {
                if(res.result){
                    this.data = res.result.data;
                }
            },
            err =>{
                if(err){
                    alert('네트워크 오류');
                }
            }
        )
    }

    movePage = (dir: string) => {
        if(dir === 'prev') {
            this.page = this.page - 1;
            this.isMovie = false;
        } else if(dir === 'next') {
            if(this.page !== 0 && this.data.courseContentsList) {
                if(this.data.courseContentsList[this.page].type === 'movie') {
                    this.page = this.page + 1;
                    this.isMovie = true;
                } else {
                    this.page = this.page + 1;
                }
            } else {
                this.page = this.page + 1;
            }
        }
    }

    // 앱 컨트롤 영역
    /**
     * 학습하기 종료
     * @desc Native의 onClickClose(boolean isComplete) 를 호출합니다. true : 학습완료 O , false: 학습완료 X
     */
    public onClickClose = () => {
        console.log('onClickClose() 호출');

        let duration = 0;
        let progress = 0;;
        if(this.player) {
            this.player.video.nativeElement.pause();
            duration = this.player.video.nativeElement.duration;
            progress = Number(((this.player.playTime / duration) * 100).toFixed(1));
            if(progress >= 66.6) {
                window['pluszone'].isComplete = true;
            }
        }

        // 네이티브 함수 호출
        window['android'].onClickClose(window['pluszone'].isComplete);
    }
    /**
     * 동영상 종료 취소하기
     * @desc 영상을 이어서 계속 재생합니다.
     */
    public resume = () => {
        console.log('resume() 호출');

        if(this.player) {
            this.player.video.nativeElement.play();
        }
    }
    /**
     * 별점 팝업
     * @desc 별점 팝업을 호출합니다.
     */
    public onComplete = () => {
        console.log('onComplete() 호출');

        this.player.video.nativeElement.pause();
        // 네이티브 함수 호출
        window['android'].onComplete();
    }
    /**
     * 별점 팝업 - 다시보기
     * @desc 영상을 처음부터 다시 재생합니다.
     */
    public replay = () => {
        console.log('replay() 호출');

        if(this.player) {
            if(this.player.settings.startTime !== undefined){
                this.player.video.nativeElement.currentTime = this.player.settings.startTime;
            } else {
                this.player.video.nativeElement.currentTime = 0;
            }
            this.player.video.nativeElement.play();
        }
    }
    
    /**
     * 별점 팝업 - 학습종료
     * @desc 별점 처리 후 Native의 onClose() 를 호출합니다. 숫자형의 score(별점)를 받습니다.
     * @param score
     */
    public complete = (score: Number) => {
        console.log('replay() 호출');
        console.log('score : ', score);
        // 네이티브 함수 호출
        window['android'].onClose();
    }
}