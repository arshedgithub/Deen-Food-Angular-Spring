import {Invoice} from "./invoice";
import {Paytype} from "./paytype";
import {Paystatus} from "./paystatus";
import {Customer} from "./customer";
import {Employee} from "./employee";

export class CustPayment {

  public id !: number;
  public number !: string;
  public grandtotal !: number;
  public date !: string;
  public invoice !: Invoice;
  public paytype !: Paytype;
  public paystatus !: Paystatus;
  public customer !: Customer;
  public employee !: Employee;

  constructor(id: number, number: string, grandtotal: number, date: string, invoice: Invoice, paytype: Paytype, paystatus: Paystatus, customer: Customer, employee: Employee) {
    this.id = id;
    this.number = number;
    this.grandtotal = grandtotal;
    this.date = date;
    this.invoice = invoice;
    this.paytype = paytype;
    this.paystatus = paystatus;
    this.customer = customer;
    this.employee = employee;
  }

}
