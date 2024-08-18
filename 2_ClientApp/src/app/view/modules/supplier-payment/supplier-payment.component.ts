import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UiAssist} from "../../../util/ui/ui.assist";
import {Employee} from "../../../entity/employee";
import {Paystatus} from "../../../entity/paystatus";
import {Paytype} from "../../../entity/paytype";
import {EmployeeService} from "../../../service/employeeservice";
import {PaystatusService} from "../../../service/paystatusservice";
import {PaytypeService} from "../../../service/paytypeservice";
import {MatDialog} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {AuthorizationManager} from "../../../service/authorizationmanager";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {MessageComponent} from "../../../util/dialog/message/message.component";
import {GrnService} from "../../../service/grnservice";
import {SupplierService} from "../../../service/supplierservice";
import {SupPayment} from "../../../entity/supPayment";
import {Supplier} from "../../../entity/supplier";
import {Grn} from "../../../entity/grn";
import {SupPaymentService} from "../../../service/suppaymentservice";

@Component({
  selector: 'app-supplier-payment',
  templateUrl: './supplier-payment.component.html',
  styleUrls: ['./supplier-payment.component.css']
})
export class SupplierPaymentComponent {

  columns: string[] = ['number', 'grn', 'grandtotal','date', 'supplier', 'employee'];
  headers: string[] = ['Payment Number', 'GRN', 'Grand Total', 'Date', 'Supplier', 'Employee'];
  binders: string[] = ['number', 'grn.grnnumber', 'grandtotal', 'date','supplier.name','employee.fullname'];

  cscolumns: string[] = ['csnumber', 'csgrn', 'csgrandtotal', 'csdate', 'cssupplier', 'csemployee'];
  csprompts: string[] = ['Search by Payment Number', 'Search by Invoice', 'Search by Total', 'Search by Date', 'Search by Supplier', 'Search by Employee'];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  suppayment!: SupPayment;
  oldsuppayment!: SupPayment;

  supPayments: Array<SupPayment> = [];
  data!: MatTableDataSource<SupPayment>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  uiassist: UiAssist;

  regexes: any;
  selectedrow: any;

  employees: Array<Employee> = [];
  suppliers: Array<Supplier> = [];
  paystatuses: Array<Paystatus> = [];
  grns: Array<Grn> = [];
  paytypes: Array<Paytype> = [];

  enaadd:boolean = true;
  enaupd:boolean = false;
  enadel:boolean = false;

  constructor(
    private pays: SupPaymentService,
    private grnss: GrnService,
    private emps: EmployeeService,
    private supss: SupplierService,
    private paysts: PaystatusService,
    private paytys: PaytypeService,
    private fb: FormBuilder,
    private dg: MatDialog,
    private dp: DatePipe,
    // private ns: NumberService,
    public authService:AuthorizationManager) {

    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      csnumber: new FormControl(),
      csgrn: new FormControl(),
      csgrandtotal: new FormControl(),
      csdate: new FormControl(),
      cssupplier: new FormControl(),
      csemployee: new FormControl(),
    });

    this.ssearch = this.fb.group({
      ssptype: new FormControl(),
      sspstatus: new FormControl(),
      ssupplier: new FormControl(),
    });

    this.form =this.fb.group({
      "number": new FormControl('', [Validators.required]),
      "grandtotal": new FormControl('', [Validators.required]),
      "supplier": new FormControl('', [Validators.required]),
      "grn": new FormControl('', [Validators.required]),
      "paytype": new FormControl('', [Validators.required]),
      "paystatus": new FormControl('', [Validators.required]),
      "employee": new FormControl('', [Validators.required]),
      "date": new FormControl({value: new Date(), disabled: false}, [Validators.required]),
    }, {updateOn: 'change'});

  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {

    this.createView();

    this.emps.getAll('').then((vsts: Employee[]) => {
      this.employees = vsts;
    });

    this.supss.getAll('').then((sups: Supplier[]) => {
      this.suppliers = sups;
    });

    this.paytys.getAllList().then((pts: Paytype[]) => {
      this.paytypes = pts;
    });

    this.paysts.getAllList().then((psts: Paystatus[]) => {
      this.paystatuses = psts;
    });

    this.grnss.getAll('').then((grns: Grn[]) => {
      this.grns = grns;
    });

    this.createForm();
  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }

  createForm() {

    this.form.controls['number'].setValidators([Validators.required]);
    this.form.controls['grn'].setValidators([Validators.required]);
    this.form.controls['grandtotal'].setValidators([Validators.required]);
    this.form.controls['paytype'].setValidators([Validators.required]);
    this.form.controls['paystatus'].setValidators([Validators.required]);
    this.form.controls['supplier'].setValidators([Validators.required]);
    this.form.controls['date'].setValidators([Validators.required]);
    this.form.controls['employee'].setValidators([Validators.required]);

    Object.values(this.form.controls).forEach( control => { control.markAsTouched(); } );

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {
          // @ts-ignore
          if (controlName == "date")
            value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

          if (this.oldsuppayment != undefined && control.valid) {
            // @ts-ignore
            if (value === this.payment[controlName]) {
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

    this.pays.getAll(query)
      .then((pays: SupPayment[]) => {
        this.supPayments = pays;
        console.log(pays)
        // this.ns.setLastSequenceNumber(this.payments[this.payments.length-1].suppayno);
        // this.generateNumber();
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.supPayments);
        this.data.paginator = this.paginator;
      });
  }

  filterTable(): void {

    const cserchdata = this.csearch.getRawValue();

    this.data.filterPredicate = (payment: SupPayment, filter: string) => {
      return (cserchdata.csnumber == null || payment.number.toLowerCase().includes(cserchdata.csnumber.toLowerCase())) &&
        (cserchdata.csgrn == null || payment.grn.grnnumber.toLowerCase().includes(cserchdata.csgrn.toLowerCase())) &&
        (cserchdata.csgrandtotal == null || payment.grandtotal.toString().includes(cserchdata.csgrandtotal)) &&
        (cserchdata.csdate == null || payment.date.toString().includes(cserchdata.csdate)) &&
        (cserchdata.cssupplier == null || payment.supplier.name.toLowerCase().includes(cserchdata.cssupplier.toLowerCase())) &&
        (cserchdata.csemployee== null || payment.employee.fullname.toLowerCase().includes(cserchdata.csemployee.toLowerCase()));
    };
    this.data.filter = 'xx';
  }

  btnSearchMc(): void {

    this.csearch.reset();
    const sserchdata = this.ssearch.getRawValue();

    let pstatusid = sserchdata.sspstatus;
    let ssptypeid = sserchdata.ssptype;
    let ssupplier = sserchdata.ssupplier;

    let query = "";
    if (pstatusid != null) query = query + "&suppaymentstatusid=" + pstatusid;
    if (ssptypeid != null) query = query + "&suppaymenttypeid=" + ssptypeid;
    if (ssupplier != null) query = query + "&supplierid=" + ssupplier;
    if (query != "") query = query.replace(/^./, "?")

    this.loadTable(query);
  }

  btnSearchClearMc(): void {

    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {heading: "Search Clear", message: "Are you sure to Clear the Search?"}
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        this.csearch.reset();
        this.ssearch.reset();
        this.loadTable("");
      }
    });

  }

  getErrors(): string {

    let errors: string = "";

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      if (control.errors) errors = errors + "<br>Invalid " + controlName;
    }

    return errors;
  }

  fillForm(payment: SupPayment) {

    this.enableButtons(false,true,true);

    this.selectedrow=payment;
    this.suppayment = JSON.parse(JSON.stringify(payment));
    this.oldsuppayment = JSON.parse(JSON.stringify(payment));
    //@ts-ignore
    this.suppayment.employee = this.employees.find(s => s.id === this.suppayment.employee.id);
    //@ts-ignore
    this.suppayment.invoice = this.invoices.find(s => s.id === this.suppayment.invoice.id);
    //@ts-ignore
    this.suppayment.paytype = this.paytypes.find(s => s.id === this.suppayment.paytype.id);
    //@ts-ignore
    this.suppayment.paystatus = this.paystatuses.find(s => s.id === this.suppayment.paystatus.id);
    //@ts-ignore
    this.suppayment.customer = this.customers.find(s => s.id === this.suppayment.customer.id);

    this.form.patchValue(this.suppayment);
    this.form.markAsPristine();
  }

  add() {

    let errors = this.getErrors();

    if (errors != "") {
      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Supplier Payment Add ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => {
        if (!result) {
          return;
        }
      });
    } else {

      this.suppayment = this.form.getRawValue();

      let shdata: string = "";

      shdata = shdata + "<br> Supplier Payment Number is : " + this.suppayment.number;

      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Supplier Payment Add",
          message: "Are you sure to Add the following SupPayment? <br> <br>" + shdata
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found";

      confirm.afterClosed().subscribe(async result => {
        if (result) {
          this.pays.add(this.suppayment).then((response: [] | undefined) => {
            if (response != undefined) {
              // @ts-ignore
              addstatus = response['errors'] == "";
              if (!addstatus) { // @ts-ignore
                addmessage = response['errors'];
              }
            } else {
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

            const stsmsg = this.dg.open(MessageComponent, {
              width: '500px',
              data: {heading: "Status - Supplier Payment Add", message: addmessage}
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

  update() {

    let errors = this.getErrors();

    if (errors != "") {

      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Store Update ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

    } else {

      let updates: string = this.getUpdates();

      if (updates != "") {

        let updstatus: boolean = false;
        let updmessage: string = "Server Not Found";

        const confirm = this.dg.open(ConfirmComponent, {
          width: '500px',
          data: {
            heading: "Confirmation - Store Update",
            message: "Are you sure to Save folowing Updates? <br> <br>" + updates
          }
        });
        confirm.afterClosed().subscribe(async result => {
          if (result) {
            this.suppayment = this.form.getRawValue();

            this.suppayment.id = this.oldsuppayment.id;

            this.pays.update(this.suppayment).then((response: [] | undefined) => {
              if (response != undefined) { // @ts-ignore
                updstatus = response['errors'] == "";
                if (!updstatus) { // @ts-ignore
                  updmessage = response['errors'];
                }
              } else {
                updstatus = false;
                updmessage = "Content Not Found"
              }
            } ).finally(() => {
              if (updstatus) {
                updmessage = "Successfully Updated";
                this.form.reset();
                Object.values(this.form.controls).forEach(control => { control.markAsTouched(); });
                this.loadTable("");
                this.enableButtons(true,false,false);
              }

              const stsmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Status -Store Add", message: updmessage}
              });
              stsmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

            });
          }
        });
      }
      else {

        const updmsg = this.dg.open(MessageComponent, {
          width: '500px',
          data: {heading: "Confirmation - Store Update", message: "Nothing Changed"}
        });
        updmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

      }
    }


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

  delete() {

    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Supplier Payment Delete",
        message: "Are you sure to Delete following Supplier Payment? <br> <br>" + this.suppayment.number
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        let delstatus: boolean = false;
        let delmessage: string = "Server Not Found";

        this.pays.delete(this.suppayment.id).then((response: [] | undefined) => {

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
            this.enableButtons(true,false,false);
            Object.values(this.form.controls).forEach(control => { control.markAsTouched(); });
            this.loadTable("");
          }

          const stsmsg = this.dg.open(MessageComponent, {
            width: '500px',
            data: {heading: "Status - Supplier Payment Delete ", message: delmessage}
          });
          stsmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

        });
      }
    });
  }

  clear():void{
    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Supplier Payment Clear",
        message: "Are you sure to Clear following Details ? <br> <br>"
      }
    });
    confirm.afterClosed().subscribe(async result => {
      if (result) {
        this.form.reset();
        this.loadTable('');
        this.enableButtons(true,false,false);
      }
    });

  }

  // setGrandTotal() {
  //   let invoice = this.form.controls['invoice'].value;
  //
  //   let invoicenumber = invoice.number;
  //   let gpayment: number = this.invoices.find(s => s.number === invoicenumber)?.grandtotal ?? 0;
  //   let greturn: number = this.supreturns.find(s => s.grn.grnnumber === gnumber)?.grandtotal ?? 0;
  //   let gpaied: number = parseFloat(this.payments.find(s => s.grn.grnnumber === gnumber)?.grandtotal ?? '0');
  //   let total: number = gpayment - greturn - gpaied;
  //   this.form.controls['grandtotal'].setValue(total);
  //
  //   let customer = invoice.customerorder?.customer ?? null;
  //   this.form.controls['customer'].setValue(customer);
  // }

  // generateNumber(): void {
  //   const newNumber = this.ns.generateNumber('SAY');
  //   this.form.controls['suppayno'].setValue(newNumber);
  // }

  total= 0;

  // filteritem(){
  //
  //   let e = this.form.controls['grn'].value.id;
  //
  //   this.grs.getGrntotal(e).then((msys: Grn[]) => {
  //     msys.forEach(i => {
  //       this.total = this.total + i.grandtotal
  //     })
  //   });
  //
  //   this.surs.getReptotal(e).then((msys: Supreturn[]) => {
  //     msys.forEach(i => {
  //       this.total = this.total - i.grandtotal
  //     })
  //   });
  //
  //   this.sups.getSupplierByGrn(e).then((msys: Supplier[]) => {
  //     this.suppliers = msys;
  //   });
  //   if(this.total!=0)this.form.controls['grandtotal'].setValue(this.total);
  //   this.total=0;
  // }

}
