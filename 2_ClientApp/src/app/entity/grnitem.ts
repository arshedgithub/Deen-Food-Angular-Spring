import {Ingredient} from "./ingredient";

export class Grnitem {

  public id !: number;
  public unitcost !: number;
  public qty !: number;
  public linecost !: number;
  public ingredient !: Ingredient;

  constructor(id: number, ing:Ingredient, unitcost: number, qty: number, linecost : number) {
    this.id = id;
    this.unitcost = unitcost;
    this.qty = qty;
    this.linecost = linecost;
    this.ingredient = ing;
  }

}
