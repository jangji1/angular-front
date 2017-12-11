"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var pluszone_component_1 = require("./pluszone/pluszone.component");
var product_detail_component_1 = require("./cookie/product-detail.component");
var pageNotFound_component_1 = require("./common/pageNotFound.component");
var checktime_index_1 = require("./checktime/checktime.index");
var teachertalk_index_1 = require("./teachertalk/teachertalk.index");
var notice_index_1 = require("./notice/notice.index");
// import {CommonCodeResolver} from './services/common-resolver.service'
var appRoutes = [
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
    { path: 'pluszone/:elearnCourseId', component: pluszone_component_1.PluszoneComponent },
    { path: 'cookie/productDetail/:cookieProductId', component: product_detail_component_1.CookieProductDetailComponent },
    { path: 'notice/detail/:noticeId', component: notice_index_1.NoticeDetailComponent },
    { path: 'teachertalk/:stuId', component: teachertalk_index_1.TeachertalkComponent },
    { path: 'checktime/:checktimeStudyId', component: checktime_index_1.ChecktimeMainComponent },
    { path: '**', component: pageNotFound_component_1.PageNotFoundComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: false });
//# sourceMappingURL=app.routing.js.map