import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
    name: 'num'
})
export class NumPipe implements PipeTransform {
    transform(value: any, args: any): any {
        if (value.length < 1) return value;
        return value.replace(/[^0-9]/g, '');
    }
}

@Pipe({
    name: 'nan'
})
export class NanPipe implements PipeTransform {
    transform(value: any, args: any): any {
        if (value.length < 1) return value;
        return value.replace(/[0-9]/g, '');
    }
}

@Pipe({
    name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){}

  transform(html: any) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

@Pipe({
    name: 'convert12H'
})
export class Convert12HPipe implements PipeTransform {
  transform(time: string) {
    const ampmLabel = [ '오전', '오후' ];
    const timeRegExFormat = /^([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
    let timeToken = time.match(timeRegExFormat);

    let intHours = parseInt(timeToken[1]);
    let intMinutes = parseInt(timeToken[2]);
    let intSeconds = parseInt(timeToken[3]);
    let strHours12H = ('0' + (intHours == 12 ? 12 : intHours % 12)).slice(-2);
    let strMinutes = intMinutes < 10 ? '0' + intMinutes : intMinutes;
    let strSecondes = intSeconds < 10 ? '0' + intSeconds : intSeconds;
    
    return `${ampmLabel[parseInt(String(intHours / 12))]} ${strHours12H}:${strMinutes}`;
  }
}

@Pipe({
    name: 'weekday'
})
export class WeekdayPipe implements PipeTransform {
    transform(value: any, args: any): any {
      let weekKor = ['월','화','수','목','금','토','일'];
      return weekKor[value] + '요일';
    }
}