import {Invoicestatus} from "./invoicestatus";
import {Employee} from "./employee";
import {CustomerOrder} from "./customerorder";

export class Invoice {

  public id !: number;
  public number !: string;
  public grandtotal !: number;
  public date !: string;
  public customerorder !: CustomerOrder;
  public employee!:Employee;
  public invoicestatus!:Invoicestatus;

  constructor(id: number, number: string, grandtotal: number, date: string, customerorder: CustomerOrder, employee: Employee, invoicestatus: Invoicestatus) {
    this.id = id;
    this.number = number;
    this.grandtotal = grandtotal;
    this.date = date;
    this.customerorder = customerorder;
    this.employee = employee;
    this.invoicestatus = invoicestatus;
  }

}
