import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Supplier} from "../../../entity/supplier";
import {UiAssist} from "../../../util/ui/ui.assist";
import {AuthorizationManager} from "../../../service/authorizationmanager";
import {SupplierService} from "../../../service/supplierservice";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {SupplierStatus} from "../../../entity/supplierstatus";
import {Employee} from "../../../entity/employee";
import {SupplierstatusService} from "../../../service/supplierstatusservice";
import {EmployeeService} from "../../../service/employeeservice";
import {DatePipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {MessageComponent} from "../../../util/dialog/message/message.component";
import {RegexService} from "../../../service/regexservice";

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {

  columns: string[] = ['regno', 'name', 'telephone', 'supplierstatus', 'employee'];
  headers: string[] = ['Reg. No', 'Name', 'Telephone', 'Supplier Status', 'Employee'];
  binders: string[] = ['regno', 'name', 'telephone', 'supplierstatus.name', 'employee.fullname'];

  cscolumns: string[] = ['csRegNo', 'csName', 'csTelephone', 'csSupplierStatus', 'csEmployee'];
  csprompts: string[] = ['Search by Registration Number', 'Search by Name', 'Search by Telephone',
    'Search by Supplier Status', 'Search by Employee'];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  supplier!: Supplier;
  oldSupplier!: Supplier;

  selectedrow: any;

  suppliers: Array<Supplier> = [];
  data!: MatTableDataSource<Supplier>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  imageurl: string = '';

  enaadd:boolean = false;
  enaupd:boolean = false;
  enadel:boolean = false;

  supplierStatuses: Array<SupplierStatus> = [];
  employees: Array<Employee> = [];

  regexes: any;

  uiassist: UiAssist;

  constructor(
    private supService: SupplierService,
    private fb: FormBuilder,
    private supStatusService: SupplierstatusService,
    private employeeService: EmployeeService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private rxs: RegexService,
    public authService:AuthorizationManager) {

    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      "csRegNo": new FormControl(),
      "csName": new FormControl(),
      "csTelephone": new FormControl(),
      "csSupplierStatus": new FormControl(),
      "csEmployee": new FormControl(),
    });

    this.ssearch = this.fb.group({
      "ssRegNo": new FormControl(),
      "ssName": new FormControl(),
      "ssSupStatus": new FormControl(),
      "ssEmployee": new FormControl(),
    });

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

    this.createView();

    this.supStatusService.getAllList().then((statuses: SupplierStatus[]) => {
      this.supplierStatuses = statuses;
    });

    this.employeeService.getAllListNameId().then((employees: Employee[]) => {
      this.employees = employees;
    });

    this.rxs.get('suppliers').then((regs: []) => {
      this.regexes = regs;
      this.createForm();
    });

  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
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

    this.enableButtons(true,false,false);

  }


  enableButtons(add:boolean, upd:boolean, del:boolean){
    this.enaadd=add;
    this.enaupd=upd;
    this.enadel=del;
  }

  loadTable(query: string) {

    this.supService.getAll(query)
      .then((sups: Supplier[]) => {
        this.suppliers = sups;
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.suppliers);
        this.data.paginator = this.paginator;
      });

  }

  filterTable(): void {

    const csSearchData = this.csearch.getRawValue();

    console.log(csSearchData);

    this.data.filterPredicate = ((supplier: Supplier, filter: string) => {
      console.log("filter predicate")
      console.log(supplier.regno.includes(csSearchData.csRegNo))
      return (csSearchData.csRegNo == null || supplier.regno.includes(csSearchData.csRegNo)) &&
        (csSearchData.csName == null || supplier.name.includes(csSearchData.csName)) &&
        (csSearchData.csTelephone == null || supplier.telephone.includes(csSearchData.csTelephone)) &&
        (csSearchData.csSupplierStatus == null || supplier.supplierstatus.name.includes(csSearchData.csSupplierStatus)) &&
        (csSearchData.csEmployee == null || supplier.employee.fullname.includes(csSearchData.csEmployee));
    });

    this.data.filter = 'xx';

  }

  btnSearchMc(): void {

    const sserchdata = this.ssearch.getRawValue();

    let regNo = sserchdata.ssRegNo;
    let name = sserchdata.ssName;
    let supStatus = sserchdata.ssSupStatus;
    let employee = sserchdata.ssEmployee;

    let query = "";

    if (regNo != null && regNo.trim() != "") query = query + "&regnumber=" + regNo;
    if (name != null && name.trim() != "") query = query + "&name=" + name;
    if (supStatus != null) query = query + "&supplierstatusid=" + supStatus;
    if (employee != null) query = query + "&employeeid=" + employee;

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
              Object.values(this.form.controls).forEach(control => {
                control.markAsTouched();
              });
              this.loadTable("");
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

  fillForm(supplier: Supplier) {

      this.enableButtons(false,true,true);

      this.selectedrow=supplier;

      this.supplier = JSON.parse(JSON.stringify(supplier));
      this.oldSupplier = JSON.parse(JSON.stringify(supplier));

      //@ts-ignore
      this.supplier.supplierStatus = this.supplierStatuses.find(s => s.id === this.supplier.supplierStatus.id);
      // @ts-ignore
      this.supplier.employee = this.employees.find(e => e.id === this.supplier.employee.id);

      this.form.patchValue(this.supplier);
      this.form.markAsPristine();

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
                  Object.values(this.form.controls).forEach(control => { control.markAsTouched(); });
                  this.loadTable("");
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


    delete() {

      const confirm = this.dialog.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Supplier Delete",
          message: "Are you sure to Delete following Supplier? <br> <br>" + this.supplier.name
        }
      });

      confirm.afterClosed().subscribe(async result => {
        if (result) {
          let delstatus: boolean = false;
          let delmessage: string = "Server Not Found";

          this.supService.delete(this.supplier.id).then((response: [] | undefined) => {

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
              Object.values(this.form.controls).forEach(control => { control.markAsTouched(); });
              this.loadTable("");
            }

            const stsmsg = this.dialog.open(MessageComponent, {
              width: '500px',
              data: {heading: "Status - Supplier Delete ", message: delmessage}
            });
            stsmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

          });
        }
      });
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
          this.form.reset()
        }
      });
    }


  }
