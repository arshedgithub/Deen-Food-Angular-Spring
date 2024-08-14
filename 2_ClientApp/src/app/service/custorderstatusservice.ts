import {Empstatus} from "../entity/empstatus";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CustomerOrderstatus} from "../entity/customerorderstatus";

@Injectable({
  providedIn: 'root'
})

export class CustomerOrderstatusService {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<CustomerOrderstatus>> {

    const customerorderstatuses = await this.http.get<Array<CustomerOrderstatus>>('http://localhost:8080/custorderstatuses/list').toPromise();
    if(customerorderstatuses == undefined) return [];
    return customerorderstatuses;
  }

}


