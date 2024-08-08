import {Ingredient} from "./ingredient";
import {PurchaseOrder} from "./purchaseOrder";

export class Poitem {

  public id !: number;
  public quantity !: number;
  public expected_linecost !: number;
  public ingredient!: Ingredient;

  constructor(id: number, quantity: number, expected_linecost: number, ingredient: Ingredient) {
    this.id = id;
    this.quantity = quantity;
    this.expected_linecost = expected_linecost;
    this.ingredient = ingredient;
  }
}
