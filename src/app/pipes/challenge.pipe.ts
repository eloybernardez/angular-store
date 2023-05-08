import { Pipe, PipeTransform } from '@angular/core';

interface Vocales {
  [key: string]: string;
}

const vocales: Vocales = {
  a: '0',
  e: '1',
  i: '2',
  o: '3',
  u: '4',
};
@Pipe({
  name: 'challenge',
})
export class ChallengePipe implements PipeTransform {
  transform(value: string): string {
    const final = value
      .split('')
      .map((letter) => vocales[letter] ?? letter)
      .join('');

    return final;
  }
}
