import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/index';

import { HomeComponent } from './home/home.component';
import { PluszoneComponent } from './pluszone/pluszone.component';
import { CookieProductDetailComponent } from './cookie/product-detail.component';
import { PageNotFoundComponent } from './common/pageNotFound.component';
import { ChecktimeMainComponent } from './checktime/checktime.index';
import { TeachertalkComponent } from './teachertalk/teachertalk.index';
import { NoticeDetailComponent } from './notice/notice.index';

// import {CommonCodeResolver} from './services/common-resolver.service'


const appRoutes: Routes = [
  {
    path: '', redirectTo: '/pluszone/155', pathMatch: 'full'
    // resolve:{commonCode:CommonCodeResolver},
    //canActivate: [AuthGuard], 
  },
  {
    path: 'gradesup', children: [
      { path: 'focus', loadChildren: 'app/gradesup/focus/focus.module#FocusModule' }
    ]
  },
  { path: 'pluszone/:elearnCourseId', component: PluszoneComponent },
  { path: 'cookie/productDetail/:cookieProductId', component: CookieProductDetailComponent },
  { path: 'notice/detail/:noticeId', component: NoticeDetailComponent },
  { path: 'teachertalk/:stuId', component: TeachertalkComponent },
  { path: 'checktime/:checktimeStudyId', component: ChecktimeMainComponent },
  { path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: false });