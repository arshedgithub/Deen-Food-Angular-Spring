import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Postatus} from "../entity/postatus";
import {Paytype} from "../entity/paytype";
import {Paystatus} from "../entity/paystatus";

@Injectable({
  providedIn: 'root'
})

export class PaystatusService {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Paytype>> {

    const paystatuses = await this.http.get<Array<Paystatus>>('http://localhost:8080/paystatuses/list').toPromise();
    if(paystatuses == undefined) return [];
    return paystatuses;
  }

}


