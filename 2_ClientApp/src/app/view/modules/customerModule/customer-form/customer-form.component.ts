import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Employee} from "../../../../entity/employee";
import {Gender} from "../../../../entity/gender";
import {UiAssist} from "../../../../util/ui/ui.assist";
import {EmployeeService} from "../../../../service/employeeservice";
import {GenderService} from "../../../../service/genderservice";
import {RegexService} from "../../../../service/regexservice";
import {DatePipe} from "@angular/common";
import {MessageComponent} from "../../../../util/dialog/message/message.component";
import {ConfirmComponent} from "../../../../util/dialog/confirm/confirm.component";
import {Customer} from "../../../../entity/customer";
import {Customerstatus} from "../../../../entity/customerstatus";
import {CustomerstatusService} from "../../../../service/customerstatusservice";
import {CustomerService} from "../../../../service/customerservice";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent {
  public form!: FormGroup;
  customer!: Customer;
  oldCustomer!: Customer;

  popupTitle: any;
  selectedrow!: Customer;

  genders: Array<Gender> = [];
  employees: Array<Employee> = [];
  customerstatuses: Array<Customerstatus> = [];

  regexes: any;

  uiassist: UiAssist;

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.rs.get('customers').then((regs: []) => {
      this.regexes = regs;
      this.createForm();
    });

    this.popupTitle = this.data.title;

    const genderLoad = this.gs.getAllList().then((gens: Gender[]) => {
      this.genders = gens;
    });

    const statusLoad = this.ss.getAllList().then((stes: Customerstatus[]) => {
      this.customerstatuses = stes;
    });

    const employeeLoad = this.es.getAll("").then((employees: Employee[]) => {
      this.employees = employees;
    });

    if (this.popupTitle == "Edit Customer") {
      Promise.all([genderLoad, statusLoad, employeeLoad])
          .then(() => this.fillForm(this.data.customer));
    }
  }

  constructor(
      private cs: CustomerService,
      private es: EmployeeService,
      private gs: GenderService,
      private ss: CustomerstatusService,
      private dg: MatDialog,
      private rs: RegexService,
      private fb: FormBuilder,
      private dp: DatePipe,
      public dialogRef: MatDialogRef<CustomerFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.uiassist = new UiAssist(this);

    this.form = this.fb.group({
      "customernumber": new FormControl('', [Validators.required]),
      "fullname": new FormControl('', [Validators.required]),
      "callingname": new FormControl('', [Validators.required]),
      "gender": new FormControl('', [Validators.required]),
      "contact": new FormControl('', [Validators.required]),
      "email": new FormControl('', [Validators.required]),
      "description": new FormControl('', [Validators.required]),
      "address": new FormControl('', [Validators.required]),
      "doassignment": new FormControl({value: new Date(), disabled: false}, [Validators.required]),
      "customerstatus": new FormControl('', [Validators.required]),
      "employee": new FormControl('', [Validators.required]),
    }, {updateOn: 'change'});
  }

  createForm() {
    this.form.controls['customernumber'].setValidators([Validators.required]);
    this.form.controls['fullname'].setValidators([Validators.required, Validators.pattern(this.regexes['fullname']['regex'])]);
    this.form.controls['callingname'].setValidators([Validators.required]);
    this.form.controls['gender'].setValidators([Validators.required]);
    this.form.controls['contact'].setValidators([Validators.required, Validators.pattern(this.regexes['contact']['regex'])]);
    this.form.controls['email'].setValidators([Validators.required, Validators.pattern(this.regexes['email']['regex'])]);
    this.form.controls['description'].setValidators([Validators.required, Validators.pattern(this.regexes['description']['regex'])]);
    this.form.controls['address'].setValidators([Validators.required]);
    this.form.controls['doassignment'].setValidators([Validators.required]);
    this.form.controls['customerstatus'].setValidators([Validators.required]);
    this.form.controls['employee'].setValidators([Validators.required]);

    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {
            // @ts-ignore
            if (controlName == "doassignment")
              value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

            if (this.oldCustomer != undefined && control.valid) {
              // @ts-ignore
              if (value === this.customer[controlName]) {
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

  add() {

    let errors = this.getErrors();
    if (errors != "") {
      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Customer Add ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => {
        if (!result) {
          return;
        }
      });
    } else {

      this.customer = this.form.getRawValue();
      let customerData: string = "";

      customerData = customerData + "<br>Number is : " + this.customer.customernumber;
      customerData = customerData + "<br>Fullname is : " + this.customer.fullname;
      customerData = customerData + "<br>Callingname is : " + this.customer.callingname;

      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Customer Add",
          message: "Are you sure to Add the following Customer? <br> <br>" + customerData
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found";

      confirm.afterClosed().subscribe(async result => {
        if (result) {
          // console.log("CustomerService.add(emp)");

          this.cs.add(this.customer).then((responce: [] | undefined) => {
            //console.log("Res-" + responce);
            //console.log("Un-" + responce == undefined);
            if (responce != undefined) { // @ts-ignore
              console.log("Add-" + responce['id'] + "-" + responce['url'] + "-" + (responce['errors'] == ""));
              // @ts-ignore
              addstatus = responce['errors'] == "";
              console.log("Add Sta-" + addstatus);
              if (!addstatus) { // @ts-ignore
                addmessage = responce['errors'];
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
              Object.values(this.form.controls).forEach(control => {
                control.markAsTouched();
              });
              // loadTable("");
            }

            const stsmsg = this.dg.open(MessageComponent, {
              width: '500px',
              data: {heading: "Status -Customer Add", message: addmessage}
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

  fillForm(customer: Customer) {

    this.selectedrow = customer;
    this.customer = JSON.parse(JSON.stringify(customer));
    this.oldCustomer = JSON.parse(JSON.stringify(customer));
    // @ts-ignore
    this.customer.gender = this.genders.find(g => g.id === this.customer.gender.id);
    //@ts-ignore
    this.customer.customerstatus = this.customerstatuses.find(s => s.id === this.customer.customerstatus.id);
    //@ts-ignore
    this.customer.employee = this.employees.find(s => s.id === this.customer.employee.id);

    this.form.patchValue(this.customer);
    this.form.markAsPristine();
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
      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Customer Update ", message: "You have following Errors <br> " + errors}
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

        const confirm = this.dg.open(ConfirmComponent, {
          width: '500px',
          data: {
            heading: "Confirmation - Customer Update",
            message: "Are you sure to Save folowing Updates? <br> <br>" + updates
          }
        });
        confirm.afterClosed().subscribe(async result => {
          if (result) {
            //console.log("CustomerService.update()");
            this.customer = this.form.getRawValue();
            this.customer.id = this.oldCustomer.id;

            this.cs.update(this.customer).then((responce: [] | undefined) => {
              //console.log("Res-" + responce);
              // console.log("Un-" + responce == undefined);
              if (responce != undefined) { // @ts-ignore
                //console.log("Add-" + responce['id'] + "-" + responce['url'] + "-" + (responce['errors'] == ""));
                // @ts-ignore
                updstatus = responce['errors'] == "";
                //console.log("Upd Sta-" + updstatus);
                if (!updstatus) { // @ts-ignore
                  updmessage = responce['errors'];
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
                Object.values(this.form.controls).forEach(control => {
                  control.markAsTouched();
                });
                // this.loadTable("");
              }

              const stsmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Status -Customer Add", message: updmessage}
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

        const updmsg = this.dg.open(MessageComponent, {
          width: '500px',
          data: {heading: "Confirmation - Customer Update", message: "Nothing Changed"}
        });
        updmsg.afterClosed().subscribe(async result => {
          if (!result) {
            return;
          }
        });

      }
    }
  }

  clear(): void {
    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Customer Clear",
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
