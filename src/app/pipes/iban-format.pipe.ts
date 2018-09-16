import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ibanFormat'
})
export class IbanFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value
      .replace(/[^\d^\w]/g, '')
      .replace(/(.{4})(.{4})?/g, '$1 $2 ')
      .trim();
  }

}
