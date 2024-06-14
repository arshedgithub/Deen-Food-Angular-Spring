import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Ingcategory} from "../entity/ingcategory";
import {query} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})

export class IngredientCategoryService {

  constructor(private http: HttpClient) {  }

  async getAllList(qry: string): Promise<Array<Ingcategory>> {
    const categories = await this.http.get<Array<Ingcategory>>('http://localhost:8080/ingcategories/list' + qry).toPromise();
    if(categories == undefined){
      return [];
    }
    return categories;
  }

}


