import {Employee} from "./employee";
import {CustomerOrderstatus} from "./customerorderstatus";
import {Customer} from "./customer";
import {Orderproduct} from "./orderproduct";

export class CustomerOrder {

  public id !: number;
  public number !: string;
  public doexpected !: string;
  public totalitem !: number;
  public expectadtotal !: number;
  public description !: string;
  public doplaced !: string;
  public customerorderstatus !: CustomerOrderstatus;
  public customer !: Customer;
  public employee !: Employee;
  public orderproducts !: Array<Orderproduct>;

  constructor(id: number, number: string, doexpected: string, totalitem: number, expectadtotal: number, description: string, doplaced: string, customerorderstatus: CustomerOrderstatus, customer: Customer, employee: Employee, orderproducts: Array<Orderproduct>) {
    this.id = id;
    this.number = number;
    this.doexpected = doexpected;
    this.totalitem = totalitem;
    this.expectadtotal = expectadtotal;
    this.description = description;
    this.doplaced = doplaced;
    this.customerorderstatus = customerorderstatus;
    this.customer = customer;
    this.employee = employee;
    this.orderproducts = orderproducts;
  }

}
