import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Prodorderstatus} from "../entity/prodorderstatus";

@Injectable({
  providedIn: 'root'
})

export class ProdOrderStatusService {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Prodorderstatus>> {
    const prodorderstatuses = await this.http.get<Array<Prodorderstatus>>('http://localhost:8080/productionorderstatuses/list').toPromise();
    if(prodorderstatuses == undefined){
      return [];
    }
    return prodorderstatuses;
  }

}
