import {Productstatus} from "./productstatus";
import {Productingredient} from "./productingredient";
import {Employee} from "./employee";

export class Product {

  public id !: number;
  public productnumber !: string;
  public name !: string;
  public description !: string;
  public quantity !: number;
  public rop: number;
  public price !: number;
  public photo !: string;
  public dointroduced !: string;
  public productstatus ! : Productstatus;
  public productIngredients !: Array<Productingredient>;
  public employee !: Employee;

  constructor(id: number, productnumber: string, name: string, description: string, quantity: number, price: number, photo: string, dointroduced: string, productstatus: Productstatus, productIngredients: Array<Productingredient>, employee: Employee, rop: number) {
    this.id = id;
    this.productnumber = productnumber;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.price = price;
    this.rop = rop;
    this.photo = photo;
    this.dointroduced = dointroduced;
    this.productstatus = productstatus;
    this.productIngredients = productIngredients;
  }

}
