import { Component, Input, ViewChild, ElementRef, Output, HostListener } from '@angular/core';

interface Options {
    miniview?: boolean,
    repeat?: boolean,
    width?: number,
    height?: number,
    top?: number,
    left?: number,
    startTime?: number,
    endTime?: number,
    currentTime?: number
}

declare var jQuery: any;

@Component({
    moduleId: module.id,
    selector: 'player',
    templateUrl: 'player.component.html',
    styleUrls: ['player.component.css']
})

export class PlayerComponent {
    @Input() source: string;    // 영상 소스
    @Input() subtitles: string; // 자막
    @Input() settings: any;     // 옵션
    /*
    settings = {
        miniview: true,
        width: 300,
        height: 150,
        top: 0,
        left: 0,
        startTime: 30,
        endTime: 45,
        currentTime: 5,
    }
    */
    @Input() movePage: any;  // 페이지 이동
    @Input() movieInfo: any; // 강의데이타

    // selector
    @ViewChild('customVideo') container: any;
    @ViewChild('myVideo') video: any;
    @ViewChild('btnRepeat') repeatbutton: any;
    @ViewChild('btnPlaypause') playbutton: any;
    @ViewChild('btnFullscreen') fullscreenbutton: any;
    @ViewChild('btnRewind') rewindbutton: any;
    @ViewChild('btnForward') forwardbutton: any;
    @ViewChild('btnSlower') slowerbutton: any;
    @ViewChild('btnFaster') fasterbutton: any;
    @ViewChild('btnMini') minibutton: any;
    @ViewChild('btnCapture') capturebutton: any;
    @ViewChild('btnLock') lockbutton: any;
    @ViewChild('seekbar') seek: any;
    @ViewChild('seekLabel') seeklabel: any;
    @ViewChild('seekRepeatA') seekrepeata: any;
    @ViewChild('seekRepeatB') seekrepeatb: any;
    @ViewChild('currentTime') currenttime: any;
    @ViewChild('totalTime') totaltime: any;
    @ViewChild('canvas') canvas: any;
    @ViewChild('canvasImage') downloadcapture: any;
    @ViewChild('txtSpeed') textspeed: any;
    @ViewChild('volumeCtrl') volumecontrol: any;
    @ViewChild('txtVolume') textvolume: any;
    @ViewChild('rangeVolume') rangevolume: any;

    // 플레이어 상태
    public isFullscreen: boolean = false;
    public isMiniview: boolean = false;
    public isLock: boolean = false;
    public isRepeat: boolean = false;
    public isNav: boolean = false;
    public isVolume: boolean = false;
    public repeata: any = null;
    public repeatb: any = null;
    public selectMovieIdx: number;

    // 플레이어 미동작 시간 측정
    public usePlayerTimer: any;

    // 재생시간 측정
    public playTimer: any;
    public playTime: number = 0;

    // 볼륨
    public startVolume: number;
    public startPageY: number;
    public volumeDrag: boolean = false;

    // Seekbar
    public seekValue: number = 0;
    public labelTimer: any;
    public isShowLabel: boolean = false;
    public seekPageX: number;
    public seekDrag: boolean = false;

    constructor() {}

    /**
     * 메타데이타 로드
     */
    public loadmetadata = () => {
        this.init();
        this.setOptions(this.settings);
        this.playerOut();
    }

    /**
     * 초기화
     */
    public init = () => {
        this.dragResize(); // 미니뷰 사이즈 조절/이동(jQuery-ui)
    }

    /**
     * 사용자 설정 변경
     */
    public setOptions = (options: Options) => {
        // reset status
        this.seekValue = 0;
        this.playTime = 0;
        
        // 사용자 설정 값 세팅
        this.settings = options;

        // 시작, 종료시간이 지정되었을 때
        if(this.settings.startTime !== undefined && this.settings.endTime !== undefined) {
            this.video.nativeElement.pause();
            this.video.nativeElement.currentTime = this.settings.startTime;
            this.setStartEnd();
        } else {
            this.video.nativeElement.pause();
            if(this.movieInfo.courseMovieChapterList) {
                this.settings.startTime = this.HmsToSeconds(this.movieInfo.courseMovieChapterList[0].startTime);
                this.settings.endTime = this.HmsToSeconds(this.movieInfo.courseMovieChapterList[0].endTime);
                this.selectMovie(0);
            } else {
                this.video.nativeElement.currentTime = 0;
            }
            this.setStartEnd();
        }

        // 미니뷰로 지정했을 때
        if(this.settings.miniview) {
            this.isMiniview = false;
            this.miniview();
        }

        // 현 재생시간을 지정했을 때
        if(this.settings.currentTime != undefined) {
            // 시작, 종료시간이 지정되었을 때
            if(this.settings.startTime !== undefined && this.settings.endTime !== undefined) {
                this.video.nativeElement.currentTime = this.settings.startTime + this.settings.currentTime;
            } else {
                this.video.nativeElement.currentTime = this.settings.currentTime;
            }
        }
        
        // 배속을 지정했을 때
        if(this.settings.speed != undefined) {
            if(this.settings.speed < 1.4 && this.settings.speed > 0.8) {
                this.video.nativeElement.playbackRate = this.settings.speed;
            }
        } else {
            this.textspeed.nativeElement.innerHTML = this.video.nativeElement.playbackRate.toFixed(1);
        }

        // 볼륨을 지정했을 때
        if(this.settings.volume != undefined) {
            //this.rangevolume.nativeElement.value = this.settings.volume;
            this.textvolume.nativeElement.innerHTML = (this.video.settings.volume * 100) + '%';
        } else {
            //this.rangevolume.nativeElement.value = this.video.nativeElement.volume;
            this.textvolume.nativeElement.innerHTML = (this.video.nativeElement.volume * 100) + '%';
        }

        // 자동 재생
        if(this.video.nativeElement.autoplay){
            this.video.nativeElement.play();
        }
    }
    
    /**
     * 시작/종료 시간 설정
     */
    public setStartEnd = () => {
        // 시작시간이 지정되었을 때
        if(this.settings.startTime !== undefined){
            let currentTime = this.video.nativeElement.currentTime - this.settings.startTime;
            this.currenttime.nativeElement.innerHTML = this.secondsToHms( Math.floor(currentTime) ); // 현 재생시간
        } else {
            this.currenttime.nativeElement.innerHTML = this.secondsToHms( Math.floor(this.video.nativeElement.currentTime) );
        }
        
        // 종료시간이 지정되었을 때
        if(this.settings.endTime !== undefined) {
            let endTime = this.settings.endTime - this.settings.startTime;
            this.totaltime.nativeElement.innerHTML = this.secondsToHms( Math.floor(endTime) ); // 총 재생시간
        } else {
            this.totaltime.nativeElement.innerHTML = this.secondsToHms( Math.floor(this.video.nativeElement.duration) );
        }
    }
    
    /**
     * 시분초 변환
     */
    public secondsToHms(s: number) {
        let hours: any   = Math.floor(s / 3600);
        let minutes: any = Math.floor((s - (hours * 3600)) / 60);
        let seconds: any = s - (hours * 3600) - (minutes * 60);
        let hms: string;

        if(hours   < 10) { hours   = "0" + hours; }
        if(minutes < 10) { minutes = "0" + minutes; }
        if(seconds < 10) { seconds = "0" + seconds; }

        if(hours === '00') hms = minutes + ':' + seconds;
        else hms = hours + ':' + minutes + ':' + seconds;
        
        return hms;
    }
    public HmsToSeconds(hms: string) {
        var a = hms.split(':');
        var s = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 

        return s;
    }

    /**
     * 볼륨 조정
     */
    public volume = () => {
        this.isVolume = !this.isVolume;
    }
    public changeVolume = () => {
        this.textvolume.nativeElement.innerHTML = (this.video.nativeElement.volume * 100) + '%';
    }
    public touchStartVolume = (e: any) => {
        let pageY = e.type === 'touchstart' ? e.touches[0].pageY : e.pageY;

        this.startPageY = pageY;
        this.startVolume = this.video.nativeElement.volume;
        this.volumeDrag = true;
    }
    public touchEndVolume = (e: any) => {
        if(this.volumeDrag) {
            this.volumeDrag = false;
        }
    }
    public progressVolume = (e: any) => {
        if(this.volumeDrag) {
            let pageY = e.type === 'touchmove' ? e.touches[0].pageY : e.pageY;

            var moveRange: number = Math.floor((pageY - this.startPageY) / 17) / 10;
            var changeVolume: number = Number((this.startVolume - moveRange).toFixed(1));
            
            if(changeVolume >= 0 && changeVolume <= 1) {
                this.video.nativeElement.volume = changeVolume;
            }
        }
    }

    /**
     * 재생 일시정지
     */
    public playpause = () => {
        if(this.video.nativeElement.paused){
            if( Math.floor(this.settings.endTime) !== Math.floor(this.video.nativeElement.currentTime) ) {
                this.video.nativeElement.play();
            }
        }
        else{
            this.video.nativeElement.pause();
        }
    }

    /**
     * 풀스크린
     */
    public fullscreen = () => {
        this.isFullscreen = !this.isFullscreen;
    }

    /**
     * Seekbar
     */
    public timeUpdate = () => {
        let seekValue: number;
        if(!this.video.nativeElement.paused) {
            // 시작시간, 종료시간이 지정되었을 때
            this.changeSeekValue();
            // 시작시간이 지정되었을 때
            this.changeSeekTime();
            // 라벨
            if(this.seekValue < 5) {
                this.seeklabel.nativeElement.style.left = '5%';
            } else if(this.seekValue > 95) {
                this.seeklabel.nativeElement.style.left = '95%';
            } else {
                this.seeklabel.nativeElement.style.left = this.seekValue + '%';
            }

            // 반복구간이 설정되었을 때
            if(this.repeata && this.repeatb) {
                if( Math.floor(this.video.nativeElement.currentTime) == Math.floor(this.repeatb) ) {
                    this.video.nativeElement.pause();
                    this.video.nativeElement.currentTime = this.repeata;
                    this.video.nativeElement.play();
                }
            }
        }
    }
    /**
     * 프로그레스바 업데이트
     */
    public changeSeekValue = () => {
        let seekValue: number;
        if(this.settings.startTime !== undefined && this.settings.endTime !== undefined) {
            seekValue = 100 - (this.settings.endTime - this.video.nativeElement.currentTime ) * (100 / (this.settings.endTime - this.settings.startTime ));
            this.seekValue = seekValue;
            // 지정된 종료시간에 도달하면 
            if( Math.floor(this.settings.endTime) < Math.floor(this.video.nativeElement.currentTime) ) {
                this.ended();
            }
        }else{
            seekValue = ( 100 / (this.video.nativeElement.duration) ) * this.video.nativeElement.currentTime;
            this.seekValue = seekValue;
        }
    }
    /**
     * 현재시간 업데이트
     */
    public changeSeekTime = () => {
        if(this.settings.startTime !== undefined){
            let currentTime = this.video.nativeElement.currentTime - this.settings.startTime;
            this.currenttime.nativeElement.innerHTML = this.secondsToHms( Math.floor(currentTime) ); // 현 재생시간
            this.seeklabel.nativeElement.innerHTML = this.secondsToHms( Math.floor(currentTime) );
        } else {
            this.currenttime.nativeElement.innerHTML = this.secondsToHms( Math.floor(this.video.nativeElement.currentTime) );
            this.seeklabel.nativeElement.innerHTML = this.secondsToHms( Math.floor(this.video.nativeElement.currentTime) );
        }
    }

    public touchStartSeek = (e: any) => {
        this.video.nativeElement.pause();

        this.isShowLabel = true;
        clearTimeout(this.labelTimer);

        let pageX = e.type === 'touchstart' ? e.touches[0].pageX : e.pageX;
        this.seekPageX = pageX;
        this.seekDrag = true;

        this.progressSeek(this.seekPageX);
    }
    public touchEndSeek = (e: any) => {
        this.video.nativeElement.play();

        this.labelTimer = setTimeout(() => {
            this.isShowLabel = false;
        }, 1000);

        this.updateSeek();

        if(this.seekDrag) {
            this.seekDrag = false;
        }
    }
    public moveSeek = (e: any) => {
        if(this.seekDrag) {
            let pageX = e.type === 'touchmove' ? e.touches[0].pageX : e.pageX;
            this.seekPageX = pageX;

            this.progressSeek(this.seekPageX);
        }
    }
    public progressSeek = (x: number) => {
        var position = x;
        var percentage = 100 * position / this.seek.nativeElement.clientWidth;
        if (percentage > 100) { percentage = 100 }
        if (percentage < 0) { percentage = 0 }
        this.seekValue = percentage;

        let time: number;
        //시작시간, 종료시간이 지정되었을 때
        if(this.settings.startTime !== undefined && this.settings.endTime !== undefined) {
            time = this.settings.startTime + (this.settings.endTime - this.settings.startTime) * (Number(this.seekValue) / 100);
        }else{
            time = this.video.nativeElement.duration * (Number(this.seekValue) / 100);
        }

        // 라벨
        if(this.settings.startTime !== undefined && this.settings.endTime !== undefined) {
            let currentTime = time - this.settings.startTime;
            this.currenttime.nativeElement.innerHTML = this.secondsToHms( Math.floor(currentTime) ); // 현 재생시간
            this.seeklabel.nativeElement.innerHTML = this.secondsToHms(Math.floor(currentTime));
        } else {
            this.currenttime.nativeElement.innerHTML = this.secondsToHms( Math.floor(time) ); // 현 재생시간
            this.seeklabel.nativeElement.innerHTML = this.secondsToHms(Math.floor(time));
        }
        if(this.seekValue < 5) {
            this.seeklabel.nativeElement.style.left = '5%';
        } else if(this.seekValue > 95) {
            this.seeklabel.nativeElement.style.left = '95%';
        } else {
            this.seeklabel.nativeElement.style.left = this.seekValue + '%';
        }
    }
    public updateSeek = () => {
        let time: number;
        //시작시간, 종료시간이 지정되었을 때
        if(this.settings.startTime !== undefined && this.settings.endTime !== undefined) {
            time = this.settings.startTime + (this.settings.endTime - this.settings.startTime) * (Number(this.seekValue) / 100);
        }else{
            time = this.video.nativeElement.duration * (Number(this.seekValue) / 100);
        }

        // 구간반복 상태일때
        if(this.isRepeat) {
            if(!this.repeata) {
                this.repeata = time;
                this.seekrepeata.nativeElement.style.left = this.seekValue + '%';
            }else if(!this.repeatb) {
                if(this.repeata < time) {
                    this.repeatb = time;
                    this.seekrepeatb.nativeElement.style.left = this.seekValue + '%';
                }
            }
            this.isRepeat = false;
        }

        this.video.nativeElement.currentTime = time;
    }

    /**
     * 구간 반복
     */
    public repeat = () => {
        if(this.repeata && this.repeatb) {
            this.repeata = null, this.repeatb = null;
            this.isRepeat = false;
            return false;
        }

        if(!this.isRepeat) {
            if(this.repeata && this.repeatb) {
                this.video.nativeElement.currentTime = this.repeata;
            }
            this.isRepeat = true;
        }
    }

    /**
     * 영상 종료
     */
    public ended = () => {
        window['pluszone'].onComplete();
    }

    /**
     * 되감기/빨리감기
     */
    public rewindForward = (dir: string) =>  {
        if(dir && !this.isMiniview) {
            let seekValue: number;
            if(dir === '+') {
                // 종료시간이 지정되었을 때
                if(this.settings.endTime !== undefined) {
                    if(this.video.nativeElement.currentTime > this.settings.endTime - 2) {
                        this.video.nativeElement.currentTime = this.settings.endTime;
                    }else{
                        this.video.nativeElement.currentTime += 2;
                    }
                }else{
                    this.video.nativeElement.currentTime += 2;
                }
            }else if(dir === '-') {
                // 시작시간이 지정되었을 때
                if(this.settings.startTime !== undefined) {
                    if(this.video.nativeElement.currentTime < this.settings.startTime + 2) {
                        this.video.nativeElement.currentTime = this.settings.startTime;
                    }else{
                        this.video.nativeElement.currentTime -= 2;
                    }
                }else{
                    this.video.nativeElement.currentTime -= 2;
                }
            }
            this.changeSeekValue();
            this.changeSeekTime();
        }
    }

    /**
     * 미니뷰 사이즈 조절/이동(jQuery-ui)
     */
    public dragResize = () => {
        jQuery(this.container.nativeElement).draggable({
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
    }

    /**
     * 미니뷰
     */
    public miniview = () => {
        // 잠금상태일때 동작 불가
        if(this.isLock) return false;
        if(!this.isMiniview){
            jQuery(this.container.nativeElement).draggable("enable"); // 사이즈 조절/이동 가능(jQuery-ui)
            jQuery(this.container.nativeElement).resizable("enable");
            this.isMiniview = true;
        }else{
            jQuery(this.container.nativeElement).draggable("disable"); // 사이즈 조절/이동 불가(jQuery-ui)
            jQuery(this.container.nativeElement).resizable("disable");
            this.isMiniview = false;
        }
    }

    /**
     * 잠금
     */
    public lock = () => {
        this.isLock = !this.isLock;
    }

    /**
     * 네비게이터
     */
    public nav = () => {
        this.isNav = !this.isNav;
    }

    /**
     * 영상 선택
     */
    public selectMovie = (idx: number) => {
        this.selectMovieIdx = idx;
    }

    /**
     * 배속
     */
    public alterPlayBackRate = (dir: string) => {
        if(dir) {
            let currentPlayBackRate = this.video.nativeElement.playbackRate;
            if(dir === '+') {
                if(currentPlayBackRate < 1.5) {
                    if(currentPlayBackRate === 1.2) {
                        this.video.nativeElement.playbackRate += 0.3;
                    } else {
                        this.video.nativeElement.playbackRate += 0.2;
                    }
                }
            }else if(dir === '-') {
                if(currentPlayBackRate > 0.8) {
                    if(currentPlayBackRate === 1.5) {
                        this.video.nativeElement.playbackRate -= 0.3;
                    } else {
                        this.video.nativeElement.playbackRate -= 0.2;
                    }
                }
            }
            this.textspeed.nativeElement.innerHTML = this.video.nativeElement.playbackRate.toFixed(1);
        }
    }

    /**
     * 캡처
     */
    public capture = () => {
        var ratio = this.video.nativeElement.videoWidth / this.video.nativeElement.videoHeight;
        var w = this.video.nativeElement.videoWidth; // 동영상 원본 사이즈
        var h = this.video.nativeElement.videoHeight; // 동영상 원본 사이즈
        var context = this.canvas.nativeElement.getContext("2d");

        this.canvas.nativeElement.width = w;
        this.canvas.nativeElement.height = h;

        context.fillRect(0, 0, w, h);
        context.drawImage(this.video.nativeElement, 0, 0, w, h);

        this.downloadcapture.nativeElement.click();
    }

    /**
     * 캡처 다운로드
     */
    public downloadCanvas = () => {
        this.downloadcapture.nativeElement.href = this.canvas.nativeElement.toDataURL();
        this.downloadcapture.nativeElement.download = "capture.png"; // 다운로드 이미지명
    }

    /**
     * 비디오 정보
     */
    public getVideoInfo = () => {
        
    }

    /**
     * 플레이어 동작 없을 시 컨트롤러 숨김
     */
    public playerIn = () => {
        clearTimeout(this.usePlayerTimer);
    }
    public playerOut = () => {
        this.usePlayerTimer = setTimeout(() => {
            this.isLock = true;
        }, 7000);
    }

    /**
     * 재생시간 측정
     */
    public startTimer = () => {
        this.playTimer = setInterval(() => {
            this.playTime = (this.playTime + (1 * this.video.nativeElement.playbackRate));
        }, 1000)
    }
    public stopTimer = () => {
        clearInterval(this.playTimer);
    }

    /**
     * 팝업 호출
     */
    public onClickClose = () => {
        window['pluszone'].onClickClose();
    }
}