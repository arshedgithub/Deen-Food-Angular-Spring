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
import {DatePipe} from "@angular/common";
import {MessageComponent} from "../../../util/dialog/message/message.component";

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

  enaadd: boolean = false;
  enaupd: boolean = false;
  enadel: boolean = false;

  ingredient!: Ingredient;
  oldingredient!: Ingredient;

  ingredients: Array<Ingredient> = [];
  data!: MatTableDataSource<Ingredient>;
  imageurl: string = '';
  imageingurl: string = 'assets/default.png';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  regexes!: any;
  uiassist: UiAssist;
  col!: {[p: string]: any;}

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
    private dialog: MatDialog,
    private dp: DatePipe,
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
      'dointroduced': new FormControl({value: new Date(), disabled: false}, Validators.required),
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

    this.rxs.get("ingredients").then((regexs: []) => {
      this.regexes = regexs;
      this.createForm();
    });

    this.filterBrands();
    this.getItemName();
    this.changeRadioColor();
  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }

  createForm(): void {
    this.form.controls['ingcategory'].setValidators([Validators.required]);
    this.form.controls['brand'].setValidators([Validators.required]);
    this.form.controls['name'].setValidators([Validators.required, Validators.pattern(this.regexes['name']['regex'])]);
    this.form.controls['unittype'].setValidators([Validators.required]);
    this.form.controls['description'].setValidators([Validators.required]);
    this.form.controls['photo'].setValidators([Validators.required]);
    this.form.controls['qoh'].setValidators([Validators.required, Validators.pattern(this.regexes['qoh']['regex'])]);
    this.form.controls['rop'].setValidators([Validators.required, Validators.pattern(this.regexes['rop']['regex'])]);
    this.form.controls['cost'].setValidators([Validators.required, Validators.pattern(this.regexes['cost']['regex'])]);
    this.form.controls['ingstatus'].setValidators([Validators.required]);
    this.form.controls['dointroduced'].setValidators([Validators.required, Validators.pattern(this.regexes['dointroduced']['regex'])]);
    this.form.controls['employee'].setValidators([Validators.required]);

    Object.values(this.form.controls).forEach( control => { control.markAsTouched(); } );

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {
          // @ts-ignore
          if (controlName == "dointroduced")
            value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

          if (this.oldingredient != undefined && control.valid) {
            // @ts-ignore
            if (value === this.ingredient[controlName]) {
              control.markAsPristine();
            } else {
              control.markAsDirty();
            }
          } else {
            control.markAsPristine();
          }
      });
    }
    this.enableButtons(true,false,false);
  }

  enableButtons(add:boolean, upd:boolean, del:boolean){
    this.enaadd=add;
    this.enaupd=upd;
    this.enadel=del;
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

  changeRadioColor(): void {
    this.form.get("unittype")?.valueChanges.subscribe(() => {
      let sts = this.form.get("unittype")?.invalid;
      if (!sts) this.col = {"border": "1px solid grey"}
      else this.col = {"border": "1px solid #e15959"}
    });
  }

  selectImage(e: any): void {
    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imageingurl = event.target.result;
        this.form.controls['photo'].clearValidators();
      }
    }
  }

  clearImage(): void {
    this.imageingurl = 'assets/default.png';
    this.form.controls['photo'].setErrors({'required': true});
  }

  getErrors(): string {
    let errors: string = "";

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      if (control.errors) {
        if (this.regexes[controlName] != undefined) {
          errors = errors + "<br>" + this.regexes[controlName]['message'];
        } else {
          errors = errors + "<br>Invalid " + controlName;
        }
      }
    }
    return errors;
  }

  add() {

    let errors = this.getErrors();

    if (errors != "") {
      const errmsg = this.dialog.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Ingredient Add ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => {
        if (!result) {
          return;
        }
      });
    } else {

      this.ingredient = this.form.getRawValue();
      this.ingredient.photo = btoa(this.imageingurl);

      let ingdata: string = "";

      ingdata = ingdata + "<br>Name is : " + this.ingredient.name;
      ingdata = ingdata + "<br>" + this.ingredient.description;

      const confirm = this.dialog.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Ingredient Add",
          message: "Are you sure to Add the following Ingredient? <br> <br>" + ingdata
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found";

      confirm.afterClosed().subscribe(async result => {
        if (result) {
          // console.log("EmployeeService.add(emp)");

          this.is.add(this.ingredient).then((response: [] | undefined) => {
            //console.log("Res-" + response);
            //console.log("Un-" + response == undefined);
            if (response != undefined) { // @ts-ignore
              console.log("Add-" + response['id'] + "-" + response['url'] + "-" + (response['errors'] == ""));
              // @ts-ignore
              addstatus = response['errors'] == "";
              console.log("Add Sta-" + addstatus);
              if (!addstatus) { // @ts-ignore
                addmessage = response['errors'];
              }
            } else {
              console.log("undefined");
              addstatus = false;
              addmessage = "Content Not Found"
            }
          }).finally(() => {

            if (addstatus) {
              addmessage = "Successfully Saved";
              this.form.reset();
              this.clearImage();
              Object.values(this.form.controls).forEach(control => {
                control.markAsTouched();
              });
              this.loadTable("");
            }

            const stsmsg = this.dialog.open(MessageComponent, {
              width: '500px',
              data: {heading: "Status -Ingredient Add", message: addmessage}
            });

            stsmsg.afterClosed().subscribe(async result => {
              if (!result) {
                return;
              }
            });
          });
        }
      });
    }
  }
  clear():void{
    const confirm = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Ingredient Clear",
        message: "Are you sure to Clear following Details ? <br> <br>"
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        this.form.reset()
      }
    });
  }

}
