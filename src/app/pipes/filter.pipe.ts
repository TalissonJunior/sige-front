import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  /**
   * 
   * @param items 
   * @param value value to filter
   * @param propertiesToFilter  properties of the object to compare
   */
  transform(items: any[], value: any, propertiesToFilter: string[]): any {

    if (!items || !value) {
      return items;
    }

   var values = items.filter((item) => {

      var foundMatch = false;
      for (var i = 0; i < propertiesToFilter.length; i++) {

        if (this.isInteger(item[propertiesToFilter[i]]) || this.isFloat(item[propertiesToFilter[i]])) {

          if (item[propertiesToFilter[i]] && item[propertiesToFilter[i]] == value) {
            foundMatch = true;
            break;
          }
        }
        else {
          if (item[propertiesToFilter[i]] && item[propertiesToFilter[i]].toLowerCase().indexOf(value.toLowerCase()) > -1) {
            foundMatch = true;
            break;
          }
        }

      }

      if (foundMatch) {
        return item;
      }

    });

    return values.length === 0 ? [-1] : values;
  }

  isFloat(n) {
    return n === +n && n !== (n | 0);
  }

  isInteger(n) {
    return n === +n && n === (n | 0);
  }

}
