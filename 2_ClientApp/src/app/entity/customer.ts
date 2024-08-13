import {Customerstatus} from "./customerstatus";
import {Gender} from "./gender";
import {Employee} from "./employee";

export class Customer {

  public id !: number;
  public customernumber !: string;
  public fullname !: string;
  public callingname !: string;
  public contact !: string;
  public description !: string;
  public email !: string;
  public address !: string;
  public customerstatus !: Customerstatus;
  public gender !: Gender;
  public employee !: Employee;

  constructor(id: number, customernumber: string, fullname: string, callingname: string, contact: string, description: string, email: string, address: string, customerstatus: Customerstatus, gender: Gender, employee: Employee) {
    this.id = id;
    this.customernumber = customernumber;
    this.fullname = fullname;
    this.callingname = callingname;
    this.contact = contact;
    this.description = description;
    this.email = email;
    this.address = address;
    this.customerstatus = customerstatus;
    this.gender = gender;
    this.employee = employee;
  }

}
