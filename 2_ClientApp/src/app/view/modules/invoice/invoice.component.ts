import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {Invoice} from "../../../entity/invoice";
import {MatPaginator} from "@angular/material/paginator";
import {UiAssist} from "../../../util/ui/ui.assist";
import {Invoicestatus} from "../../../entity/invoicestatus";
import {Employee} from "../../../entity/employee";
import {InvoiceService} from "../../../service/invoiceservice";
import {InvoicestatusService} from "../../../service/invoicestatusservice";
import {MatDialog} from "@angular/material/dialog";
import {AuthorizationManager} from "../../../service/authorizationmanager";
import {DatePipe} from "@angular/common";
import {EmployeeService} from "../../../service/employeeservice";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {MessageComponent} from "../../../util/dialog/message/message.component";
import {CustomerOrder} from "../../../entity/customerorder";
import {CustomerOrderService} from "../../../service/customerorderservice";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {

  columns: string[] = ['number', 'customerorder', 'date', 'invoicestatus', 'grandtotal','employee'];
  headers: string[] = ['Number', 'Order', 'Date', 'Invoice Status', 'Total','Employee'];
  binders: string[] = ['number', 'customerorder.number', 'date', 'invoicestatus.name', 'grandtotal', 'employee.fullname'];

  cscolumns: string[] = ['csnumber', 'csorder', 'csdate', 'csinvoicestatus', 'csgrandtotal', 'csemployee'];
  csprompts: string[] = ['Search by Number', 'Search by Order', 'Search by Date', 'Search by Status', 'Search by Total', 'Search by Employee'];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  invoice!: Invoice;
  oldInvoice!: Invoice;

  invoices: Array<Invoice> = [];
  data!: MatTableDataSource<Invoice>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  imageempurl: string = 'assets/default.png'
  uiassist: UiAssist;

  regexes: any;
  selectedrow: any;

  customerorders: Array<CustomerOrder> = [];
  invoicestatuses: Array<Invoicestatus> = [];
  employees: Array<Employee> = [];

  enaadd:boolean = true;
  enaupd:boolean = false;
  enadel:boolean = false;

  constructor(
      private invs: InvoiceService,
      private invstats: InvoicestatusService,
      private emps: EmployeeService,
      private cos: CustomerOrderService,
      private fb: FormBuilder,
      private dg: MatDialog,
      private dp: DatePipe,
      // private ns: NumberService,
      public authService:AuthorizationManager) {

    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      csnumber: new FormControl(),
      csorder: new FormControl(),
      csgrandtotal: new FormControl(),
      csdate: new FormControl(),
      csinvoicestatus: new FormControl(),
      csemployee: new FormControl(),
    });

    this.ssearch = this.fb.group({
      ssemployee: new FormControl(),
      ssinvstatus: new FormControl()
    });

    this.form =this.fb.group({
      "number": new FormControl('', [Validators.required]),
      "customerorder": new FormControl('', [Validators.required]),
      "grandtotal": new FormControl('', [Validators.required]),
      "date": new FormControl({value: new Date(), disabled: false}, [Validators.required]),
      "invoicestatus": new FormControl('', [Validators.required]),
      "employee": new FormControl('', [Validators.required]),
    }, {updateOn: 'change'});
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {

    this.createView();

    this.invstats.getAllList().then((invs: Invoicestatus[]) => {
      this.invoicestatuses = invs;
    });

    this.emps.getAll('').then((emps: Employee[]) => {
      this.employees = emps;
    });

    this.cos.getAll("").then((orders: CustomerOrder[]) => {
      this.customerorders = orders;
    });
    this.form.controls['customerorder'].valueChanges.subscribe(value => this.form.controls['grandtotal'].setValue(value.expectedtotal))
  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }

  createForm() {
    this.form.controls['number'].setValidators([Validators.required]);
    this.form.controls['customerorder'].setValidators([Validators.required]);
    this.form.controls['grandtotal'].setValidators([Validators.required]);
    this.form.controls['date'].setValidators([Validators.required]);
    this.form.controls['invoicestatus'].setValidators([Validators.required]);
    this.form.controls['employee'].setValidators([Validators.required]);

    Object.values(this.form.controls).forEach( control => { control.markAsTouched(); } );

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {
            // @ts-ignore
            if (controlName == "date")
              value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

            if (this.oldInvoice != undefined && control.valid) {
              // @ts-ignore
              if (value === this.invoice[controlName]) {
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

    this.invs.getAll(query)
        .then((invs: Invoice[]) => {
          this.invoices = invs;
          // this.ns.setLastSequenceNumber(this.invoices[this.invoices.length-1].invoicenumber);
          // this.generateNumber();
          this.imageurl = 'assets/fullfilled.png';
        })
        .catch((error) => {
          this.imageurl = 'assets/rejected.png';
        })
        .finally(() => {
          this.data = new MatTableDataSource(this.invoices);
          this.data.paginator = this.paginator;
        });

  }

  filterTable(): void {

    const cserchdata = this.csearch.getRawValue();

    this.data.filterPredicate = (invoice: Invoice, filter: string) => {
      return (cserchdata.csnumber == null || invoice.number.toLowerCase().includes(cserchdata.csnumber.toLowerCase())) &&
          (cserchdata.csgrandtotal == null || invoice.grandtotal.toString().includes(cserchdata.grandtotal  )) &&
          (cserchdata.csorder == null || invoice.customerorder.number.toLowerCase().includes(cserchdata.csnumber.toLowerCase())) &&
          (cserchdata.csdate == null || invoice.date.includes(cserchdata.csdate.toLowerCase())) &&
          (cserchdata.csinvoicestatus == null || invoice.invoicestatus.name.toLowerCase().includes(cserchdata.csinvoicestatus.toLowerCase())) &&
          (cserchdata.csemployee == null || invoice.employee.fullname.toLowerCase().includes(cserchdata.csemployee.toLowerCase()));
    };
    this.data.filter = 'xx';
  }

  btnSearchMc(): void {

    this.csearch.reset();
    const sserchdata = this.ssearch.getRawValue();

    let invstatusid = sserchdata.ssinvstatus;
    let employeeid = sserchdata.ssemployee;

    let query = "";
    if (invstatusid != null) query = query + "&invoicestatusid=" + invstatusid;
    if (employeeid != null) query = query + "&invoicebrandid=" + employeeid;
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

  fillForm(invoice: Invoice) {

    this.enableButtons(false,true,true);

    this.selectedrow=invoice;
    this.invoice = JSON.parse(JSON.stringify(invoice));
    this.oldInvoice = JSON.parse(JSON.stringify(invoice));
    //@ts-ignore
    this.invoice.invoicestatus = this.invoicestatuses.find(s => s.id === this.invoice.invoicestatus.id);
    //@ts-ignore
    this.invoice.employee = this.employees.find(em => em.id === this.invoice.employee.id);
    //@ts-ignore
    this.invoice.customerorder = this.customerorders.find(cs => cs.id === this.invoice.customerorder.id);
    this.form.patchValue(this.invoice);
    this.form.markAsPristine();
  }

  add() {
    let errors = this.getErrors();

    if (errors != "") {
      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - invoice Add ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => {
        if (!result) {
          return;
        }
      });
    } else {

      this.invoice = this.form.getRawValue();
      // delete this.form.controls['category'];

      let itmdata: string = "";
      itmdata = itmdata + "<br>Number is : " + this.invoice.number;

      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Invoice Add",
          message: "Are you sure to Add the following invoice? <br> <br>" + itmdata
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found";

      confirm.afterClosed().subscribe(async result => {
        if (result) {
          // @ts-ignore
          this.invs.add(this.invoice).then((response: [] | undefined) => {
            if (response != undefined) { // @ts-ignore
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
              data: {heading: "Status - Invoice Add", message: addmessage}
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
        data: {heading: "Errors - invoice Update ", message: "You have following Errors <br> " + errors}
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
            heading: "Confirmation - invoice Update",
            message: "Are you sure to Save folowing Updates? <br> <br>" + updates
          }
        });
        confirm.afterClosed().subscribe(async result => {
          if (result) {
            this.invoice = this.form.getRawValue();
            this.invoice.id = this.oldInvoice.id;
            this.invs.update(this.invoice).then((response: [] | undefined) => {
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
              }
              const stsmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Status -invoice Add", message: updmessage}
              });
              stsmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

            });
          }
        });
      }
      else {

        const updmsg = this.dg.open(MessageComponent, {
          width: '500px',
          data: {heading: "Confirmation - invoice Update", message: "Nothing Changed"}
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
        heading: "Confirmation - invoice Delete",
        message: "Are you sure to Delete following invoice? <br> <br>" + this.invoice.number
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        let delstatus: boolean = false;
        let delmessage: string = "Server Not Found";

        this.invs.delete(this.invoice.id).then((response: [] | undefined) => {

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

          const stsmsg = this.dg.open(MessageComponent, {
            width: '500px',
            data: {heading: "Status - invoice Delete ", message: delmessage}
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
        heading: "Confirmation - invoice Clear",
        message: "Are you sure to Clear following Details ? <br> <br>"
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        this.form.reset()
        this.enableButtons(true,false,false);
        this.loadTable('');
      }
    });
  }

  filterDates = (date: Date | null): boolean => {
    const currentDate = new Date();
    return !date || date.getTime() <= currentDate.getTime();
  };

  // generateNumber(): void {
  //   const newNumber = this.ns.generateNumber('ITM');
  //   this.form.controls['invoicenumber'].setValue(newNumber);
  // }


  findGrandTotal(order: CustomerOrder){
    console.log("selecting customer order")
    console.log(order.number)
    this.form.controls['grandtotal'].setValue(order.expectadtotal);
  }
}
