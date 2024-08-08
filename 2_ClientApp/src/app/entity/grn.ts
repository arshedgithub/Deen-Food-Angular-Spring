import {Employee} from "./employee";
import {Grnstatus} from "./grnstatus";
import {PurchaseOrder} from "./purchaseOrder";
import {Grnitem} from "./grnitem";

export class Grn{

  public id !: number;
  public grnnumber !: string;
  public date !: string;
  public description !: string;
  public grandtotal !: number;
  public employee !: Employee;
  public grnstatus !: Grnstatus;
  public purorder !: PurchaseOrder;
  public grnitems !: Array<Grnitem>;

  constructor(id: number, date: string, description: string,grnnumber: string, grandtotal: number, employee:Employee, grnstatus:Grnstatus, purorder:PurchaseOrder, grnitems: Array<Grnitem>) {
    this.id = id;
    this.grnnumber = grnnumber;
    this.date = date;
    this.description = description;
    this.grandtotal = grandtotal;
    this.grnstatus = grnstatus;
    this.grnitems = grnitems;
    this.purorder = purorder;
    this.employee = employee;
  }

}






