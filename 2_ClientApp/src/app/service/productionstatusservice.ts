import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Product} from "../entity/product";
import {Productstatus} from "../entity/productstatus";
import {Productionstatus} from "../entity/productionstatus";

@Injectable({
  providedIn: 'root'
})

export class Productstatusservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Productionstatus>> {

    const productstatuses = await this.http.get<Array<Productionstatus>>('http://localhost:8080/productionstatuses/list').toPromise();
    if(productstatuses == undefined){
      return [];
    }
    return productstatuses;
  }

}


