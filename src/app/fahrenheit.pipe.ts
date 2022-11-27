import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fahrenheit'
})
export class FahrenheitPipe implements PipeTransform {

  transform(value: number): unknown {
    if(value && !isNaN(value)) {
      let temp = (value * 9 / 5) + 32;
      return temp.toFixed(0);
    }
    return;
  }

}
