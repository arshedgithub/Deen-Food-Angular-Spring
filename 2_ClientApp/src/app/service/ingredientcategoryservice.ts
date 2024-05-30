import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Ingcategory} from "../entity/ingcategory";

@Injectable({
  providedIn: 'root'
})

export class IngredientCategoryService {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Ingcategory>> {
    const categories = await this.http.get<Array<Ingcategory>>('http://localhost:8080/ingcategories/list').toPromise();
    if(categories == undefined){
      return [];
    }
    return categories;
  }

}


