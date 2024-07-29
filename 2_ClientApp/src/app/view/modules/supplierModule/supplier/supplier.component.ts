import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Supplier} from "../../../../entity/supplier";
import {UiAssist} from "../../../../util/ui/ui.assist";
import {AuthorizationManager} from "../../../../service/authorizationmanager";
import {SupplierService} from "../../../../service/supplierservice";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ConfirmComponent} from "../../../../util/dialog/confirm/confirm.component";
import {SupplierStatus} from "../../../../entity/supplierstatus";
import {Employee} from "../../../../entity/employee";
import {SupplierstatusService} from "../../../../service/supplierstatusservice";
import {EmployeeService} from "../../../../service/employeeservice";
import {MatDialog} from "@angular/material/dialog";
import {MessageComponent} from "../../../../util/dialog/message/message.component";
import {SupplierFormComponent} from "../supplier-form/supplier-form.component";

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {

  columns: string[] = ['regno', 'name', 'telephone', 'supplierstatus', 'employee', 'action'];
  headers: string[] = ['Reg. No', 'Name', 'Telephone', 'Supplier Status', 'Employee', 'Action'];
  binders: string[] = ['regno', 'name', 'telephone', 'supplierstatus.name', 'employee.fullname', '<td>edit</td>'];

  cscolumns: string[] = ['csRegNo', 'csName', 'csTelephone', 'csSupplierStatus', 'csEmployee'];
  csprompts: string[] = ['Search by Registration Number', 'Search by Name', 'Search by Telephone',
    'Search by Supplier Status', 'Search by Employee'];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  supplier!: Supplier;
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

  uiassist: UiAssist;

  constructor(
    private supService: SupplierService,
    private fb: FormBuilder,
    private supStatusService: SupplierstatusService,
    private employeeService: EmployeeService,
    private dialog: MatDialog,
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

  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
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
      return (csSearchData.csRegNo == null || supplier.regno.toLowerCase().includes(csSearchData.csRegNo.toLowerCase())) &&
        (csSearchData.csName == null || supplier.name.toLowerCase().includes(csSearchData.csName.toLowerCase())) &&
        (csSearchData.csTelephone == null || supplier.telephone.includes(csSearchData.csTelephone)) &&
        (csSearchData.csSupplierStatus == null || supplier.supplierstatus.name.toLowerCase().includes(csSearchData.csSupplierStatus.toLowerCase())) &&
        (csSearchData.csEmployee == null || supplier.employee.fullname.toLowerCase().includes(csSearchData.csEmployee.toLowerCase()));
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
            this.enableButtons(true,false,false);
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

  openPopup(supplier: any, title: any): void {
    var popup = this.dialog.open(SupplierFormComponent, {
      width: '400px',
      data: {
        title: title,
        supplier: supplier
      }
    });
    popup.afterClosed().subscribe(item => this.loadTable(""));
  }

  addEmployee(){
    this.openPopup(0, "Add Supplier");
  }

  editEmployee(supplier: Supplier){
    this.openPopup(supplier, "Edit Supplier");
  }
}
