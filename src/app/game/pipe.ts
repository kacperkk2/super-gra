import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'formatTime'})
export class FormatTimePipe implements PipeTransform {
  transform(seconds: number) {
    const mins = Math.floor(seconds/60);
    const secs = seconds%60;
    return (mins < 10 ? "0" + mins : mins) + ":" + (secs < 10 ? "0" + secs : secs) ;
  }
}