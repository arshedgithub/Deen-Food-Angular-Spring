import {Paytype} from "./paytype";
import {Paystatus} from "./paystatus";
import {Employee} from "./employee";
import {Grn} from "./grn";
import {Supplier} from "./supplier";

export class SupPayment {

  public id !: number;
  public number !: string;
  public grandtotal !: number;
  public date !: string;
  public grn !: Grn;
  public paytype !: Paytype;
  public paystatus !: Paystatus;
  public supplier !: Supplier;
  public employee !: Employee;


  constructor(id: number, number: string, grandtotal: number, date: string, grn: Grn, paytype: Paytype, paystatus: Paystatus, supplier: Supplier, employee: Employee) {
    this.id = id;
    this.number = number;
    this.grandtotal = grandtotal;
    this.date = date;
    this.grn = grn;
    this.paytype = paytype;
    this.paystatus = paystatus;
    this.supplier = supplier;
    this.employee = employee;
  }

}
