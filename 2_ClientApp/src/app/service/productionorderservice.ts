import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Productionorder} from "../entity/productionorder";

@Injectable({
  providedIn: 'root'
})

export class ProductionOrderService {

  constructor(private http: HttpClient) {  }

  async getAll(query:string): Promise<Array<Productionorder>> {
    const prodOrders = await this.http.get<Array<Productionorder>>('http://localhost:8080/productionorders'+query).toPromise();
    if(prodOrders == undefined) return [];
    console.log(prodOrders)
    return prodOrders;
  }

  async add(prodOrder: Productionorder): Promise<[]|undefined>{
    console.log(prodOrder)
    return this.http.post<[]>('http://localhost:8080/productionorders', prodOrder).toPromise();
  }

  async update(prodOrder: Productionorder): Promise<[]|undefined>{
    console.log(prodOrder)
    return this.http.put<[]>('http://localhost:8080/productionorders', prodOrder).toPromise();
  }

  async delete(id: number): Promise<[]|undefined>{
    // @ts-ignore
    return this.http.delete('http://localhost:8080/productionorders/' + id).toPromise();
  }

}


