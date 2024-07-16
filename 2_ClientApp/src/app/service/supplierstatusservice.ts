import {Gender} from "../entity/gender";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Userstatus} from "../entity/userstatus";
import {SupplierStatus} from "../entity/supplierstatus";

@Injectable({
  providedIn: 'root'
})

export class SupplierstatusService {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Userstatus>> {

    const supplierStatuses = await this.http.get<Array<SupplierStatus>>('http://localhost:8080/supplierstatuses/list').toPromise();
    if(supplierStatuses == undefined){
      return [];
    }
    return supplierStatuses;
  }

}


