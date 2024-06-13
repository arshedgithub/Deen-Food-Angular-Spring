import {CountByDesignation} from "./entity/countByDesignation";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IngCountByCategory} from "./entity/ingCountByCategory";

@Injectable({
  providedIn: 'root'
})

export class ReportService {

  constructor(private http: HttpClient) {  }

  async countByDesignation(): Promise<Array<CountByDesignation>> {

    const countbydesignations = await this.http.get<Array<CountByDesignation>>('http://localhost:8080/reports/countbydesignation').toPromise();
    if(countbydesignations == undefined){
      return [];
    }
    return countbydesignations;
  }

  async ingCountByCategory(): Promise<Array<IngCountByCategory>> {

    const ingCountByCategories = await this.http.get<Array<IngCountByCategory>>('http://localhost:8080/reports/ingredientcountbycategory').toPromise();
    if(ingCountByCategories == undefined){
      return [];
    }
    return ingCountByCategories;
  }

}


