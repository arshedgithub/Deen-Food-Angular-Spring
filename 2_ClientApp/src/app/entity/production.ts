import {Productionstatus} from "./productionstatus";
import {Productionorder} from "./productionorder";
import {Product} from "./product";
import {Employee} from "./employee";

export class Production {

  public id !: number;
  public number !: string;
  public date !: string;
  public amount !: number;
  public description !: string;
  public doplaced !: string;
  public productionstatus !: Productionstatus;
  public productionOrder !: Productionorder;
  public product !: Product;
  public employee !: Employee;

  constructor(id: number, number: string, date: string, amount: number, description: string, doplaced: string, productionstatus: Productionstatus, productionOrder: Productionorder, product: Product, employee: Employee) {
    this.id = id;
    this.number = number;
    this.date = date;
    this.amount = amount;
    this.description = description;
    this.doplaced = doplaced;
    this.productionstatus = productionstatus;
    this.productionOrder = productionOrder;
    this.product = product;
    this.employee = employee;
  }

}





