import {SupplierStatus} from "./supplierstatus";
import {Employee} from "./employee";
import {SupplierIngcategory} from "./supplierIngcategory";

export class Supplier{

  public id !: number;
  public name !: string;
  public regno !: string;
  public regyear !: number;
  public address !: string;
  public telephone !: string;
  public fax !: string;
  public email !: string;
  public contactperson !: string;
  public contactmobile !: string;
  public creditlimit !: string;
  public description !: string;
  public doregister !: string;
  public supplierstatus !: SupplierStatus;
  public supplierIngcategory !: SupplierIngcategory;
  public employee !: Employee;


  constructor(id: number, name: string, regNo: string, regYear: number, address: string, telephone: string, fax: string, email: string, contactPerson: string, contactMobile: string, creditLimit: string, description: string, doregister: string, supplierstatus: SupplierStatus, employee: Employee, supplierIngcategory: SupplierIngcategory) {
    this.id = id;
    this.name = name;
    this.regno = regNo;
    this.regyear = regYear;
    this.address = address;
    this.telephone = telephone;
    this.fax = fax;
    this.email = email;
    this.contactperson = contactPerson;
    this.contactmobile = contactMobile;
    this.creditlimit = creditLimit;
    this.description = description;
    this.doregister = doregister;
    this.supplierstatus = supplierstatus;
    this.employee = employee;
    this.supplierIngcategory = supplierIngcategory;
  }

}





