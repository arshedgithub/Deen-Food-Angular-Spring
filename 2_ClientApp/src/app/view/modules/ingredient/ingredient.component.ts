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

  columns: string[] = ['id', 'name', 'description', 'photo', 'qoh', 'rop', 'cost'];
  headers: string[] = ['Id', 'Name', 'Description', 'photo', 'Quantity', 'Point', 'Cost'];
  binders: string[] = ['id', 'name', 'description', 'photo', 'qoh', 'rop', 'cost'];

  cscolumns: string[] = ['csnumber', 'cscallingname', 'csgender', 'csdesignation', 'csname', 'csmodi'];
  csprompts: string[] = ['Search by Number', 'Search by Name', 'Search by Gender',
    'Search by Designation', 'Search by Full Name', 'Search by Modi'];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  ingredient!: Ingredient;

  selectedrow: any;

  ingredients: Array<Ingredient> = [];
  data!: MatTableDataSource<Ingredient>;
  imageurl: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  uiassist: UiAssist;

  constructor(private is: IngredientService, private fb: FormBuilder){

    this.uiassist = new UiAssist(this);

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

}
