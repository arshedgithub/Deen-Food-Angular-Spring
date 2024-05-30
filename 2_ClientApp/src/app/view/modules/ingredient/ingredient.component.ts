import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UiAssist} from "../../../util/ui/ui.assist";
import {MatDialog} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {AuthorizationManager} from "../../../service/authorizationmanager";
import {IngredientService} from "../../../service/ingredientservice";
import {Ingredient} from "../../../entity/ingredient";

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent {

  columns: string[] = ['id', 'name', 'brand_id', 'qoh', 'rop', 'cost'];
  headers: string[] = ['Id', 'Name', 'Brand', 'Quantity', 'Re-Order Point', 'Cost'];
  binders: string[] = ['id', 'name', 'brand.name', 'qoh', 'rop', 'cost'];

  cscolumns: string[] = ['csid', 'csname', 'csbrand', 'csqoh', 'csrop', 'cscost' ];
  csprompts: string[] = ['Search by Id', 'Search by Name', 'Search By Brand', 'Search by quantity', 'Search by Reorder Point ', 'Search by Cost'];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  ingredient!: Ingredient;

  ingredients: Array<Ingredient> = [];
  data!: MatTableDataSource<Ingredient>;
  imageurl: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  uiassist: UiAssist;

  constructor(private is: IngredientService, private fb: FormBuilder){

    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      'csid': new FormControl(),
      'csname': new FormControl(),
      'csbrand': new FormControl(),
      'csqoh': new FormControl(),
      'csrop': new FormControl(),
      'cscost': new FormControl(),
    })

  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.createView();
  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }

  loadTable(query: string) {

    this.is.getAll(query)
      .then((ings: Ingredient[]) => {
        this.ingredients = ings;
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.ingredients);
        this.data.paginator = this.paginator;
      });

  }

  filterTable():void {
    const cssearchdata = this.csearch.getRawValue();


    console.log(cssearchdata);

    this.data.filterPredicate = ((ingredient: Ingredient, filter: string) => {
      return (cssearchdata.csid == null || ingredient.id.toString().includes(cssearchdata.csid)) &&
        (cssearchdata.csname == null || ingredient.name.includes(cssearchdata.csname)) &&
        (cssearchdata.csbrand == null || ingredient.brand.name.includes(cssearchdata.csbrand)) &&
        (cssearchdata.csqoh == null || ingredient.qoh.toString().includes(cssearchdata.csqoh)) &&
        (cssearchdata.csrop == null || ingredient.rop.toString().includes(cssearchdata.csrop)) &&
        (cssearchdata.cscost == null || ingredient.cost.toString().includes(cssearchdata.cscost));
    });
    this.data.filter = "xx";
  }

}
