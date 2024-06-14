import {Ingcategory} from "./ingcategory";
import {Brand} from "./brand";
import {Unittype} from "./unittype";
import {Employee} from "./employee";
import {Ingstatus} from "./ingstatus";

export class Ingredient {

  public id !: number;
  public ingcategory !: Ingcategory;
  public brand !: Brand;
  public name !: string;
  public description !: string;
  public photo !: string;
  public unittype !: Unittype;
  public qoh !: number;
  public rop !: number;
  public cost !: number;
  public ingstatus !: Ingstatus;
  public dointroduced !: string;
  public employee !: Employee;

  constructor(id: number, ingcategory: Ingcategory, brand: Brand, name: string, description: string, photo: string, unittype: Unittype, qoh: number, rop: number, cost: number, ingstatus:Ingstatus, dointroduced: string, employee: Employee) {
    this.id = id;
    this.ingcategory = ingcategory;
    this.brand = brand;
    this.name = name;
    this.description = description;
    this.photo = photo;
    this.unittype = unittype;
    this.qoh = qoh;
    this.rop = rop;
    this.cost = cost;
    this.ingstatus = ingstatus;
    this.dointroduced = dointroduced;
    this.employee = employee;
  }

}
