import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HttpModule, JsonpModule }    from '@angular/http';
import { AppComponent }  from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { routing }        from './app.routing';
import { PageNotFoundComponent }        from './common/pageNotFound.component';

import { AuthGuard } from './guards/index';
import { AuthService } from './services/auth.service';

import { NetService } from './services/net.service';
import { CommonService }       from './services/common.service';
import { CommonSharedModule } from './common/module/comon-share.module';

import { HomeComponent } from './home/home.component';
import { PluszoneComponent, PluszoneService } from './pluszone/pluszone.index';
import { CookieProductDetailComponent, CookieProductService } from './cookie/product.index';
import { NoticeDetailComponent, NoticeService } from './notice/notice.index';
import { ChecktimeMainComponent, ChecktimeService } from './checktime/checktime.index';
import { TeachertalkComponent, TeachertalkService } from './teachertalk/teachertalk.index';

import { NumPipe, NanPipe, SafeHtmlPipe, Convert12HPipe, WeekdayPipe } from './app.pipe';



export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
    'swipe': {direction: 31},
    'pan': {threshold: 1},
  }
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    CommonSharedModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    PluszoneComponent,
    CookieProductDetailComponent,
    NumPipe,
    NanPipe,
    SafeHtmlPipe,
    Convert12HPipe,
    WeekdayPipe,
    ChecktimeMainComponent,
    TeachertalkComponent,
    NoticeDetailComponent
  ],
  providers: [
    AuthGuard,
    NetService,
    CommonService,
    AuthService,
    { 
        provide: HAMMER_GESTURE_CONFIG,
        useClass: MyHammerConfig
    },
    PluszoneService,
    CookieProductService,
    ChecktimeService,
    TeachertalkService,
    NoticeService
  ],
  
  bootstrap: [ AppComponent ]
})

export class AppModule { }