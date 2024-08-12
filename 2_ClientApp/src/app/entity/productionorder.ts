import {Employee} from "./employee";
import {Prodorderstatus} from "./prodorderstatus";
import {ProductionOrderProduct} from "./productionorderproduct";

export class Productionorder {

  public id !: number;
  public orderNumber !: string;
  public dorequired !: string;
  public doplaced !: string;
  public description !: string;
  public productionOrderstatus ! : Prodorderstatus;
  public productionOrderProducts !: Array<ProductionOrderProduct>;
  public employee !: Employee;

  constructor(id: number, orderNumber: string, dorequired: string, doplaced: string, description: string, productionOrderstatus: Prodorderstatus, productionOrderProducts: Array<ProductionOrderProduct>, employee: Employee) {
    this.id = id;
    this.orderNumber = orderNumber;
    this.dorequired = dorequired;
    this.doplaced = doplaced;
    this.description = description;
    this.productionOrderstatus = productionOrderstatus;
    this.productionOrderProducts = productionOrderProducts;
    this.employee = employee;
  }

}
