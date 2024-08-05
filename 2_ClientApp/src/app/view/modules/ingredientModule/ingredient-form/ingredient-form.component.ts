import {Component, Inject, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Ingredient} from "../../../../entity/ingredient";
import {ConfirmComponent} from "../../../../util/dialog/confirm/confirm.component";
import {Ingcategory} from "../../../../entity/ingcategory";
import {Brand} from "../../../../entity/brand";
import {MessageComponent} from "../../../../util/dialog/message/message.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Ingstatus} from "../../../../entity/ingstatus";
import {Unittype} from "../../../../entity/unittype";
import {Employee} from "../../../../entity/employee";
import {IngredientService} from "../../../../service/ingredientservice";
import {IngredientStatusService} from "../../../../service/ingredientstatusservice";
import {IngredientCategoryService} from "../../../../service/ingredientcategoryservice";
import {BrandService} from "../../../../service/brandservice";
import {UnittypeService} from "../../../../service/unittypeservice";
import {RegexService} from "../../../../service/regexservice";
import {EmployeeService} from "../../../../service/employeeservice";
import {DatePipe} from "@angular/common";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UiAssist} from "../../../../util/ui/ui.assist";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.css']
})
export class IngredientFormComponent {

  public form!: FormGroup;

  // enaadd: boolean = false;
  // enaupd: boolean = false;
  // enadel: boolean = false;

  ingredient!: Ingredient;
  oldingredient!: Ingredient;

  ingredients: Array<Ingredient> = [];
  imageingurl: string = 'assets/default.png';

  popupTitle: any;
  regexes!: any;
  col!: {[p: string]: any;}
  itemNameSubs!: Subscription;
  selectedRow!: any;

  ingredientStatuses: Array<Ingstatus> = [];
  ingredientCategories: Array<Ingcategory> = [];
  brands: Array<Brand> = [];
  unittypes: Array<Unittype> = [];
  employees: Array<Employee> = [];

  ngOnInit() {
    this.initialize();
  }

  initialize() {

    const loadStatus = this.ingStat.getAllList().then((ingstats: Ingstatus[]) => {
      this.ingredientStatuses = ingstats
    });
    const loadCategories = this.ingcat.getAllList("").then((ingcats: Ingcategory[]) => {
      this.ingredientCategories = ingcats
    });
    const loadUnits = this.uns.getAllList("").then((units: Unittype[]) => {
      this.unittypes = units
    });
    const loadEmployees = this.emps.getAll("").then((employees: Employee[]) => {
      this.employees = employees
    });

    this.rxs.get("ingredients").then((regexs: []) => {
      this.regexes = regexs;
      this.createForm();
    });

    this.popupTitle = this.data.title;
    if (this.popupTitle == "Edit Ingredient") Promise.all([loadStatus, loadEmployees, loadCategories, loadUnits]).then(() => this.fillForm(this.data.ingredient))


    this.filterBrands();
    this.getItemName();
    this.changeRadioColor();
  }

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
    public dialogRef: MatDialogRef<IngredientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

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

    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });

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
    // this.enableButtons(true, false, false);
  }

  // enableButtons(add: boolean, upd: boolean, del: boolean) {
  //   this.enaadd = add;
  //   this.enaupd = upd;
  //   this.enadel = del;
  // }


  filterBrands(): void {
    this.form.get("ingcategory")?.valueChanges.subscribe((cat: Ingcategory) => {
      let qry = '?categoryid=' + cat.id;
      this.br.getAllList(qry).then((brands: Brand[]) => {
        this.brands = brands
      });
    });
  }

  getItemName(): void {
    // @ts-ignore
    this.itemNameSubs = this.form.get("brand")?.valueChanges.subscribe((brand: Brand) => {
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

          this.is.add(this.ingredient).then((response: [] | undefined) => {
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
              this.onCloseForm();

              Object.values(this.form.controls).forEach(control => {
                control.markAsTouched();
              });
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

  clear(): void {
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

  fillForm(ingredient: Ingredient) {

    this.selectedRow = ingredient;
    this.ingredient = JSON.parse(JSON.stringify(ingredient));
    this.oldingredient = JSON.parse(JSON.stringify(ingredient));

    console.log("Row : ", this.selectedRow);
    console.log(this.ingredient);

    if (this.ingredient.photo != null) {
      this.imageingurl = atob(this.ingredient.photo);
      this.form.controls['photo'].clearValidators();
    } else {
      this.clearImage();
    }
    this.ingredient.photo = "";
    this.itemNameSubs.unsubscribe();

    this.form.get("ingcategory")?.valueChanges.subscribe((category: Ingcategory) => {
      let qry = "?categoryid=" + category.id;
      this.br.getAllList(qry).then((brands: Brand[]) => {
        // console.log(brands)
        this.brands = brands;
        // @ts-ignore
        // this.ingredient.brand = this.brands.find(b => {
        //   console.log(b, this.ingredient)
        //   b.id === this.ingredient.brand.id   // brand undefined
        // });
        // @ts-ignore
        this.ingredient.unittype = this.unittypes.find(u => u.id === this.ingredient.unittype.id);
        // @ts-ignore
        this.ingredient.ingstatus = this.ingredientStatuses.find(i => i.id === this.ingredient.ingstatus.id);
        // @ts-ignore
        this.ingredient.employee = this.employees.find(e => e.id === this.ingredient.employee.id);
        // @ts-ignore
        this.ingredient.brand = this.brands.find(e => e.id === this.ingredient.brand.id);

        this.form.patchValue(this.ingredient);
        this.form.markAsPristine();

        // this.enableButtons(false, true, true);

      });
    });
    // @ts-ignore
    this.ingredient.ingcategory = this.ingredientCategories.find(c => c.id === this.ingredient.ingcategory.id);
    this.form.controls['ingcategory'].setValue(this.ingredient.ingcategory);
  }

  getUpdates(): string {

    let updates: string = "";
    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      if (control.dirty) {
        updates = updates + "<br>" + controlName.charAt(0).toUpperCase() + controlName.slice(1) + " Changed";
      }
    }
    return updates;
  }

  update() {

    let errors = this.getErrors();

    if (errors != "") {

      const errmsg = this.dialog.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Ingredient Update ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => {
        if (!result) {
          return;
        }
      });

    } else {

      let updates: string = this.getUpdates();

      if (updates != "") {

        let updstatus: boolean = false;
        let updmessage: string = "Server Not Found";

        const confirm = this.dialog.open(ConfirmComponent, {
          width: '500px',
          data: {
            heading: "Confirmation - Ingredient Update",
            message: "Are you sure to Save folowing Updates? <br> <br>" + updates
          }
        });
        confirm.afterClosed().subscribe(async result => {
          if (result) {
            //console.log("EmployeeService.update()");
            this.ingredient = this.form.getRawValue();
            if (this.form.controls['photo'].dirty) this.ingredient.photo = btoa(this.imageingurl);
            else this.ingredient.photo = this.oldingredient.photo;
            this.ingredient.id = this.oldingredient.id;

            this.is.update(this.ingredient).then((response: [] | undefined) => {
              if (response != undefined) { // @ts-ignore
                //console.log("Add-" + response['id'] + "-" + response['url'] + "-" + (response['errors'] == ""));
                // @ts-ignore
                updstatus = response['errors'] == "";
                //console.log("Upd Sta-" + updstatus);
                if (!updstatus) { // @ts-ignore
                  updmessage = response['errors'];
                }
              } else {
                //console.log("undefined");
                updstatus = false;
                updmessage = "Content Not Found"
              }
            }).finally(() => {
              if (updstatus) {
                updmessage = "Successfully Updated";
                this.form.reset();
                this.clearImage();
                this.onCloseForm();
                Object.values(this.form.controls).forEach(control => {
                  control.markAsTouched();
                });
                // this.loadTable("");
              }

              const stsmsg = this.dialog.open(MessageComponent, {
                width: '500px',
                data: {heading: "Status -Ingredient Add", message: updmessage}
              });
              stsmsg.afterClosed().subscribe(async result => {
                if (!result) {
                  return;
                }
              });

            });
          }
        });
      } else {

        const updmsg = this.dialog.open(MessageComponent, {
          width: '500px',
          data: {heading: "Confirmation - Ingredient Update", message: "Nothing Changed"}
        });
        updmsg.afterClosed().subscribe(async result => {
          if (!result) {
            return;
          }
        });

      }
    }
  }

  onCloseForm(){
    this.dialogRef.close();
  }


}
