import {SupplierStatus} from "./supplierstatus";
import {Employee} from "./employee";
import {SupplierIngcategory} from "./supplierIngcategory";

export class Supplier{

  public id !: number;
  public name !: string;
  public regNo !: string;
  public regYear !: string;
  public address !: string;
  public telephone !: string;
  public fax !: string;
  public email !: string;
  public contactPerson !: string;
  public contactMobile !: string;
  public creditLimit !: string;
  public description !: string;
  public doregister !: string;
  public supplierStatus !: SupplierStatus;
  public supplierIngcategory !: SupplierIngcategory;
  public employee !: Employee;


  constructor(id: number, name: string, regNo: string, regYear: string, address: string, telephone: string, fax: string, email: string, contactPerson: string, contactMobile: string, creditLimit: string, description: string, doregister: string, supplierStatus: SupplierStatus, employee: Employee, supplierIngcategory: SupplierIngcategory) {
    this.id = id;
    this.name = name;
    this.regNo = regNo;
    this.regYear = regYear;
    this.address = address;
    this.telephone = telephone;
    this.fax = fax;
    this.email = email;
    this.contactPerson = contactPerson;
    this.contactMobile = contactMobile;
    this.creditLimit = creditLimit;
    this.description = description;
    this.doregister = doregister;
    this.supplierStatus = supplierStatus;
    this.employee = employee;
    this.supplierIngcategory = supplierIngcategory;
  }

}





