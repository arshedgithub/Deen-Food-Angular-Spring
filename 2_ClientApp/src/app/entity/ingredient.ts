import {Ingcategory} from "./ingcategory";
import {Brand} from "./brand";
import {Unittype} from "./unittype";
import {Employee} from "./employee";
import {Ingstatus} from "./ingstatus";

export class Ingredient {

  public id !: number;
  public category !: Ingcategory;
  public brand !: Brand;
  public name !: string;
  public description !: String;
  public photo !: String;
  public unittype !: Unittype;
  public qoh !: number;
  public rop !: number;
  public cost !: number;
  public ingstatus !: Ingstatus;
  public dointroduced !: String;
  public employee !: Employee;

  constructor(id: number, category: Ingcategory, brand: Brand, name: string, description: String, photo: String, unittype: Unittype, qoh: number, rop: number, cost: number, ingstatus:Ingstatus, dointroduced: String, employee: Employee) {
    this.id = id;
    this.category = category;
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
