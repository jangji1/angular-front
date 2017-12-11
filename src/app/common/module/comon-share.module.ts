import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlayerComponent } from '../component/player/player.component';
import { PdfComponent } from '../component/pdf/pdf.component';
import { TalkView } from '../../checktime/checktime.index';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations :[
        PlayerComponent,
        PdfComponent,
        TalkView,
    ],
    exports:[
        PlayerComponent,
        PdfComponent,
        TalkView,
    ],
    providers:[
    ]
})

export class CommonSharedModule { }