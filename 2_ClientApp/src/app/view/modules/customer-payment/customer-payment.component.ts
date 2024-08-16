import {Component, ViewChild} from '@angular/core';
import {MessageComponent} from "../../../util/dialog/message/message.component";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustPayment} from "../../../entity/custPayment";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UiAssist} from "../../../util/ui/ui.assist";
import {Customer} from "../../../entity/customer";
import {Employee} from "../../../entity/employee";
import {Paystatus} from "../../../entity/paystatus";
import {Invoice} from "../../../entity/invoice";
import {Paytype} from "../../../entity/paytype";
import {DatePipe} from "@angular/common";
import {AuthorizationManager} from "../../../service/authorizationmanager";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeService} from "../../../service/employeeservice";
import {InvoiceService} from "../../../service/invoiceservice";
import {CustPaymentpaymentService} from "../../../service/custpaymentservice";
import {PaystatusService} from "../../../service/paystatusservice";
import {PaytypeService} from "../../../service/paytypeservice";
import {CustomerService} from "../../../service/customerservice";

@Component({
  selector: 'app-customer-payment',
  templateUrl: './customer-payment.component.html',
  styleUrls: ['./customer-payment.component.css']
})
export class CustomerPaymentComponent {

  columns: string[] = ['number', 'invoice', 'grandtotal','date', 'customer', 'employee'];
  headers: string[] = ['Payment Number', 'Invoice', 'Grand Total', 'Date', 'Customer', 'Employee'];
  binders: string[] = ['number', 'invoice.number', 'grandtotal', 'date','customer.fullname','employee.fullname'];

  cscolumns: string[] = ['csnumber', 'csinvoice', 'csgrandtotal', 'csdate', 'cscustomer', 'csemployee'];
  csprompts: string[] = ['Search by Payment Number', 'Search by Invoice', 'Search by Total', 'Search by Date', 'Search by Customer', 'Search by Employee'];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  cuspayment!: CustPayment;
  oldcuspayment!: CustPayment;

  custPayments: Array<CustPayment> = [];
  data!: MatTableDataSource<CustPayment>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  imageempurl: string = 'assets/default.png'
  uiassist: UiAssist;

  regexes: any;
  selectedrow: any;

  employees: Array<Employee> = [];
  customers: Array<Customer> = [];
  paystatuses: Array<Paystatus> = [];
  invoices: Array<Invoice> = [];
  paytypes: Array<Paytype> = [];

  enaadd:boolean = true;
  enaupd:boolean = false;
  enadel:boolean = false;

  constructor(
      private pays: CustPaymentpaymentService,
      private invoics: InvoiceService,
      private emps: EmployeeService,
      private cuss: CustomerService,
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
      csinvoice: new FormControl(),
      csgrandtotal: new FormControl(),
      csdate: new FormControl(),
      cscustomer: new FormControl(),
      csemployee: new FormControl(),
    });

    this.ssearch = this.fb.group({
      ssptype: new FormControl(),
      sspstatus: new FormControl(),
      sscustomer: new FormControl(),
    });

    this.form =this.fb.group({
      "number": new FormControl('', [Validators.required]),
      "grandtotal": new FormControl('', [Validators.required]),
      "customer": new FormControl('', [Validators.required]),
      "invoice": new FormControl('', [Validators.required]),
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

    this.cuss.getAll('').then((cust: Customer[]) => {
      this.customers = cust;
    });

    this.paytys.getAllList().then((pts: Paytype[]) => {
      this.paytypes = pts;
    });

    this.paysts.getAllList().then((psts: Paystatus[]) => {
      this.paystatuses = psts;
    });

    this.invoics.getAll('').then((invs: Invoice[]) => {
      this.invoices = invs;
    });

    this.createForm();
  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }

  createForm() {

    this.form.controls['number'].setValidators([Validators.required]);
    this.form.controls['invoice'].setValidators([Validators.required]);
    this.form.controls['grandtotal'].setValidators([Validators.required]);
    this.form.controls['paytype'].setValidators([Validators.required]);
    this.form.controls['paystatus'].setValidators([Validators.required]);
    this.form.controls['customer'].setValidators([Validators.required]);
    this.form.controls['date'].setValidators([Validators.required]);
    this.form.controls['employee'].setValidators([Validators.required]);

    Object.values(this.form.controls).forEach( control => { control.markAsTouched(); } );

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {
            // @ts-ignore
            if (controlName == "date")
              value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

            if (this.oldcuspayment != undefined && control.valid) {
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
        .then((pays: CustPayment[]) => {
          this.custPayments = pays;
          // this.ns.setLastSequenceNumber(this.payments[this.payments.length-1].suppayno);
          // this.generateNumber();
          this.imageurl = 'assets/fullfilled.png';
        })
        .catch((error) => {
          this.imageurl = 'assets/rejected.png';
        })
        .finally(() => {
          this.data = new MatTableDataSource(this.custPayments);
          this.data.paginator = this.paginator;
        });
  }

  filterTable(): void {

    const cserchdata = this.csearch.getRawValue();

    this.data.filterPredicate = (payment: CustPayment, filter: string) => {
      return (cserchdata.csnumber == null || payment.number.toLowerCase().includes(cserchdata.csnumber.toLowerCase())) &&
          (cserchdata.csinvoice == null || payment.invoice.number.toLowerCase().includes(cserchdata.csinvoice.toLowerCase())) &&
          (cserchdata.csgrandtotal == null || payment.grandtotal.toString().includes(cserchdata.csgrandtotal)) &&
          (cserchdata.csdate == null || payment.date.toString().includes(cserchdata.csdate)) &&
          (cserchdata.cscustomer == null || payment.customer.fullname.toLowerCase().includes(cserchdata.cscustomer.toLowerCase())) &&
        (cserchdata.csemployee== null || payment.employee.fullname.toLowerCase().includes(cserchdata.csemployee.toLowerCase()));
    };
    this.data.filter = 'xx';
  }

  btnSearchMc(): void {

    this.csearch.reset();
    const sserchdata = this.ssearch.getRawValue();

    let pstatusid = sserchdata.sspstatus;
    let ssptypeid = sserchdata.ssptype;
    let sscustomer = sserchdata.sscustomer;

    let query = "";
    if (pstatusid != null) query = query + "&custpaymentstatusid=" + pstatusid;
    if (ssptypeid != null) query = query + "&custpaymenttypeid=" + ssptypeid;
    if (sscustomer != null) query = query + "&customerid=" + sscustomer;
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

  fillForm(payment: CustPayment) {

    this.enableButtons(false,true,true);

    this.selectedrow=payment;
    this.cuspayment = JSON.parse(JSON.stringify(payment));
    this.oldcuspayment = JSON.parse(JSON.stringify(payment));
    //@ts-ignore
    this.cuspayment.employee = this.employees.find(s => s.id === this.cuspayment.employee.id);
     //@ts-ignore
    this.cuspayment.invoice = this.invoices.find(s => s.id === this.cuspayment.invoice.id);
    //@ts-ignore
    this.cuspayment.paytype = this.paytypes.find(s => s.id === this.cuspayment.paytype.id);
    //@ts-ignore
    this.cuspayment.paystatus = this.paystatuses.find(s => s.id === this.cuspayment.paystatus.id);
    //@ts-ignore
    this.cuspayment.customer = this.customers.find(s => s.id === this.cuspayment.customer.id);

    this.form.patchValue(this.cuspayment);
    this.form.markAsPristine();
  }

  add() {

    let errors = this.getErrors();

    if (errors != "") {
      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Customer Payment Add ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => {
        if (!result) {
          return;
        }
      });
    } else {

      this.cuspayment = this.form.getRawValue();

      let shdata: string = "";

      shdata = shdata + "<br> Customer Payment Number is : " + this.cuspayment.number;

      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Customer Payment Add",
          message: "Are you sure to Add the following CustPayment? <br> <br>" + shdata
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found";

      confirm.afterClosed().subscribe(async result => {
        if (result) {
          this.pays.add(this.cuspayment).then((response: [] | undefined) => {
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
              data: {heading: "Status -Customer Payment Add", message: addmessage}
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
            this.cuspayment = this.form.getRawValue();

            this.cuspayment.id = this.oldcuspayment.id;

            this.pays.update(this.cuspayment).then((response: [] | undefined) => {
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
        heading: "Confirmation - Customer Payment Delete",
        message: "Are you sure to Delete following Customer Payment? <br> <br>" + this.cuspayment.number
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        let delstatus: boolean = false;
        let delmessage: string = "Server Not Found";

        this.pays.delete(this.cuspayment.id).then((response: [] | undefined) => {

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
            data: {heading: "Status - Customer Payment Delete ", message: delmessage}
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
        heading: "Confirmation - Customer Payment Clear",
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
