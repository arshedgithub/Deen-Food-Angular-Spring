import {Ingredient} from "./ingredient";

export class Poitem {

  public id !: number;
  public quantity !: number;
  public expectedLinecost !: number;
  public ingredient!: Ingredient;

  constructor(id: number, quantity: number, expected_linecost: number, ingredient: Ingredient) {
    this.id = id;
    this.quantity = quantity;
    this.expectedLinecost = expected_linecost;
    this.ingredient = ingredient;
  }
}
