import {Invoice} from "../entity/invoice";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class InvoiceService {

  constructor(private http: HttpClient) {  }

  async delete(id: number): Promise<[]|undefined>{
    // @ts-ignore
    return this.http.delete('http://localhost:8080/invoices/' + id).toPromise();
  }

  async update(invoice: Invoice): Promise<[]|undefined>{
    return this.http.put<[]>('http://localhost:8080/invoices', invoice).toPromise();
  }

  async getAll(query:string): Promise<Array<Invoice>> {
    const invoices = await this.http.get<Array<Invoice>>('http://localhost:8080/invoices'+query).toPromise();
    if(invoices == undefined) return [];
    return invoices;
  }

  async add(invoice: Invoice): Promise<[]|undefined>{
    return this.http.post<[]>('http://localhost:8080/invoices', invoice).toPromise();
  }

}


