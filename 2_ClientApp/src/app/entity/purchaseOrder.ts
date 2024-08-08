import {Postatus} from "./postatus";
import {Poitem} from "./poitem";
import {Supplier} from "./supplier";
import {Employee} from "./employee";

export class PurchaseOrder {

  public id !: number;
  public number !: string;
  public doplaced !: string;
  public dorequested !: string;
  public expectedtotal !: number;
  public description !: string;
  public poitems !: Array<Poitem>;
  public postatus !: Postatus;
  public supplier !: Supplier;
  public employee !: Employee;

  constructor(id: number, number: string, doplaced: string, dorequested: string, expectedtotal: number, description: string, poitems: Array<Poitem>, poStatus: Postatus, supplier: Supplier, employee: Employee) {
    this.id = id;
    this.number = number;
    this.doplaced = doplaced;
    this.dorequested = dorequested;
    this.expectedtotal = expectedtotal;
    this.description = description;
    this.poitems = poitems;
    this.postatus = poStatus;
    this.supplier = supplier;
    this.employee = employee;
  }

}





