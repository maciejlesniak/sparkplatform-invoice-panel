import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any[], element: string, order?: string): any[] {

    if (value && element) {
      if (order === 'asc' || order === undefined) {
        console.debug('order by pipe in ascending order', value, element);
        return value.sort((a, b) => a[element] < b[element] ? -1 : 1);
      } else if (order === 'desc') {
        console.debug('order by pipe in descending order', value, element);
        return value.sort((a, b) => a[element] > b[element] ? -1 : 1);
      }

    }

    return value;
  }

}
