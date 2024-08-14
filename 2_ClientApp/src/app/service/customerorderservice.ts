import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CustomerOrder} from "../entity/customerorder";

@Injectable({
  providedIn: 'root'
})

export class CustomerOrderService {

  constructor(private http: HttpClient) {  }

  async delete(id: number): Promise<[]|undefined>{
    // @ts-ignore
    return this.http.delete('http://localhost:8080/customerorders/' + id).toPromise();
  }

  async update(order: CustomerOrder): Promise<[]|undefined>{
    //console.log("Customer Updating-"+customer.id);
    return this.http.put<[]>('http://localhost:8080/customerorders', order).toPromise();
  }


  async getAll(query:string): Promise<Array<CustomerOrder>> {
    const orders = await this.http.get<Array<CustomerOrder>>('http://localhost:8080/customerorders'+query).toPromise();
    if(orders == undefined){
      return [];
    }
    return orders;
  }

  async add(order: CustomerOrder): Promise<[]|undefined>{
    return this.http.post<[]>('http://localhost:8080/customerorders', order).toPromise();
  }

}


