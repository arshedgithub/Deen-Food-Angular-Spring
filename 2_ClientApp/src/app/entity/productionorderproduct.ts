import {Employee} from "./employee";
import {Prodorderstatus} from "./prodorderstatus";
import {Product} from "./product";
import {Productionorder} from "./productionorder";

export class ProductionOrderProduct {

  public id !: number;
  public amount !: number;
  public productionOrder !: Productionorder;
  public product !: Product;

  constructor(id: number, amount: number, productionOrder: Productionorder, product: Product) {
    this.id = id;
    this.amount = amount;
    this.productionOrder = productionOrder;
    this.product = product;
  }

}
