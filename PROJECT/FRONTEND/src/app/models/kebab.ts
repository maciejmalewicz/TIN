import { IngredientUsage } from "./ingredient_usage";

export interface Kebab {
  id: number,
  meal_cost: number,
  meal_name: string,
  meal_description: string,
  ingredients: Array<IngredientUsage>
}
