import { Pipe, PipeTransform } from '@angular/core';
import { IngredientUsage } from 'src/app/models/ingredient_usage';
import { Kebab } from 'src/app/models/kebab';

@Pipe({
  name: 'ingredients'
})
export class IngredientsPipe implements PipeTransform {

  transform(arr: Array<IngredientUsage>): string {
    return arr.map(ing => ing.ingredient_name)
    .reduce((prev, curr) => {
      return prev + ", " + curr;
    })
  }

}
