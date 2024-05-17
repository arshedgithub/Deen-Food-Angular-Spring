import {Brand} from "./brand";
import {Ingcategory} from "./ingcategory";

export class Ingstatus {

  public id !: number;
  public brand !: Brand;
  public category !: Ingcategory;

  constructor(id: number, brand: Brand, category: Ingcategory) {
    this.id = id;
    this.brand = brand;
    this.category = category;
  }

}
