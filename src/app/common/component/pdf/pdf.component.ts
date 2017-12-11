import { Component, Input, ViewChild, ElementRef, Output, HostListener, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Component({
    moduleId: module.id,
    selector: 'pdf',
    templateUrl: 'pdf.component.html',
    styles: [`
        iframe {display: block;width: 100%;height: 100%;}
    `]
})

export class PdfComponent implements OnInit {
    @Input() source: string;    // PDF 파일 경로

    @ViewChild('container') container: any;

    ngOnInit(): void {
        this.container.nativeElement.src = this.source;

    }
}