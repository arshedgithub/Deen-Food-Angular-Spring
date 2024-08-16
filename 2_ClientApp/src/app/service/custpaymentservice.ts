import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CustPayment} from "../entity/custPayment";

@Injectable({
  providedIn: 'root'
})

export class CustPaymentpaymentService {

  constructor(private http: HttpClient) {  }

  async delete(id: number): Promise<[]|undefined>{
    // @ts-ignore
    return this.http.delete('http://localhost:8080/custpayments/' + id).toPromise();
  }

  async update(payment: CustPayment): Promise<[]|undefined>{
    return this.http.put<[]>('http://localhost:8080/custpayments', payment).toPromise();
  }


  async getAll(query:string): Promise<Array<CustPayment>> {
    const payments = await this.http.get<Array<CustPayment>>('http://localhost:8080/custpayments'+query).toPromise();
    if(payments == undefined) return [];
    return payments;
  }

  async add(payment: CustPayment): Promise<[]|undefined>{
    return this.http.post<[]>('http://localhost:8080/custpayments', payment).toPromise();
  }

}


