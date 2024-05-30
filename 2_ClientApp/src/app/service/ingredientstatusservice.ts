import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Ingstatus} from "../entity/ingstatus";

@Injectable({
  providedIn: 'root'
})

export class IngredientStatusService {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Ingstatus>> {
    const ingredientStatuses = await this.http.get<Array<Ingstatus>>('http://localhost:8080/ingstatuses/list').toPromise();
    if(ingredientStatuses == undefined){
      return [];
    }
    return ingredientStatuses;
  }

}


