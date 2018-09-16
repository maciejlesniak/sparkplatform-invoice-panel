import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'spell'
})
export class SpellPipe implements PipeTransform {

  // private numbers: string [] = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  private numbers: string [] = ['zero', 'jeden', 'dwa', 'trzy', 'cztery', 'pięć', 'sześć', 'siedem', 'osim', 'dziewięć'];
  private nonNumbers: { character: string, value: string }[] = [
    {character: '.', value: 'zł'}
  ];
  private locale: string;

  transform(value: number, separator?: string): string {
    console.debug(this.locale);
    return value.toFixed(2)
      .split('')
      .map(v => {
        if (!isNaN(Number(v))) {
          return this.numbers[v];
        } else {
          const nonNumVal = this.nonNumbers.filter(value2 => value2.character === v)[0];
          return nonNumVal !== undefined ? nonNumVal.value : v;
        }
      })
      .join(separator) + ' gr';
  }

}
