import {Ingredient} from "./ingredient";

export class Productingredient {

  public id !: number;
  public quantityratio !: number;
  public ingredient !: Ingredient;

  constructor(id: number, neededQuantity: number, ingredient: Ingredient) {
    this.id = id;
    this.quantityratio = neededQuantity;
    this.ingredient = ingredient;
  }
}
