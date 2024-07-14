import {Supplier} from "./supplier";
import {Ingcategory} from "./ingcategory";

export class SupplierIngcategory {

  public id !: number;
  public supplier !: Supplier;
  public ingCategory !: Ingcategory;

  constructor(id:number,supplier:Supplier, ingCategory: Ingcategory) {
    this.id = id;
    this.supplier = supplier;
    this.ingCategory = ingCategory;
  }

}
