import { Component, OnInit } from '@angular/core';

@Component({
  template: '<div style="width:100%; height:100%;position:fixed;"><div style="font-size:30px;width:360px;height:40px;margin-left:auto;margin-right:auto;top:50px;position:relative;">페이지를 찾을 수 없습니다.</div></div>'
})

export class PageNotFoundComponent implements OnInit {
    

    ngOnInit(): void {
    }


}
