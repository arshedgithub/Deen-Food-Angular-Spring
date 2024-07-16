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
  // imageempurl: string = 'assets/default.png'

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
    public authService:AuthorizationManager) {

    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      "csRegNo": new FormControl(),
      "csName": new FormControl(),
      "csTelephone": new FormControl(),
      "csSupplierStatus": new FormControl(),
      "csEmployee": new FormControl(),
    });

    // this.ssearch = this.fb.group({
    //   "ssnumber": new FormControl(),
    //   "ssfullname": new FormControl(),
    //   "ssgender": new FormControl(),
    //   "ssdesignation": new FormControl(),
    //   "ssnic": new FormControl()
    // });


    this.form = this.fb.group({
      "name": new FormControl('', [Validators.required]),
      "regNo": new FormControl('', [Validators.required]),
      "regYear": new FormControl('', [Validators.required]),
      "address": new FormControl('', [Validators.required]),
      "telephone": new FormControl('', [Validators.required]),
      "fax": new FormControl(''),
      "email": new FormControl('', [Validators.required]),
      "contactPerson": new FormControl('', [Validators.required]),
      "contactMobile": new FormControl('', [Validators.required]),
      "creditLimit": new FormControl('', [Validators.required]),
      "description": new FormControl(''),
      "doregister": new FormControl({value: new Date(), disabled: false}, [Validators.required]),
      "supplierStatus": new FormControl('', [Validators.required]),
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

    // this.rs.get('employee').then((regs: []) => {
    //   this.regexes = regs;
    //   this.createForm();
    // });

  }

  createView() {
    // this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }


  createForm() {

    this.form.controls['name'].setValidators([Validators.required, Validators.pattern(this.regexes['number']['regex'])]);
    this.form.controls['regNo'].setValidators([Validators.required, Validators.pattern(this.regexes['fullname']['regex'])]);
    this.form.controls['regYear'].setValidators([Validators.required, Validators.pattern(this.regexes['callingname']['regex'])]);
    this.form.controls['address'].setValidators([Validators.required]);
    this.form.controls['telephone'].setValidators([Validators.required, Validators.pattern(this.regexes['nic']['regex'])]);
    this.form.controls['fax'].setValidators([Validators.required]);
    this.form.controls['email'].setValidators([Validators.required]);
    this.form.controls['contactPerson'].setValidators([Validators.required, Validators.pattern(this.regexes['address']['regex'])]);
    this.form.controls['contactMobile'].setValidators([Validators.required, Validators.pattern(this.regexes['mobile']['regex'])]);
    this.form.controls['creditLimit'].setValidators([Validators.pattern(this.regexes['land']['regex'])]);
    this.form.controls['description'].setValidators([Validators.required,Validators.pattern(this.regexes['email']['regex'])]);
    this.form.controls['doregister'].setValidators([Validators.required]);
    this.form.controls['supplierStatus'].setValidators([Validators.required]);
    this.form.controls['employee'].setValidators([Validators.required, Validators.pattern(this.regexes['description']['regex'])]);

    Object.values(this.form.controls).forEach( control => { control.markAsTouched(); } );

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {
          // @ts-ignore
          if (controlName == "dobirth" || controlName == "doassignment")
            value = this.datePipe.transform(new Date(value), 'yyyy-MM-dd');

          if (this.oldSupplier != undefined && control.valid) {
            // @ts-ignore
            if (value === this.employee[controlName]) {
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
        // this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        // this.imageurl = 'assets/rejected.png';
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
      console.log(supplier.regNo.includes(csSearchData.csRegNo))
      return (csSearchData.csRegNo == null || supplier.regNo.includes(csSearchData.csRegNo)) &&
        (csSearchData.csName == null || supplier.name.includes(csSearchData.csName)) &&
        (csSearchData.csTelephone == null || supplier.telephone.includes(csSearchData.csTelephone)) &&
        (csSearchData.csSupplierStatus == null || supplier.supplierStatus.name.includes(csSearchData.csSupplierStatus)) &&
        (csSearchData.csEmployee == null || supplier.employee.fullname.includes(csSearchData.csEmployee));
    });

    this.data.filter = 'xx';

  }

  btnSearchMc(): void {

    const sserchdata = this.ssearch.getRawValue();

    let number = sserchdata.ssnumber;
    let fullname = sserchdata.ssfullname;
    let nic = sserchdata.ssnic;
    let genderid = sserchdata.ssgender;
    let designationid = sserchdata.ssdesignation;

    let query = "";

    if (number != null && number.trim() != "") query = query + "&number=" + number;
    if (fullname != null && fullname.trim() != "") query = query + "&fullname=" + fullname;
    if (nic != null && nic.trim() != "") query = query + "&nic=" + nic;
    if (genderid != null) query = query + "&genderid=" + genderid;
    if (designationid != null) query = query + "&designationid=" + designationid;

    if (query != "") query = query.replace(/^./, "?")

    this.loadTable(query);

  }


  // btnSearchClearMc(): void {
  //
  //   const confirm = this.dg.open(ConfirmComponent, {
  //     width: '500px',
  //     data: {heading: "Search Clear", message: "Are you sure to Clear the Search?"}
  //   });
  //
  //   confirm.afterClosed().subscribe(async result => {
  //     if (result) {
  //       this.ssearch.reset();
  //       this.loadTable("");
  //     }
  //   });
  //
  // }


  add() {

    // let errors = this.getErrors();
    //
    // if (errors != "") {
    //   const errmsg = this.dg.open(MessageComponent, {
    //     width: '500px',
    //     data: {heading: "Errors - Employee Add ", message: "You have following Errors <br> " + errors}
    //   });
    //   errmsg.afterClosed().subscribe(async result => {
    //     if (!result) {
    //       return;
    //     }
    //   });
    // } else {
    //
    //   this.employee = this.form.getRawValue();
    //
    //   //console.log("Photo-Before"+this.employee.photo);
    //   this.employee.photo = btoa(this.imageempurl);
    //   //console.log("Photo-After"+this.employee.photo);
    //
    //   let empdata: string = "";
    //
    //   empdata = empdata + "<br>Number is : " + this.employee.number;
    //   empdata = empdata + "<br>Fullname is : " + this.employee.fullname;
    //   empdata = empdata + "<br>Callingname is : " + this.employee.callingname;
    //
    //   const confirm = this.dg.open(ConfirmComponent, {
    //     width: '500px',
    //     data: {
    //       heading: "Confirmation - Employee Add",
    //       message: "Are you sure to Add the following Employee? <br> <br>" + empdata
    //     }
    //   });
    //
    //   let addstatus: boolean = false;
    //   let addmessage: string = "Server Not Found";
    //
    //   confirm.afterClosed().subscribe(async result => {
    //     if (result) {
    //       // console.log("EmployeeService.add(emp)");
    //
    //       this.es.add(this.employee).then((responce: [] | undefined) => {
    //         //console.log("Res-" + responce);
    //         //console.log("Un-" + responce == undefined);
    //         if (responce != undefined) { // @ts-ignore
    //           console.log("Add-" + responce['id'] + "-" + responce['url'] + "-" + (responce['errors'] == ""));
    //           // @ts-ignore
    //           addstatus = responce['errors'] == "";
    //           console.log("Add Sta-" + addstatus);
    //           if (!addstatus) { // @ts-ignore
    //             addmessage = responce['errors'];
    //           }
    //         } else {
    //           console.log("undefined");
    //           addstatus = false;
    //           addmessage = "Content Not Found"
    //         }
    //       }).finally(() => {
    //
    //         if (addstatus) {
    //           addmessage = "Successfully Saved";
    //           this.form.reset();
    //           this.clearImage();
    //           Object.values(this.form.controls).forEach(control => {
    //             control.markAsTouched();
    //           });
    //           this.loadTable("");
    //         }
    //
    //         const stsmsg = this.dg.open(MessageComponent, {
    //           width: '500px',
    //           data: {heading: "Status -Employee Add", message: addmessage}
    //         });
    //
    //         stsmsg.afterClosed().subscribe(async result => {
    //           if (!result) {
    //             return;
    //           }
    //         });
    //       });
    //     }
    //   });
    // }
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

    // // this.enableButtons(false,true,true);
    //
    // this.selectedrow=employee;
    //
    // this.supplier = JSON.parse(JSON.stringify(employee));
    // this.oldSupplier = JSON.parse(JSON.stringify(employee));
    //
    // if (this.supplier.photo != null) {
    //   this.imageempurl = atob(this.employee.photo);
    //   this.form.controls['photo'].clearValidators();
    // } else {
    //   this.clearImage();
    // }
    // this.employee.photo = "";
    //
    // //@ts-ignore
    // this.employee.gender = this.genders.find(g => g.id === this.employee.gender.id);
    // //@ts-ignore
    // this.employee.designation = this.designations.find(d => d.id === this.employee.designation.id);
    // //@ts-ignore
    // this.employee.empstatus = this.employeestatuses.find(s => s.id === this.employee.empstatus.id);
    // //@ts-ignore
    // this.employee.emptype = this.employeetypes.find(s => s.id === this.employee.emptype.id);
    //
    // this.form.patchValue(this.employee);
    // this.form.markAsPristine();

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


  // update() {

  //   let errors = this.getErrors();
  //
  //   if (errors != "") {
  //
  //     const errmsg = this.dg.open(MessageComponent, {
  //       width: '500px',
  //       data: {heading: "Errors - Employee Update ", message: "You have following Errors <br> " + errors}
  //     });
  //     errmsg.afterClosed().subscribe(async result => { if (!result) { return; } });
  //
  //   } else {
  //
  //     let updates: string = this.getUpdates();
  //
  //     if (updates != "") {
  //
  //       let updstatus: boolean = false;
  //       let updmessage: string = "Server Not Found";
  //
  //       const confirm = this.dg.open(ConfirmComponent, {
  //         width: '500px',
  //         data: {
  //           heading: "Confirmation - Employee Update",
  //           message: "Are you sure to Save folowing Updates? <br> <br>" + updates
  //         }
  //       });
  //       confirm.afterClosed().subscribe(async result => {
  //         if (result) {
  //           //console.log("EmployeeService.update()");
  //           this.employee = this.form.getRawValue();
  //           if (this.form.controls['photo'].dirty) this.employee.photo = btoa(this.imageempurl);
  //           else this.employee.photo = this.oldemployee.photo;
  //           this.employee.id = this.oldemployee.id;
  //
  //           this.es.update(this.employee).then((responce: [] | undefined) => {
  //             //console.log("Res-" + responce);
  //             // console.log("Un-" + responce == undefined);
  //             if (responce != undefined) { // @ts-ignore
  //               //console.log("Add-" + responce['id'] + "-" + responce['url'] + "-" + (responce['errors'] == ""));
  //               // @ts-ignore
  //               updstatus = responce['errors'] == "";
  //               //console.log("Upd Sta-" + updstatus);
  //               if (!updstatus) { // @ts-ignore
  //                 updmessage = responce['errors'];
  //               }
  //             } else {
  //               //console.log("undefined");
  //               updstatus = false;
  //               updmessage = "Content Not Found"
  //             }
  //           } ).finally(() => {
  //             if (updstatus) {
  //               updmessage = "Successfully Updated";
  //               this.form.reset();
  //               this.clearImage();
  //               Object.values(this.form.controls).forEach(control => { control.markAsTouched(); });
  //               this.loadTable("");
  //             }
  //
  //             const stsmsg = this.dg.open(MessageComponent, {
  //               width: '500px',
  //               data: {heading: "Status -Employee Add", message: updmessage}
  //             });
  //             stsmsg.afterClosed().subscribe(async result => { if (!result) { return; } });
  //
  //           });
  //         }
  //       });
  //     }
  //     else {
  //
  //       const updmsg = this.dg.open(MessageComponent, {
  //         width: '500px',
  //         data: {heading: "Confirmation - Employee Update", message: "Nothing Changed"}
  //       });
  //       updmsg.afterClosed().subscribe(async result => { if (!result) { return; } });
  //
  //     }
  //   }
  //
  //
  // }
  //
  //
  //
  // delete() {
  //
  //   const confirm = this.dg.open(ConfirmComponent, {
  //     width: '500px',
  //     data: {
  //       heading: "Confirmation - Employee Delete",
  //       message: "Are you sure to Delete following Employee? <br> <br>" + this.employee.callingname
  //     }
  //   });
  //
  //   confirm.afterClosed().subscribe(async result => {
  //     if (result) {
  //       let delstatus: boolean = false;
  //       let delmessage: string = "Server Not Found";
  //
  //       this.es.delete(this.employee.id).then((responce: [] | undefined) => {
  //
  //         if (responce != undefined) { // @ts-ignore
  //           delstatus = responce['errors'] == "";
  //           if (!delstatus) { // @ts-ignore
  //             delmessage = responce['errors'];
  //           }
  //         } else {
  //           delstatus = false;
  //           delmessage = "Content Not Found"
  //         }
  //       } ).finally(() => {
  //         if (delstatus) {
  //           delmessage = "Successfully Deleted";
  //           this.form.reset();
  //           this.clearImage();
  //           Object.values(this.form.controls).forEach(control => { control.markAsTouched(); });
  //           this.loadTable("");
  //         }
  //
  //         const stsmsg = this.dg.open(MessageComponent, {
  //           width: '500px',
  //           data: {heading: "Status - Employee Delete ", message: delmessage}
  //         });
  //         stsmsg.afterClosed().subscribe(async result => { if (!result) { return; } });
  //
  //       });
  //     }
  //   });
  // }
  //
  // clear():void{
  //   const confirm = this.dg.open(ConfirmComponent, {
  //     width: '500px',
  //     data: {
  //       heading: "Confirmation - Employee Clear",
  //       message: "Are you sure to Clear following Details ? <br> <br>"
  //     }
  //   });
  //
  //   confirm.afterClosed().subscribe(async result => {
  //     if (result) {
  //       this.form.reset()
  //     }
  //   });
  // }


}
