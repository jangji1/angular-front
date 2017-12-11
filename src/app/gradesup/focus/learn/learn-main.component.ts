import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { LearnService } from './learn.service';

@Component({
    moduleId: module.id,
    templateUrl: 'learn-main.component.html',
    styleUrls: ['learn-main.component.css'],
    providers: [ LearnService ]
})

export class LearnMainComponent implements OnInit {
    private offsetTop: Number = 50;
    private offsetLeft: Number = 0;
    private settings: any = {
        //miniview: true,
        //width: 300,
        //height: 150,
        //top: Number(this.offsetTop) + 0,
        //left: Number(this.offsetLeft) + 0,
        //startTime: 30,
        //endTime: 45,
        //currentTime: 5,
    }

    constructor() {
    }

    ngOnInit(): void{
    }
}