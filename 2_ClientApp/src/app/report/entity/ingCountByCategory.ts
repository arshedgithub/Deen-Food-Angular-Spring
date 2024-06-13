export class IngCountByCategory {

  public id !: number;
  public ingredient !: string;
  public count !: number;

  constructor(id:number,ingredient:string,count:number) {
    this.id=id;
    this.ingredient=ingredient;
    this.count=count;
  }

}
