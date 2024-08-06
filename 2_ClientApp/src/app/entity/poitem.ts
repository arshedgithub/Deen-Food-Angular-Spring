import {Ingredient} from "./ingredient";
import {PurchaseOrder} from "./purchaseOrder";

export class Poitem {

  public id !: number;
  public quantity !: number;
  public expectedLinecost !: number;
  // public ingredient!: Ingredient;
  public purchaseOrder!: PurchaseOrder;

  constructor(id: number, quantity: number, expectedLinecost: number, purchaseOrder: PurchaseOrder) {
    this.id = id;
    this.quantity = quantity;
    this.expectedLinecost = expectedLinecost;
    // this.ingredient = ingredient;
    this.purchaseOrder = purchaseOrder;
  }
}
