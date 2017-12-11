import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieProductService } from './product.service';

@Component({
  moduleId: module.id,
  template: `
        <div class="product">
            <div class="innertube" [innerHTML]="data.productCont | safeHtml"></div>
        </div>`,
  styles: [`
        .product {
            overflow: auto;
        }
        .product .innertube {
            height: 100%;
        }
    `]
})
export class CookieProductDetailComponent implements OnInit {
  public cookieProductId: number;
  public data: any = {};

  constructor(
    public routeParams: ActivatedRoute,
    public productService: CookieProductService
  ) { }

  ngOnInit(): void {
    this.routeParams.params.subscribe(params => {
      this.cookieProductId = params['cookieProductId'];
    });
    this.retrieveProductDetail(this.cookieProductId);
  }

  retrieveProductDetail = (cookieProductId: number) => {
    let params = { cookieProductId };

    this.productService.retrieveProductDetail(params)
      .subscribe(
      res => {
        if (res.result) {
          this.data = res.result.productDetail;
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