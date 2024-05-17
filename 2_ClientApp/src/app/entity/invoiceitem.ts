
import {Ingredient} from "./ingredient";


export class Invoiceitem {

  public id!:number;
  public  item:Ingredient;
  public quantity !: number;
  public linetotal !: number;

  constructor(id:number, item:Ingredient, quantity:number, linetotal:number) {
    this.id = id;
    this.item = item;
    this.quantity = quantity;
    this.linetotal = linetotal;
  }

}


