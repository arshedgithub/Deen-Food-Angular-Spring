import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Ingredient} from "../entity/ingredient";

@Injectable({
  providedIn: 'root'
})

export class IngredientService {

  constructor(private http: HttpClient) {  }

  async getAll(query:string): Promise<Array<Ingredient>> {
    const ingredients = await this.http.get<Array<Ingredient>>('http://localhost:8080/ingredients'+query).toPromise();
    if(ingredients == undefined){
      return [];
    }
    return ingredients;
  }

  async add(ingredient: Ingredient): Promise<[]|undefined>{
    return this.http.post<[]>('http://localhost:8080/ingredients', ingredient).toPromise();
  }

  async update(ingredient: Ingredient): Promise<[]|undefined>{
    return this.http.put<[]>('http://localhost:8080/ingredients', ingredient).toPromise();
  }

  async delete(id: number): Promise<[]|undefined>{
    // @ts-ignore
    return this.http.delete('http://localhost:8080/ingredients/' + id).toPromise();
  }

}


