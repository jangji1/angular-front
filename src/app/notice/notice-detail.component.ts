import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticeService } from './notice.service';

@Component({
  moduleId: module.id,
  template: `
        <div class="notice">
            <div class="innertube" [innerHTML]="data.contents | safeHtml">
              <div></div>
            </div>
        </div>`,
  styles: [`
        .notice {
            overflow: auto;
        }
        .product .innertube {
            height: 100%;
        }
    `]
})
export class NoticeDetailComponent implements OnInit {
  public noticeId: number;
  public data: any = {};

  constructor(
    public routeParams: ActivatedRoute,
    public noticeService: NoticeService
  ) { }

  ngOnInit(): void {
    this.routeParams.params.subscribe(params => {
      this.noticeId = params['noticeId'];
    });
    this.noticeDetail(this.noticeId);
  }

  noticeDetail = (noticeId: number) => {
    let params = { noticeId };

    this.noticeService.noticeDetail(params)
      .subscribe(
      res => {
        if (res.result) {
          this.data = res.result.detail;
        }
      },
      err => {
        if (err) {
          alert('네트워크 오류');
        }
      }
      )
  }
}