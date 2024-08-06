import {Postatus} from "./postatus";
import {Poitem} from "./poitem";
import {Supplier} from "./supplier";
import {Employee} from "./employee";

export class PurchaseOrder {

  public id !: number;
  public number !: number;
  public doplaced !: string;
  public dorequested !: string;
  public expectedTotal !: number;
  public description !: string;
  public poitems !: Array<Poitem>;
  public poStatus !: Postatus;
  public supplier !: Supplier;
  public employee !: Employee;

  constructor(id: number, number: number, doplaced: string, dorequested: string, expectedTotal: number, description: string, poitems: Array<Poitem>, poStatus: Postatus, supplier: Supplier, employee: Employee) {
    this.id = id;
    this.number = number;
    this.doplaced = doplaced;
    this.dorequested = dorequested;
    this.expectedTotal = expectedTotal;
    this.description = description;
    this.poitems = poitems;
    this.poStatus = poStatus;
    this.supplier = supplier;
    this.employee = employee;
  }

}





