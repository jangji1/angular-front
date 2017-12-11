import { Component, Input } from '@angular/core';
import { TalkManager, TalkNode } from './checktime.talk.model';

@Component({
    moduleId: module.id,
    selector: '[talk-view]',
    templateUrl: './checktime.talk.view.component.html',
    styleUrls: ['checktime.talk.view.component.css']
})
export class TalkView{

    @Input() talkNode: TalkNode;

    constructor(){

    }
}