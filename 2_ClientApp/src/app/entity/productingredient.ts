import {Ingredient} from "./ingredient";

export class Productingredient {

  public id !: number;
  public neededQuantity !: number;
  public ingredient !: Ingredient;

  constructor(id: number, neededQuantity: number, ingredient: Ingredient) {
    this.id = id;
    this.neededQuantity = neededQuantity;
    this.ingredient = ingredient;
  }
}
