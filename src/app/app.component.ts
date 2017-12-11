import { Component } from '@angular/core';

import { CommonService } from './services/common.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
  <router-outlet></router-outlet>
  `
})
export class AppComponent {

  constructor(
    private commonService: CommonService, /* Init CommonService at singleton service */
  ){
    
  }
}