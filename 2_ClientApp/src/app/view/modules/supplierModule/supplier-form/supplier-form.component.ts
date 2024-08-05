import {Component, Inject} from '@angular/core';
import {SupplierStatus} from "../../../../entity/supplierstatus";
import {Employee} from "../../../../entity/employee";
import {SupplierService} from "../../../../service/supplierservice";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SupplierstatusService} from "../../../../service/supplierstatusservice";
import {EmployeeService} from "../../../../service/employeeservice";
import {DatePipe} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RegexService} from "../../../../service/regexservice";
import {AuthorizationManager} from "../../../../service/authorizationmanager";
import {UiAssist} from "../../../../util/ui/ui.assist";
import {Supplier} from "../../../../entity/supplier";
import {MatTableDataSource} from "@angular/material/table";
import {MessageComponent} from "../../../../util/dialog/message/message.component";
import {ConfirmComponent} from "../../../../util/dialog/confirm/confirm.component";

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent {

  public form!: FormGroup;

  supplier!: Supplier;
  oldSupplier!: Supplier;
  suppliers: Array<Supplier> = [];
  supplierStatuses: Array<SupplierStatus> = [];
  employees: Array<Employee> = [];

  popupTitle: any;
  regexes: any;
  uiassist: UiAssist;

  constructor(
    private supService: SupplierService,
    private fb: FormBuilder,
    private supStatusService: SupplierstatusService,
    private employeeService: EmployeeService,
    private rxs: RegexService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    public authService:AuthorizationManager,
    public dialogRef: MatDialogRef<SupplierFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.uiassist = new UiAssist(this);

    this.form = this.fb.group({
      "name": new FormControl('', [Validators.required]),
      "regno": new FormControl('', [Validators.required]),
      "regyear": new FormControl('', [Validators.required]),
      "address": new FormControl('', [Validators.required]),
      "telephone": new FormControl('', [Validators.required]),
      "fax": new FormControl(''),
      "email": new FormControl('', [Validators.required]),
      "contactperson": new FormControl('', [Validators.required]),
      "contactmobile": new FormControl('', [Validators.required]),
      "creditlimit": new FormControl('', [Validators.required]),
      "description": new FormControl(''),
      "doregister": new FormControl({value: new Date(), disabled: false}, [Validators.required]),
      "supplierstatus": new FormControl('', [Validators.required]),
      "employee": new FormControl('', [Validators.required]),
    }, {updateOn: 'change'});

  }
  ngOnInit() {
    this.initialize();
  }

  initialize() {

    this.rxs.get('suppliers').then((regs: []) => {
      this.regexes = regs;
      this.createForm();
    });

    const loadStatuses = this.supStatusService.getAllList().then((statuses: SupplierStatus[]) => {
      this.supplierStatuses = statuses;
    });

    const loadEmployees = this.employeeService.getAllListNameId().then((employees: Employee[]) => {
      this.employees = employees;
    });

    this.popupTitle = this.data.title;
    if (this.popupTitle == "Edit Supplier") Promise.all([loadEmployees, loadStatuses]).then(() => this.fillForm(this.data.supplier));

  }

  createForm() {

    this.form.controls['name'].setValidators([Validators.required, Validators.pattern(this.regexes['name']['regex'])]);
    this.form.controls['regno'].setValidators([Validators.required, Validators.pattern(this.regexes['regno']['regex'])]);
    this.form.controls['regyear'].setValidators([Validators.required, Validators.pattern(this.regexes['regyear']['regex'])]);
    this.form.controls['address'].setValidators([Validators.required, Validators.pattern(this.regexes['address']['regex'])]);
    this.form.controls['telephone'].setValidators([Validators.required, Validators.pattern(this.regexes['telephone']['regex'])]);
    this.form.controls['email'].setValidators([Validators.required, Validators.pattern(this.regexes['email']['regex'])]);
    this.form.controls['contactperson'].setValidators([Validators.required]);
    this.form.controls['contactmobile'].setValidators([Validators.required, Validators.pattern(this.regexes['contactmobile']['regex'])]);
    this.form.controls['creditlimit'].setValidators([Validators.pattern(this.regexes['creditlimit']['regex'])]);
    this.form.controls['description'].setValidators([Validators.required,Validators.pattern(this.regexes['description']['regex'])]);
    this.form.controls['doregister'].setValidators([Validators.required, Validators.pattern(this.regexes['doregister']['regex'])]);
    this.form.controls['supplierstatus'].setValidators([Validators.required]);
    this.form.controls['employee'].setValidators([Validators.required]);

    Object.values(this.form.controls).forEach( control => { control.markAsTouched(); } );

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {
          // @ts-ignore
          if (controlName == "doregister")
            value = this.datePipe.transform(new Date(value), 'yyyy-MM-dd');

          if (this.oldSupplier != undefined && control.valid) {
            // @ts-ignore
            if (value === this.supplier[controlName]) {
              control.markAsPristine();
            } else {
              control.markAsDirty();
            }
          } else {
            control.markAsPristine();
          }
        }
      );

    }
    // this.enableButtons(true,false,false);

  }

  fillForm(supplier: Supplier) {

    // this.enableButtons(false,true,true);

    // console.log(this.selectedrow)
    this.supplier = JSON.parse(JSON.stringify(supplier));
    this.oldSupplier = JSON.parse(JSON.stringify(supplier));

    //@ts-ignore
    this.supplier.supplierstatus = this.supplierStatuses.find(s => s.id === this.supplier.supplierstatus.id);
    // @ts-ignore
    this.supplier.employee = this.employees.find(e => e.id === this.supplier.employee.id);
    this.supplier.doregister
    this.form.patchValue(this.supplier);
    this.form.markAsPristine();

  }

  add() {

    let addErr = ""
    let errors = this.getErrors();

    if (errors != "") { const errmsg = this.dialog.open(MessageComponent, {
      width: '500px',
      data: {heading: "Errors - Supplier Add ", message: "You have following Errors <br> " + errors}
    });
      errmsg.afterClosed().subscribe(async result => {
        if (!result) {
          return;
        }
      });
    } else {

      this.supplier = this.form.getRawValue();

      let supData: string = "";

      supData = supData + "<br>Reg. Number is : " + this.supplier.regno;
      supData = supData + "<br>Name is : " + this.supplier.name;

      const confirm = this.dialog.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Supplier Add",
          message: "Are you sure to Add the following supplier? <br> <br>" + supData
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found";

      confirm.afterClosed().subscribe(async result => {
        if (result) {

          this.supService.add(this.supplier).then((response: [] | undefined) => {
            if (response != undefined) { // @ts-ignore
              console.log("Add-" + response['id'] + "-" + response['url'] + "-" + (response['errors'] == ""));
              // @ts-ignore
              addstatus = response['errors'] == "";
              // @ts-ignore
              addErr = response['errors'];
              console.log(addErr);
              console.log("Add Sta-" + addstatus);
              if (!addstatus) {
                // @ts-ignore
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
              this.onCloseForm();
              Object.values(this.form.controls).forEach(control => {
                control.markAsTouched();
              });
              // this.loadTable("");
            }

            const stsmsg = this.dialog.open(MessageComponent, {
              width: '500px',
              data: {heading: "Status - Supplier Add", message: addmessage}
            });

            stsmsg.afterClosed().subscribe(async result => {
              if (!result) return;
            });
          });
        }
      });
    }
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

  getUpdates(): string {

    let updates: string = "";
    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      if (control.dirty) {
        updates = updates + "<br>" + controlName.charAt(0).toUpperCase() + controlName.slice(1)+" Changed";
      }
    }
    return updates;
  }

  update() {

    let errors = this.getErrors();

    if (errors != "") {

      const errmsg = this.dialog.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Supplier Update ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

    } else {

      let updates: string = this.getUpdates();

      if (updates != "") {

        let updstatus: boolean = false;
        let updmessage: string = "Server Not Found";

        const confirm = this.dialog.open(ConfirmComponent, {
          width: '500px',
          data: {
            heading: "Confirmation - Supplier Update",
            message: "Are you sure to Save folowing Updates? <br> <br>" + updates
          }
        });
        confirm.afterClosed().subscribe(async result => {
          if (result) {
            //console.log("EmployeeService.update()");
            this.supplier = this.form.getRawValue();
            this.supplier.id = this.oldSupplier.id;

            this.supService.update(this.supplier).then((response: [] | undefined) => {
              //console.log("Res-" + response);
              // console.log("Un-" + response == undefined);
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
            } ).finally(() => {
              if (updstatus) {
                updmessage = "Successfully Updated";
                this.form.reset();
                this.onCloseForm();

                Object.values(this.form.controls).forEach(control => { control.markAsTouched(); });
                // this.loadTable("");
              }

              const stsmsg = this.dialog.open(MessageComponent, {
                width: '500px',
                data: {heading: "Status - Supplier Add", message: updmessage}
              });
              stsmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

            });
          }
        });
      }
      else {

        const updmsg = this.dialog.open(MessageComponent, {
          width: '500px',
          data: {heading: "Confirmation - Supplier Update", message: "Nothing Changed"}
        });
        updmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

      }
    }
  }

  clear():void{
    const confirm = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Supplier Clear",
        message: "Are you sure to Clear following Details ? <br> <br>"
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        this.form.reset();
        this.onCloseForm();
      }
    });
  }

  onCloseForm(): void {
    this.dialogRef.close();
  }

}
