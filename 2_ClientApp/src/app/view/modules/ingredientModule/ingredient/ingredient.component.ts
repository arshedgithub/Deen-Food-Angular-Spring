import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UiAssist} from "../../../../util/ui/ui.assist";
import {IngredientService} from "../../../../service/ingredientservice";
import {Ingredient} from "../../../../entity/ingredient";
import {Ingstatus} from "../../../../entity/ingstatus";
import {Brand} from "../../../../entity/brand";
import {Ingcategory} from "../../../../entity/ingcategory";
import {IngredientStatusService} from "../../../../service/ingredientstatusservice";
import {IngredientCategoryService} from "../../../../service/ingredientcategoryservice";
import {BrandService} from "../../../../service/brandservice";
import {ConfirmComponent} from "../../../../util/dialog/confirm/confirm.component";
import {MatDialog} from "@angular/material/dialog";
import {MessageComponent} from "../../../../util/dialog/message/message.component";
import {IngredientFormComponent} from "../ingredient-form/ingredient-form.component";

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent {

  columns: string[] = ['id', 'name', 'brand_id', 'qoh', 'cost', 'edit', 'delete'];
  headers: string[] = ['Id', 'Name', 'Brand', 'Quantity', 'Cost', '', ''];
  binders: string[] = ['id', 'name', 'brand.name', 'qoh', 'cost', '', ''];

  cscolumns: string[] = ['csid', 'csname', 'csbrand', 'csqoh', 'cscost', 'csempty1', 'csempty2' ];
  csprompts: string[] = ['Search by Id', 'Search by Name', 'Search By Brand', 'Search by quantity', 'Search by Cost'];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  enaadd: boolean = false;
  enaupd: boolean = false;
  enadel: boolean = false;

  ingredient!: Ingredient;

  ingredients: Array<Ingredient> = [];
  data!: MatTableDataSource<Ingredient>;
  imageurl: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  uiassist: UiAssist;

  ingredientStatuses: Array<Ingstatus> = [];
  ingredientCategories: Array<Ingcategory> = [];
  brands: Array<Brand> = [];

  constructor(
    private is: IngredientService,
    private fb: FormBuilder,
    private ingStat: IngredientStatusService,
    private ingCat: IngredientCategoryService,
    private ingBrand: BrandService,
    private dialog: MatDialog,
  ){

    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      'csid': new FormControl(),
      'csname': new FormControl(),
      'csbrand': new FormControl(),
      'csqoh': new FormControl(),
      'cscost': new FormControl(),
    });

    this.ssearch = this.fb.group({
      'ssname': new FormControl(),
      'ssbrand': new FormControl(),
      'ssingcategory': new FormControl(),
      'ssingstatus': new FormControl()
    });
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.createView();
    //
    this.ingStat.getAllList().then((ingstats: Ingstatus[]) => {this.ingredientStatuses = ingstats});
    this.ingCat.getAllList("").then((ingcats: Ingcategory[]) => {this.ingredientCategories = ingcats});
    this.ingBrand.getAllList("").then((ingBrands: Brand[]) => {this.brands = ingBrands});
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

  filterTable(): void {
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

  btnSearchMc(): void {

    const ssearchdata = this.ssearch.getRawValue();

    let name = ssearchdata.ssname;
    let brandid = ssearchdata.ssbrand;
    let categoryid = ssearchdata.ssingcategory;
    let ingstatusid = ssearchdata.ssingstatus;

    let query = "";

    if (name != null && name.trim() != "") query = query + "&ingredientname=" + name;
    if (categoryid != null) query = query + "&categoryid=" + categoryid;
    if (ingstatusid != null) query = query + "&ingredientstatusid=" + ingstatusid;
    if (brandid != null) query = query + "&ingredientbrandid=" + brandid;

    if (query != "") query = query.replace(/^./, "?")

    this.loadTable(query);

  }

  btnSearchClearMc(): void {

    const confirm = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: {heading: "Search Clear", message: "Are you sure to Clear the Search?"}
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        this.ssearch.reset();
        this.loadTable("");
      }
    });
  }

  delete(ingredient: Ingredient) {

    this.ingredient = ingredient;

    const confirm = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Ingredient Delete",
        message: "Are you sure to Delete following Employee? <br> <br>" + this.ingredient.name
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        let delstatus: boolean = false;
        let delmessage: string = "Server Not Found";

        this.is.delete(this.ingredient.id).then((response: [] | undefined) => {

          if (response != undefined) { // @ts-ignore
            delstatus = response['errors'] == "";
            if (!delstatus) { // @ts-ignore
              delmessage = response['errors'];
            }
          } else {
            delstatus = false;
            delmessage = "Content Not Found"
          }
        } ).finally(() => {
          if (delstatus) {
            delmessage = "Successfully Deleted";
            this.form.reset();
            // this.clearImage();
            Object.values(this.form.controls).forEach(control => { control.markAsTouched(); });
            this.loadTable("");
          }

          const stsmsg = this.dialog.open(MessageComponent, {
            width: '500px',
            data: {heading: "Status - Ingredient Delete ", message: delmessage}
          });
          stsmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

        });
      }
    });
  }

  openPopup(ingredient: any, title: any): void {
    var popup = this.dialog.open(IngredientFormComponent, {
      width: '400px',
      data: {
        title: title,
        ingredient: ingredient
      }
    });
    popup.afterClosed().subscribe(item => this.loadTable(""));
  }

  addIngredient(){
    this.openPopup(0, "Add Ingredient");
  }

  editIngredient(ingredient: Ingredient){
    this.openPopup(ingredient, "Edit Ingredient");
  }

}
