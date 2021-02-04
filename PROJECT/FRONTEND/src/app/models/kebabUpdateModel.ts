export interface KebabInsertModel {
  name: string,
  cost: number,
  description: string,
  ingredients: Array<KebabUpdateModelIngredient>
}

export interface KebabUpdateModel extends KebabInsertModel {
  id: number
}

export interface KebabUpdateModelIngredient {
  id: number,
  amount: string
}
