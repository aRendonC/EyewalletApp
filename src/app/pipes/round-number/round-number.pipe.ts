import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundNumber'
})
export class RoundNumberPipe implements PipeTransform {
  transform(value: any): any {
    return parseFloat(value).toFixed(5);
  }
}
