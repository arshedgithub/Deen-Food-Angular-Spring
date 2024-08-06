import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PurchaseOrder} from "../entity/purchaseOrder";

@Injectable({
  providedIn: 'root'
})

export class PurchaseOrderService {

  constructor(private http: HttpClient) {  }

  async getAll(query: string): Promise<Array<PurchaseOrder>> {
    const purorders = await this.http.get<Array<PurchaseOrder>>('http://localhost:8080/purchaseorders' + query).toPromise();
    if (purorders == undefined) {
      return [];
    }
    return purorders;
  }

  async add(purorder: PurchaseOrder): Promise<[] | undefined> {
    return this.http.post<[]>('http://localhost:8080/purchaseorders', purorder).toPromise();
  }

  async update(purorder: PurchaseOrder): Promise<[] | undefined> {
    return this.http.put<[]>('http://localhost:8080/purchaseorders', purorder).toPromise();
  }

  async delete(id: number): Promise<[] | undefined> {
    // @ts-ignore
    return this.http.delete('http://localhost:8080/purchaseorders/' + id).toPromise();
  }

}


