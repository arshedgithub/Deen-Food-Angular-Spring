import {Component, ElementRef, ViewChild} from '@angular/core';
import {MessageComponent} from "../../../util/dialog/message/message.component";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerOrder} from "../../../entity/customerorder";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Orderproduct} from "../../../entity/orderproduct";
import {Customer} from "../../../entity/customer";
import {Employee} from "../../../entity/employee";
import {CustomerOrderstatus} from "../../../entity/customerorderstatus";
import {Product} from "../../../entity/product";
import {UiAssist} from "../../../util/ui/ui.assist";
import {CustomerOrderService} from "../../../service/customerorderservice";
import {EmployeeService} from "../../../service/employeeservice";
import {RegexService} from "../../../service/regexservice";
import {CustomerOrderstatusService} from "../../../service/custorderstatusservice";
import {CustomerService} from "../../../service/customerservice";
import {ProductService} from "../../../service/productservice";
import {DatePipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {AuthorizationManager} from "../../../service/authorizationmanager";
import {Grnitem} from "../../../entity/grnitem";

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.css']
})
export class CustomerOrderComponent {
  @ViewChild('myForm', {static: false}) myForm!: ElementRef;
  @ViewChild('myInnerForm', {static: false}) myInnerForm!: ElementRef;

  private productCategorySubscription: any;
  private customerSubscription: any;

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;
  public innerform!: FormGroup;

  columns: string[] = ['number', 'customer', 'employee', 'doexpected', 'description', 'customerorderstatus'];
  headers: string[] = ['Order NO', 'Customer', 'Employee', 'Do Expected', 'Description', 'Order Status'];
  binders: string[] = ['number', 'customer.fullname', 'employee.callingname', 'doexpected', 'description', 'customerorderstatus.name'];

  cscolumns: string[] = ['csnumber', 'cscustomer', 'csemployee', 'csdoexpected', 'csdescription', 'cscustomerorderstatus'];
  csprompts: string[] = ['Search by Order No', 'Search by Customer', 'Search by Employee', 'Search by Do Requested', 'Search by Description', 'Search by Order Status'];

  incolumns: string[] = ['name', 'amount', 'unitprice', 'expectedlinecost', 'remove'];
  inheaders: string[] = ['Name', 'Amount', 'Product Cost', 'Exp. Line Total', ''];
  inbinders: string[] = ['product.productnumber', 'amount', 'product.price', 'expectedcost', ''];


  data!: MatTableDataSource<CustomerOrder>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  indata!: MatTableDataSource<Orderproduct>

  orders: Array<CustomerOrder> = [];
  customers: Array<Customer> = [];
  employees: Array<Employee> = [];
  customerorderstatuses: Array<CustomerOrderstatus> = [];

  products: Array<Product> = [];
  oldproducts: Array<Product> = [];

  // productcategories: Array<Productcategory> = [];
  // oldproductcategories: Array<Productcategory> = [];

  orderproducts: Array<Orderproduct> = [];
  oldOrderproducts: Array<Orderproduct> = [];

  grandtotal = 0;
  linetotal = 0;
  regexes: any;
  uiassist: UiAssist;
  customerorder!: CustomerOrder;
  orderproduct!: Orderproduct;
  oldcustomerorder!: CustomerOrder;

  innerdata: any;
  oldinnerdata: any;

  selectedrow: any;
  selectedinnerrow: any;

  imageurl: any;

  dsaadd:boolean = false;
  dsaupd:boolean = false;
  dsadel:boolean = false;

  constructor(
      private cos: CustomerOrderService,
      private cost: CustomerOrderstatusService,
      private fb: FormBuilder,
      private cs: CustomerService,
      private es: EmployeeService,
      private ps: ProductService,
      private rx: RegexService,
      private dp: DatePipe,
      private dg: MatDialog,
      public authService: AuthorizationManager
  ) {
    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      "csnumber": new FormControl(),
      "cscustomer": new FormControl(),
      "csemployee": new FormControl(),
      "csdoexpected": new FormControl(),
      "csdescription": new FormControl(),
      "cscustomerorderstatus": new FormControl()
    });

    this.ssearch = this.fb.group({
      "sscustomer": new FormControl(),
      "ssorderstatus": new FormControl(),
      "ssdoexpected": new FormControl(),
      "ssdoplaced": new FormControl()
    });

    this.form = this.fb.group({
      "number": new FormControl('', Validators.required),
      "doexpected": new FormControl({value: new Date(), disabled: false}, Validators.required),
      "totalitem": new FormControl('', Validators.required),
      "expectedtotal": new FormControl('', Validators.required),
      "customerorderstatus": new FormControl('', Validators.required),
      "description": new FormControl('', Validators.required),
      "customer": new FormControl('', Validators.required),
      "employee": new FormControl('', Validators.required),
      "doplaced": new FormControl({value: new Date(), disabled: true}, Validators.required)
    });

    this.innerform = this.fb.group({
      "product": new FormControl('', Validators.required),
      "amount": new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.createView();
    this.cs.getAll("").then((customers: Customer[]) => this.customers = customers);
    this.es.getAll("").then((emps: Employee[]) => this.employees = emps);
    this.ps.getAll("").then((pcts: Product[]) => this.products = pcts);
    this.cost.getAllList().then((cost: CustomerOrderstatus[]) => this.customerorderstatuses = cost);

    this.rx.get("customerorders").then((regs: []) => {
      this.regexes = regs;
      this.createForm();
    });

  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }

  createForm() {
    this.form.controls['number'].setValidators([Validators.required]);
    this.form.controls['customer'].setValidators([Validators.required]);
    this.innerform.controls['product'].setValidators([Validators.required]);
    this.innerform.controls['amount'].setValidators([Validators.required]);
    this.form.controls['totalitem'].setValidators([Validators.required]);
    this.form.controls['expectedtotal'].setValidators([Validators.required]);
    this.form.controls['doplaced'].setValidators([Validators.required]);
    this.form.controls['doexpected'].setValidators([Validators.required]);
    this.form.controls['description'].setValidators([Validators.required, Validators.pattern(this.regexes['description']['regex'])]);
    this.form.controls['customerorderstatus'].setValidators([Validators.required]);
    this.form.controls['employee'].setValidators([Validators.required]);

    Object.values(this.form.controls).forEach(control => {
      control.markAsUntouched();
      control.markAsPristine();
    });
    Object.values(this.innerform.controls).forEach(control => {
      control.markAsUntouched();
      control.markAsPristine();
    });


    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {
            if (controlName === "doplaced") {
              value = new Date().toISOString();
            }
            // @ts-ignore
            if (controlName == "doexpected")
              value = this.dp.transform(new Date(value), 'yyyy-MM-dd');
            if (this.oldcustomerorder != undefined && control.valid) {
              // @ts-ignore
              if (value === this.clientOrder[controlName]) {
                control.markAsPristine();
              } else {
                control.markAsDirty();
              }
            } else {
              control.markAsPristine();
            }
          }
      );
      this.enableButtons(false,true,true);
    }

    for (const controlName in this.innerform.controls) {
      const control = this.innerform.controls[controlName];
      control.valueChanges.subscribe(value => {
            if (this.oldinnerdata != undefined && control.valid) {
              // @ts-ignore
              if (value === this.innerdata[controlName]) {
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
    // this.filterProducts();
    this.enableButtons(true, false, false);

  }

  loadTable(query: string) {

    this.cos.getAll(query)
        .then((ords: CustomerOrder[]) => {
          this.orders = ords;
          this.imageurl = 'assets/fullfilled.png';
        })
        .catch((error) => {
          console.log(error);
          this.imageurl = 'assets/rejected.png';
        })
        .finally(() => {
          this.data = new MatTableDataSource(this.orders);
          this.data.paginator = this.paginator;
        });
  }

  // filterProducts(): void {
  //
  //   this.form.get("product")?.valueChanges.subscribe((sup:Product)=>{
  //     this.cos.getMaxNumber().then(maxnumber=>{
  //       if(maxnumber==null){
  //         this.form.get("number")?.setValue("CO0001")
  //       }else {
  //         let s1 = JSON.stringify(maxnumber).toString();
  //         let match1 = s1.match(/\d+/);
  //         // @ts-ignore
  //         let match = parseInt(match1[0], 10);
  //         this.form.get("number")?.setValue("CO000" + ++match);
  //       }
  //     })
  //   })
  //
  // }

  filterTable(): void {

    const cserchdata = this.csearch.getRawValue();
    // @ts-ignore
    this.data.filterPredicate = (co: Customerorder, filter: string) => {
      console.log(cserchdata, co)
      return (cserchdata.csnumber == null || co.number.includes(cserchdata.csnumber)) &&
          (cserchdata.cscustomer == null || co.customer.fullname.toLowerCase().includes(cserchdata.cscustomer)) &&
          (cserchdata.csemployee == null || co.employee.callingname.toLowerCase().includes(cserchdata.csemployee)) &&
          (cserchdata.csdoexpected == null || co.doexpected.includes(cserchdata.csdoexpected)) &&
          (cserchdata.csdescription == null || co.description.toLowerCase().includes(cserchdata.csdescription)) &&
          (cserchdata.cscustomerorderstatus == null || co.customerorderstatus.name.toLowerCase().includes(cserchdata.cscustomer));
    };

    this.data.filter = 'xx';
  }

  btnSearchMc() {

    const ssearchdata = this.ssearch.getRawValue();
    let statusid = ssearchdata.ssorderstatus;
    let customerid = ssearchdata.sscustomer;
    let doplaced = this.dp.transform(ssearchdata.ssdoplaced, 'yyyy-MM-dd');
    let doexpected = this.dp.transform(ssearchdata.ssdoexpected, 'yyyy-MM-dd');

    let query = "";
    if (statusid != null) query = query + "&custstatusid=" + statusid;
    if (customerid != null) query = query + "&customerid=" + customerid;
    if (doplaced != null) query = query + "&doplaced=" + doplaced;
    if (doexpected != null) query = query + "&doexpected=" + doexpected;

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
        this.ssearch.reset();
        this.loadTable("");
      }
    });

  }

  getBtn(element: CustomerOrder) {
    return `<button mat-raised-button>Remove</button>`;
  }

  id = 0;

  calculateGrandTotal() {
    // Ensure grandtotal is calculated from the correct source
    this.grandtotal = this.orderproducts.reduce((acc, item) => acc + item.expectedcost, 0);

    // Update the form control for expected total
    this.form.controls['expectedtotal'].setValue(this.grandtotal);
    // console.log(this.grandtotal);
  }

  deleteRaw(x: any) {

    // this.indata.data = this.indata.data.reduce((element) => element.id !== x.id);
    let datasources = this.indata.data;
    const index = datasources.findIndex(item => item.id === x.id);

    if (index > -1) {
      datasources.splice(index, 1);
    }
    this.indata.data = datasources;
    this.orderproducts = this.indata.data;
    this.form.controls['totalitem'].setValue(this.orderproducts.length)
    this.calculateGrandTotal();
  }

  fillInnerForm(orderProduct: Orderproduct) {
    this.innerdata = JSON.parse(JSON.stringify(orderProduct));
    this.oldinnerdata = JSON.parse(JSON.stringify(orderProduct));

    console.log(this.innerdata)
    console.log(this.orderproducts)
    this.innerdata.orderproduct = this.orderproducts.find((o) => o.id === this.innerdata.orderproduct.id);
    this.innerform.patchValue(this.innerdata);
  }

  enableButtons(add: boolean, upd: boolean, del: boolean) {
    this.dsaadd = add;
    this.dsaupd = upd;
    this.dsadel = del;
  }

  getErrors(): string {
    let errors: string = "";
    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      if (control.errors) errors = errors + "<br>Invalid " + controlName;
    }
    return errors;
  }

  btnaddMc() {
    const innerdata = this.innerform.getRawValue();
    console.log(innerdata)

    if (innerdata != null) {
      const { product, amount, customerorder } = innerdata;

      console.log(innerdata)
      console.log(innerdata.customerorder)
      // Calculate the line total
      if (product.quantity < amount) innerdata.amount = product.quantity;
      else innerdata.amount = amount;
      const expectedlinecost = product.price * amount;
      // Increment the ID for the next item
      this.id++;
      // Create a new Orderproduct
      const orderitem = new Orderproduct(this.id, expectedlinecost , amount, customerorder, product);
      // Add the new item to the existing list
      this.orderproducts.push(orderitem);
      this.form.controls['totalitem'].setValue(this.orderproducts.length)
      // Update the data source with the new list
      this.updateDataSource();
      // Calculate the new grand total
      this.calculateGrandTotal();
      // Reset the inner form
      this.innerform.reset();
      const innerForm = this.myInnerForm.nativeElement as HTMLFormElement;
      innerForm.reset();
      Object.values(this.innerform.controls).forEach(control => {
        control.markAsUntouched();
      });

    }
  }

  fillForm(customerorder: CustomerOrder) {

    this.enableButtons(false, true, true);

    this.selectedrow = customerorder;
    this.customerorder = JSON.parse(JSON.stringify(customerorder));
    this.oldcustomerorder = JSON.parse(JSON.stringify(customerorder));

    // @ts-ignore
    this.customerorder.customerorderstatus = this.customerorderstatuses.find(s => s.id === this.customerorder.customerorderstatus.id);
    // @ts-ignore
    this.customerorder.employee = this.employees.find(e => e.id === this.customerorder.employee.id);
    // @ts-ignore
    this.customerorder.customer = this.customers.find(e => e.id === this.customerorder.customer.id);

    this.indata = new MatTableDataSource(this.customerorder.orderproducts);

    this.form.patchValue(this.customerorder);
    this.form.markAsPristine();
    this.updateDataSource();
    this.calculateGrandTotal();
  }

  updateDataSource() {
    this.indata = new MatTableDataSource(this.orderproducts);
  }

  // clearProductCategorySubscription() {
  //   if (this.productCategorySubscription) {
  //     this.productCategorySubscription.unsubscribe();
  //   }
  // }

  getUpdates(): string {
    let updates: string = "";
    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      if (control.dirty ) {
        updates = updates + "<br>" + controlName.charAt(0).toUpperCase() + controlName.slice(1) + " Changed";
      }
    }
    for (const controlName in this.innerform.controls) {
      const control = this.innerform.controls[controlName];
      if (control.dirty) {
        updates = updates + "<br>" + controlName.charAt(0).toUpperCase() + controlName.slice(1) + " Changed";
      }
    }
    if (JSON.stringify(this.orderproducts) !== JSON.stringify(this.oldOrderproducts)) {
      updates = updates + "<br>Products in the GRN Changed";
    }
    return updates;
  }

  clear(): void {
    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Customer Order Clear",
        message: "Are you sure to Clear following Details ? <br> <br>"
      }
    });
    confirm.afterClosed().subscribe(async result => {
      if (result) {
        this.resetForms();
      }
    });
  }

  resetForms() {
    const form = this.myForm.nativeElement as HTMLFormElement;
    form.reset();
    const innerForm = this.myInnerForm.nativeElement as HTMLFormElement;
    innerForm.reset();

    this.selectedrow = null;
    // @ts-ignore
    this.customerorder = null;
    // @ts-ignore
    this.customerorder = null;

    // @ts-ignore
    this.indata = new MatTableDataSource([]);
    this.form.controls['number'].reset();
    // this.filterProducts() ;
    this.form.controls['doplaced'].setValue(new Date());
    this.enableButtons(true, false, false);
  }

  add() {

    let errors = this.getErrors();
    if (errors != "") {
      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Customer Order Add ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => {
        if (!result) {
          return;
        }
      });
    } else {

      this.customerorder = this.form.getRawValue();
      this.customerorder.orderproducts = this.orderproducts;

      // @ts-ignore
      this.orderproducts.forEach((i) => delete i.id);
      //CHECK this.customerorder.doplaced = new Date().toISOString();
      // @ts-ignore
      this.customerorder.doexpected = this.dp.transform(this.customerorder.doexpected, "yyyy-MM-dd");
      let invdata: string = "";

      invdata = invdata + "<br>Ordered By : " + this.customerorder.customer.fullname
      invdata = invdata + "<br>Expected Date is : " + this.customerorder.doexpected;

      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Customer Order Add",
          message: "Are you sure to Add the following Customer Order? <br> <br>" + invdata
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found";

      confirm.afterClosed().subscribe(async result => {
        if (result) {
          this.cos.add(this.customerorder).then((response: [] | undefined) => {
            //console.log("Res-" + response);
            //console.log("Un-" + response == undefined);
            if (response != undefined) { // @ts-ignore
              console.log("Add-" + response['id'] + "-" + response['url'] + "-" + (response['errors'] == ""));
              // @ts-ignore
              addstatus = response['errors'] == "";
              console.log("Add Status - " + addstatus);
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
              this.loadTable("");
              this.resetForms();

              Object.values(this.form.controls).forEach(control => {
                control.markAsUntouched();
              });
              Object.values(this.innerform.controls).forEach(control => {
                control.markAsUntouched();
              });
              this.loadTable("");
            }

            const stsmsg = this.dg.open(MessageComponent, {
              width: '500px',
              data: {heading: "Status - Customer Order Add", message: addmessage}
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
        data: {heading: "Errors - Customer Order Update ", message: "You have following Errors <br> " + errors}
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
            heading: "Confirmation - Csutomer Order Update",
            message: "Are you sure to Save following Updates? <br> <br>" + updates
          }
        });
        confirm.afterClosed().subscribe(async result => {
          if (result) {

            this.customerorder = this.form.getRawValue();
            this.customerorder.orderproducts = this.orderproducts;

            // @ts-ignore
            this.orderproducts.forEach((i) => delete i.id);

            // @ts-ignore
            this.customerorder.doexpected = this.dp.transform(this.customerorder.doexpected, 'yyyy-MM-dd');

            //CHECK this.customerorder.doplaced = new Date(this.customerorder.doplaced).toISOString()

            this.customerorder.id =   this.oldcustomerorder.id;
            console.log(this.customerorder);
            this.cos.update(this.customerorder).then((response: [] | undefined) => {
              if (response != undefined) {
                // @ts-ignore
                updstatus = response['errors'] == "";
                if (!updstatus) { // @ts-ignore
                  updmessage = response['errors'];
                }
              } else {
                updstatus = false;
                updmessage = "Content Not Found"
              }
            }).finally(() => {
              if (updstatus) {
                updmessage = "Successfully Updated";
                this.loadTable('');
                this.resetForms();
                Object.values(this.form.controls).forEach(control => control.markAsUntouched());
                Object.values(this.innerform.controls).forEach(control => control.markAsUntouched());

              }

              const stsmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Status -Customer Order Update", message: updmessage}
              });
              stsmsg.afterClosed().subscribe(async result => {
                if (result) {
                  return;
                }
              });

            });
          }
        });
      } else {

        const updmsg = this.dg.open(MessageComponent, {
          width: '500px',
          data: {heading: "Confirmation -Customer Order Update", message: "Nothing Changed"}
        });
        updmsg.afterClosed().subscribe(async result => {
          if (!result) {
            return;
          }

        });
      }
    }
  }
  delete(): void {

    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Customer Order Delete",
        message: "Are you sure to Delete following Customer Order of Customer ? <br> <br>" + this.customerorder.customer.fullname
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        let delstatus: boolean = false;
        let delmessage: string = "Server Not Found";

        this.cos.delete(this.customerorder.id).then((response: [] | undefined) => {

          if (response != undefined) { // @ts-ignore
            delstatus = response['errors'] == "";
            if (!delstatus) { // @ts-ignore
              delmessage = response['errors'];
            }
          } else {
            delstatus = false;
            delmessage = "Content Not Found"
          }
        }).finally(() => {
          if (delstatus) {
            delmessage = "Successfully Deleted";
            this.resetForms();

            Object.values(this.form.controls).forEach(control => {
              control.markAsUntouched();
            });
            Object.values(this.innerform.controls).forEach(control => {
              control.markAsUntouched();
            });

            this.loadTable("");
          }
          const stsmsg = this.dg.open(MessageComponent, {
            width: '500px',
            data: {heading: "Status - Customer Order Delete ", message: delmessage}
          });
          stsmsg.afterClosed().subscribe(async result => {
            if (!result) return;
          });

        });
      }
    });
  }

}
