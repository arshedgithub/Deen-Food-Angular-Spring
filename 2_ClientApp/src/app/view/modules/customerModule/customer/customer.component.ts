import {Component, Input, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Employee} from "../../../../entity/employee";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Gender} from "../../../../entity/gender";
import {UiAssist} from "../../../../util/ui/ui.assist";
import {EmployeeService} from "../../../../service/employeeservice";
import {GenderService} from "../../../../service/genderservice";
import {MatDialog} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {AuthorizationManager} from "../../../../service/authorizationmanager";
import {ConfirmComponent} from "../../../../util/dialog/confirm/confirm.component";
import {MessageComponent} from "../../../../util/dialog/message/message.component";
import {Customerstatus} from "../../../../entity/customerstatus";
import {Customer} from "../../../../entity/customer";
import {CustomerService} from "../../../../service/customerservice";
import {CustomerstatusService} from "../../../../service/customerstatusservice";
import {CustomerFormComponent} from "../customer-form/customer-form.component";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  columns: string[] = ['customernumber', 'fullname', 'gender', 'contact', 'email', 'edit'];
  headers: string[] = ['Number', 'Name', 'Gender', 'Contact', 'Email', ''];
  binders: string[] = ['customernumber', 'fullname', 'gender.name', 'contact', 'email', ''];

  cscolumns: string[] = ['csnumber', 'csname', 'csgender', 'cscontact', 'csemail','csempty1'];
  csprompts: string[] = ['Search by Number', 'Search by Name', 'Search by Gender', 'Search by Contact', 'Search by Email', ''];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  @Input() selectedRow!: any;

  customer!: Customer;
  customers: Array<Customer> = [];
  data!: MatTableDataSource<Customer>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // enaadd:boolean = false;
  // enaupd:boolean = false;

  genders: Array<Gender> = [];
  customerstatuses: Array<Customerstatus> = [];
  employees: Array<Employee> = [];

  uiassist: UiAssist;

  constructor(
      private es: EmployeeService,
      private gs: GenderService,
      private cs: CustomerService,
      private ss: CustomerstatusService,
      private fb: FormBuilder,
      private dg: MatDialog,
      public authService:AuthorizationManager) {


    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      "csnumber": new FormControl(),
      "csname": new FormControl(),
      "csgender": new FormControl(),
      "cscontact": new FormControl(),
      "csemail": new FormControl()
    });

    this.ssearch = this.fb.group({
      "ssgender": new FormControl(),
      "sscustomerstatus": new FormControl(),
    });

  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {

    this.createView();

    this.gs.getAllList().then((gens: Gender[]) => {
      this.genders = gens;
    });

    this.ss.getAllList().then((statuses: Customerstatus[]) => {
      this.customerstatuses = statuses;
    });

  }

  editSelectedCustomer(row: any) {
    this.editCustomer(row);
  }

  deleteSelectedCustomer(row: any) {
    this.delete(row);
  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }


  loadTable(query: string) {

    this.cs.getAll(query)
        .then((customers: Customer[]) => {
          this.customers = customers;
          this.imageurl = 'assets/fullfilled.png';
        })
        .catch((error) => {
          console.log(error);
          this.imageurl = 'assets/rejected.png';
        })
        .finally(() => {
          this.data = new MatTableDataSource(this.customers);
          this.data.paginator = this.paginator;
        });
  }

  filterTable(): void {

    const cserchdata = this.csearch.getRawValue();

    this.data.filterPredicate = (customer: Customer, filter: string) => {
      return (cserchdata.csnumber == null || customer.customernumber.toLowerCase().includes(cserchdata.csnumber)) &&
          (cserchdata.csname == null || customer.fullname.toLowerCase().includes(cserchdata.csname.toLowerCase())) &&
          (cserchdata.csgender == null || customer.gender.name.toLowerCase().includes(cserchdata.csgender.toLowerCase())) &&
          (cserchdata.cscontact == null || customer.contact.includes(cserchdata.cscontact)) &&
          (cserchdata.csemail == null || customer.email.toLowerCase().includes(cserchdata.csemail.toLowerCase()));
    };
    this.data.filter = 'xx';
  }

  btnSearchMc(): void {

    const sserchdata = this.ssearch.getRawValue();
    let genderid = sserchdata.ssgender;
    let statusid = sserchdata.sscustomerstatus;

    let query = "";
    if (genderid != null) query = query + "&genderid=" + genderid;
    if (statusid != null) query = query + "&custstatusid=" + statusid;
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


  delete(customer:Customer) {

    this.customer = customer;

    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Employee Delete",
        message: "Are you sure to Delete following Employee? <br> <br>" + this.customer.callingname
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        let delstatus: boolean = false;
        let delmessage: string = "Server Not Found";

        this.es.delete(this.customer.id).then((response: [] | undefined) => {

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
            Object.values(this.form.controls).forEach(control => { control.markAsTouched(); });
            this.loadTable("");
          }

          const stsmsg = this.dg.open(MessageComponent, {
            width: '500px',
            data: {heading: "Status - Customer Delete ", message: delmessage}
          });
          stsmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

        });
      }
    });
  }

  openPopup(customer: any, title: any): void {
    var popup = this.dg.open(CustomerFormComponent, {
      width: '400px',
      data: {
        title: title,
        customer: customer,
      }
    });
    popup.afterClosed().subscribe(item => this.loadTable(""));
  }

  editCustomer(customer: Customer){
    this.openPopup(customer, "Edit Customer")
  }

  addCustomer(){
    this.openPopup(0, "Add Customer");
  }

}
