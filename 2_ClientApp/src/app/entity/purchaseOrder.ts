import {Postatus} from "./postatus";
import {Poitem} from "./poitem";
import {Supplier} from "./supplier";

export class PurchaseOrder {

  public id !: number;
  public number !: number;
  public doplaced !: string;
  public dorequested !: string;
  public expectedTotal !: number;
  public description !: string;
  public poitem !: Poitem;
  public poStatus !: Postatus;
  public supplier !: Supplier;

  constructor(id: number, number: number, doplaced: string, dorequested: string, expectedTotal: number, description: string, poitem: Poitem, poStatus: Postatus, supplier: Supplier) {
    this.id = id;
    this.number = number;
    this.doplaced = doplaced;
    this.dorequested = dorequested;
    this.expectedTotal = expectedTotal;
    this.description = description;
    this.poitem = poitem;
    this.poStatus = poStatus;
    this.supplier = supplier;
  }
  
}





