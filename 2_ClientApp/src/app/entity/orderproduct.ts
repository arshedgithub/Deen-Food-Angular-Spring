import {Product} from "./product";
import {CustomerOrder} from "./customerorder";

export class Orderproduct {

  public id !: number;
  public expectedcost !: number;
  public amount !: number;
  public customerorder !: CustomerOrder;
  public product !: Product;

  constructor(id: number, expectedcost: number, amount: number, customerorder: CustomerOrder, product: Product) {
    this.id = id;
    this.expectedcost = expectedcost;
    this.amount = amount;
    this.customerorder = customerorder;
    this.product = product;
  }

}
