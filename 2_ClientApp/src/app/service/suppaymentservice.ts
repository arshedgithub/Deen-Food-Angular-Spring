import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SupPayment} from "../entity/supPayment";

@Injectable({
  providedIn: 'root'
})

export class SupPaymentService {

  constructor(private http: HttpClient) {  }

  async delete(id: number): Promise<[]|undefined>{
    // @ts-ignore
    return this.http.delete('http://localhost:8080/suppayments/' + id).toPromise();
  }

  async update(payment: SupPayment): Promise<[]|undefined>{
    return this.http.put<[]>('http://localhost:8080/suppayments', payment).toPromise();
  }


  async getAll(query:string): Promise<Array<SupPayment>> {
    const payments = await this.http.get<Array<SupPayment>>('http://localhost:8080/suppayments'+query).toPromise();
    if(payments == undefined) return [];
    return payments;
  }

  async add(payment: SupPayment): Promise<[]|undefined>{
    return this.http.post<[]>('http://localhost:8080/suppayments', payment).toPromise();
  }

}


