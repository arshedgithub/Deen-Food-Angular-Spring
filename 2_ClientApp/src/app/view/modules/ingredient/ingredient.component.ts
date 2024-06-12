import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UiAssist} from "../../../util/ui/ui.assist";
import {IngredientService} from "../../../service/ingredientservice";
import {Ingredient} from "../../../entity/ingredient";
import {Ingstatus} from "../../../entity/ingstatus";
import {Brand} from "../../../entity/brand";
import {Ingcategory} from "../../../entity/ingcategory";
import {IngredientStatusService} from "../../../service/ingredientstatusservice";
import {IngredientCategoryService} from "../../../service/ingredientcategoryservice";
import {BrandService} from "../../../service/brandservice";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {MatDialog} from "@angular/material/dialog";
import {RegexService} from "../../../service/regexservice";
import {UnittypeService} from "../../../service/unittypeservice";
import {Unittype} from "../../../entity/unittype";
import {Employee} from "../../../entity/employee";
import {EmployeeService} from "../../../service/employeeservice";

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

  ingredientStatuses: Array<Ingstatus> = [];
  ingredientCategories: Array<Ingcategory> = [];
  brands: Array<Brand> = [];
  unittypes: Array<Unittype> = [];
  employees: Array<Employee> = [];

  constructor(
    private is: IngredientService,
    private fb: FormBuilder,
    private ingStat: IngredientStatusService,
    private ingcat: IngredientCategoryService,
    private br: BrandService,
    private uns: UnittypeService,
    private rxs: RegexService,
    private emps: EmployeeService,
    private dialog: MatDialog
  ){

    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      'csid': new FormControl(),
      'csname': new FormControl(),
      'csbrand': new FormControl(),
      'csqoh': new FormControl(),
      'csrop': new FormControl(),
      'cscost': new FormControl(),
    });

    this.ssearch = this.fb.group({
      'ssname': new FormControl(),
      'ssbrand': new FormControl(),
      'ssingcategory': new FormControl(),
      'ssingstatus': new FormControl()
    });

    this.form = this.fb.group({
      'ingcategory': new FormControl('', Validators.required),
      'brand': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'photo': new FormControl('', Validators.required),
      'unittype': new FormControl('', Validators.required),
      'qoh': new FormControl('', Validators.required),
      'rop': new FormControl('', Validators.required),
      'cost': new FormControl('', Validators.required),
      'ingstatus': new FormControl('', Validators.required),
      'dointroduced': new FormControl('', Validators.required),
      'employee': new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.createView();

    this.ingStat.getAllList().then((ingstats: Ingstatus[]) => {this.ingredientStatuses = ingstats});
    this.ingcat.getAllList().then((ingcats: Ingcategory[]) => {this.ingredientCategories = ingcats});
    this.uns.getAllList("").then((units: Unittype[]) => {this.unittypes = units});
    this.emps.getAll("").then((employees: Employee[]) => {this.employees = employees});

    this.filterBrands();
    this.getItemName();
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

  filterBrands(): void {
    this.form.get("ingcategory")?.valueChanges.subscribe((cat: Ingcategory) => {
      let qry = '?categoryid=' + cat.id;
      this.br.getAllList(qry).then((brands: Brand[]) => {this.brands = brands});
    });
  }

  getItemName(): void {
    this.form.get("brand")?.valueChanges.subscribe((brand: Brand) => {
      this.form.get("name")?.setValue(brand.name);
    });
  }

}
