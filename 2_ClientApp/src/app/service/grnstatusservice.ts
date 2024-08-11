import {Gender} from "../entity/gender";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Grnstatus} from "../entity/grnstatus";

@Injectable({
  providedIn: 'root'
})

export class GrnStatusService {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Gender>> {

    const grnstatuses = await this.http.get<Array<Grnstatus>>('http://localhost:8080/grnstatuses/list').toPromise();
    if(grnstatuses == undefined){
      return [];
    }
    return grnstatuses;
  }

}


