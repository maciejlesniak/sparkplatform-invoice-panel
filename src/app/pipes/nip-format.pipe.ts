import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'nipFormat'
})
export class NipFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value
      .replace(/[^\d^\w]/g, '')
      .replace(/(\w{2})?(.{3})(.{3})(.{2})(.{2})/g, '$1 $2 $3 $4 $5')
      .trim();
  }

}
