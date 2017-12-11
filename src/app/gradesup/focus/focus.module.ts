import { NgModule }         from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonSharedModule } from '../../common/module/comon-share.module';
import { FocusRouting }  from './focus.routing';
import { LearnMainComponent } from './learn/learn-main.component';

@NgModule({
  imports:[
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FocusRouting,
    CommonSharedModule,
  ],
  declarations:[
    LearnMainComponent
  ],
  providers:[
    CommonModule,
  ],
})

export class FocusModule {

}