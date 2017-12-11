import { Component, ViewChild,ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription }   from 'rxjs/Subscription';

export class CommonComponent{

    public pageNo:number = 1;
    public totalCnt:number = 10; // total numbar of page not items 
    public listSize:number = 10; // max page size
    public listStartIndex: number;

    constructor() {        
    }

    protected initPagenation(){
        this.totalCnt = 0;
        this.listSize = 0;
        this.listStartIndex = 0;
        this.pageNo = 0;
    }

    protected setPagination(info : any){
        if(info){
            this.totalCnt = info.pageInfo.totalCnt;
            this.listSize = info.pageInfo.listSize; 
            this.listStartIndex = this.totalCnt - (this.listSize * (this.pageNo-1));       
        }
    }

    protected setPage(pageNo:number):void {
        this.pageNo = pageNo;    
    };

    protected pageChanged(event:any):void {
        //this method will trigger every page click  
        // console.log('Number items per page: ' + event.itemsPerPage);
    };
}

