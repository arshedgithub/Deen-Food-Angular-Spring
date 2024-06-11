import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Brand} from "../entity/brand";
import {Unittype} from "../entity/unittype";

@Injectable({
  providedIn: 'root'
})

export class UnittypeService {

  constructor(private http: HttpClient) {  }

  async getAllList(qry: string): Promise<Array<Unittype>> {
    const unittypes = await this.http.get<Array<Unittype>>('http://localhost:8080/unittypes/list' + qry).toPromise();
    if(unittypes == undefined){
      return [];
    }
    return unittypes;
  }

}


