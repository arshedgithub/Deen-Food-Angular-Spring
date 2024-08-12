import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Production} from "../../../entity/production";
import {Productionstatus} from "../../../entity/productionstatus";
import {Productionorder} from "../../../entity/productionorder";
import {Product} from "../../../entity/product";
import {Employee} from "../../../entity/employee";
import {ProductionOrderProduct} from "../../../entity/productionorderproduct";
import {MatTableDataSource} from "@angular/material/table";
import {UiAssist} from "../../../util/ui/ui.assist";
import {MatPaginator} from "@angular/material/paginator";
import {ProductionService} from "../../../service/productionservice";
import {ProdOrderStatusService} from "../../../service/prodorderstatusservice";
import {ProductionOrderService} from "../../../service/productionorderservice";
import {EmployeeService} from "../../../service/employeeservice";
import {ProductService} from "../../../service/productservice";
import {RegexService} from "../../../service/regexservice";
import {ProductionstatusService} from "../../../service/productionstatusservice";
import {DatePipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {MessageComponent} from "../../../util/dialog/message/message.component";

@Component({
    selector: 'app-production',
    templateUrl: './production.component.html',
    styleUrls: ['./production.component.css']
})
export class ProductionComponent {

    @ViewChild('myForm', {static: false}) myForm!: ElementRef;

    public csearch!: FormGroup;
    public ssearch!: FormGroup;
    public form!: FormGroup;

    columns: string[] = ['number', 'product', 'amount', 'productionstatus', 'placed', 'employee'];
    headers: string[] = ['Number', 'Product', 'Amount', 'Production Status', 'Date Placed', 'Employee'];
    binders: string[] = ['number', 'product.productnumber', 'amount', 'productionstatus.name', 'placed', 'employee.fullname'];

    cscolumns: string[] = ['csnumber', 'csproduct', 'csamount', 'csproductionstatus', 'csplaced', 'csemployee'];
    csprompts: string[] = ['Search by Pr. Number', 'Search by Date Placed', 'Search by Amount',
        'Search by Production Status', 'Search by Product', 'Search by Employee'];


    data!: MatTableDataSource<Production>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    //indata!: MatTableDataSource<Productionorderproduct>

    orders: Array<Production> = [];
    productionstatuses: Array<Productionstatus> = [];
    productionorders: Array<Productionorder> = [];
    products: Array<Product> = [];
    employees: Array<Employee> = [];
    oldProducts: Array<Product> = [];

    popitems: Array<ProductionOrderProduct> = [];

    imageurl: string = '';

    regexes: any;
    uiassist: UiAssist;

    production!: Production;
    oldProduction!: Production;

    //innerdata: any;
    //oldinnerdata: any;

    selectedrow: any;
    selectedinnerrow: any;

    dsaadd: boolean = false;
    dsaupd: boolean = false;
    dsadel: boolean = false;

    constructor(
        private pos: ProductionService,
        private posts: ProdOrderStatusService,
        private poss: ProductionOrderService,
        private pcs: ProductionstatusService,
        private es: EmployeeService,
        private fb: FormBuilder,
        private ps: ProductService,
        private rx: RegexService,
        private dp: DatePipe,
        private dg: MatDialog,
        private cdr: ChangeDetectorRef
    ) {
        this.uiassist = new UiAssist(this);

        this.csearch = this.fb.group({
            "csnumber": new FormControl(),
            "csemployee": new FormControl(),
            "csplaced": new FormControl(),
            "csamount": new FormControl(),
            "csproductionstatus": new FormControl(),
            "csproduct": new FormControl()
        });

        this.ssearch = this.fb.group({
            "ssdate": new FormControl(),
            "ssplaced": new FormControl(),
            "ssproductionstatus": new FormControl(),
        });

        this.form = this.fb.group({
            "number": new FormControl('', Validators.required),
            "doplaced": new FormControl({value: new Date(), disabled: false}, Validators.required),
            "date": new FormControl(Validators.required),
            "description": new FormControl('', [Validators.required]),
            "product": new FormControl(Validators.required),
            "amount": new FormControl('', Validators.required),
            "productionstatus": new FormControl(Validators.required),
            "productionOrder": new FormControl(Validators.required),
            "production": new FormControl(Validators.required),
            "employee": new FormControl('', Validators.required)
        });

    }

    ngOnInit() {
        this.initialize();
    }

    initialize() {
        this.createView();
        this.pcs.getAllList().then((pcs: Productionstatus[]) => {
            this.productionstatuses = pcs;
        });
        this.poss.getAll("").then((poss: Productionorder[]) => this.productionorders = poss);
        this.ps.getAll("").then((ps: Product[]) => this.products = ps);
        this.es.getAllListNameId().then((emps: Employee[]) => this.employees = emps);

        this.rx.get("productions").then((regs: []) => {
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
        this.form.controls['date'].setValidators([Validators.required]);
        this.form.controls['amount'].setValidators([Validators.required, Validators.pattern(this.regexes['amount']['regex'])]);
        this.form.controls['doplaced'].setValidators([Validators.required]);
        this.form.controls['description'].setValidators([Validators.required, Validators.pattern(this.regexes['description']['regex'])]);
        this.form.controls['productionstatus'].setValidators([Validators.required]);
        this.form.controls['productionOrder'].setValidators([Validators.required]);
        this.form.controls['employee'].setValidators([Validators.required]);
        this.form.controls['product'].setValidators([Validators.required]);

        Object.values(this.form.controls).forEach(control => {
            control.markAsUntouched();
            control.markAsPristine();
        });

        for (const controlName in this.form.controls) {
            const control = this.form.controls[controlName];
            control.valueChanges.subscribe(value => {
                    // @ts-ignore
                    if (controlName == "date" || controlName == "doplaced")
                        value = this.dp.transform(new Date(value), 'yyyy-MM-dd');
                    // console.log("Date" +value);
                    if (this.oldProduction != undefined && control.valid) {
                        // @ts-ignore
                        if (value === this.production[controlName]) {
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
        // this.fillNumber();
        this.enableButtons(false, true, true);
    }

    loadTable(query: string) {

        this.pos.getAll(query)
            .then((ords: Production[]) => {
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

    // fillNumber(): void {
    //   this.pos.getMaxNumber().then(maxNumber => {
    //     if (maxNumber === null) this.form.get("number")?.setValue("OD0001");
    //     else {
    //       let s1 = JSON.stringify(maxNumber).toString();
    //       // console.log(s1); ex OD0001
    //       let match1 = s1.match(/\d+/);
    //       // @ts-ignore
    //       let match = parseInt(match1[0], 10);
    //       this.form.get("number")?.setValue("PRO000" + ++match);
    //     }
    //   });
    //
    //
    // }

    filterTable(): void {

        const cserchdata = this.csearch.getRawValue();

        // @ts-ignore
        this.data.filterPredicate = (pOrder: Production, filter: string) => {
            return (cserchdata.csnumber == null || pOrder.number.includes(cserchdata.csnumber)) &&
                (cserchdata.csemployee == null || pOrder.employee.callingname.toLowerCase().includes(cserchdata.csemployee)) &&
                (cserchdata.csplaced == null || pOrder.doplaced.includes(cserchdata.csplaced)) &&
                (cserchdata.csamount == null || pOrder.amount.toString(cserchdata.csamount)) &&
                (cserchdata.csproductionstatus == null || pOrder.productionstatus.name.toString().includes(cserchdata.csproductionstatus)) &&
                (cserchdata.csproduct == null || pOrder.product.productnumber.toLowerCase().includes(cserchdata.csproduct))
        };
        this.data.filter = 'xx';
    }

    btnSearchMc() {

        const ssearchdata = this.ssearch.getRawValue();

        let number = ssearchdata.ssnumber;
        let productionstatusid = ssearchdata.ssproductionstatus;
        let date = this.dp.transform(ssearchdata.ssdate, 'yyyy-MM-dd');

        let query = "";
        if (number != null) query = query + "&number=" + number;
        if (productionstatusid != null) query = query + "&productionstatusid=" + productionstatusid;
        if (date != null && date.trim() != "") query = query + "&date=" + date;

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

    fillForm(production: Production) {
        this.enableButtons(true, false, false);

        this.selectedrow = production;
        this.production = JSON.parse(JSON.stringify(production));
        this.oldProduction = JSON.parse(JSON.stringify(production));


        // @ts-ignore
        this.production.employee = this.employees.find(e => e.id === this.production.employee.id);
        // @ts-ignore
        this.production.productionstatus = this.productionstatuses.find(s => s.id === this.production.productionstatus.id);
        // @ts-ignore
        this.production.productionOrder = this.productionorders.find(o => o.id === this.production.productionOrder.id);
        // Update the form values
        this.form.patchValue(this.production);
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

        if (JSON.stringify(this.popitems) !== JSON.stringify(this.oldProducts)) {
            updates = updates + "<br>Products in the Order Changed";
        }
        return updates;

    }

    clear(): void {
        const confirm = this.dg.open(ConfirmComponent, {
            width: '500px',
            data: {
                heading: "Confirmation - Production Clear",
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

        this.createForm();
        this.form.controls['doplaced'].setValue(new Date());
        this.selectedrow = null;
// @ts-ignore
        this.production = null;
// @ts-ignore
        this.oldProduction = null;

// @ts-ignore
        this.indata = new MatTableDataSource([]);

        this.enableButtons(true, false, false);


    }

    add() {

        let errors = this.getErrors();

        if (errors != "") {
            const errmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Errors - Production Add ", message: "You have following Errors <br> " + errors}
            });
            errmsg.afterClosed().subscribe(async result => {
                if (!result) {
                    return;
                }
            });
        } else {

            this.production = this.form.getRawValue();
            // @ts-ignore
            this.production.doplaced = this.dp.transform(this.production.doplaced, "yyyy-MM-dd");

            let invdata: string = "";

            invdata = invdata + "<br>Placed Day is : " + this.production.doplaced
            invdata = invdata + "<br>Production Number : " + this.production.number;

            const confirm = this.dg.open(ConfirmComponent, {
                width: '500px',
                data: {
                    heading: "Confirmation - Production Add",
                    message: "Are you sure to Add the following Production? <br> <br>" + invdata
                }
            });

            let addstatus: boolean = false;
            let addmessage: string = "Server Not Found";

            confirm.afterClosed().subscribe(async result => {
                if (result) {
                    this.pos.add(this.production).then((response: [] | undefined) => {
                        //console.log("Res-" + response);
                        //console.log("Un-" + response == undefined);
                        if (response != undefined) { // @ts-ignore
                            console.log("Add-" + response['id'] + "-" + response['url'] + "-" + (response['errors'] == ""));
                            // @ts-ignore
                            addstatus = response['errors'] == "";
                            console.log("Add Status" + addstatus);
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
                            this.resetForms();
                            Object.values(this.form.controls).forEach(control => {
                                control.markAsUntouched();
                            });
                            /* Object.values(this.innerform.controls).forEach(control => {
                               control.markAsUntouched();
                             });
                             this.loadTable("");
                           }*/
                        }
                        const stsmsg = this.dg.open(MessageComponent, {
                            width: '500px',
                            data: {heading: "Status -Production Add", message: addmessage}
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
                data: {heading: "Errors - Production Update ", message: "You have following Errors <br> " + errors}
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
                        heading: "Confirmation - Production Update",
                        message: "Are you sure to Save following Updates? <br> <br>" + updates
                    }
                });
                confirm.afterClosed().subscribe(async result => {
                    if (result) {

                        this.production = this.form.getRawValue();

                        //this.production.productionorderproducts = this.popitems;

                        // @ts-ignore
                        //this.popitems.forEach((i) => delete i.id);

                        // @ts-ignore
                        this.production.placed = this.dp.transform(this.production.placed, 'yyyy-MM-dd');

                        // @ts-ignore
                        // this.production.dorequired = this.dp.transform(this.productionOrder.dorequired, 'yyyy-MM-dd');

                        this.production.id = this.oldProduction.id;

                        this.pos.update(this.production).then((response: [] | undefined) => {
                            if (response != undefined) { // @ts-ignore
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

                                this.resetForms();
                                Object.values(this.form.controls).forEach(control => control.markAsUntouched());
                                //Object.values(this.innerform.controls).forEach(control => control.markAsUntouched());
                                this.loadTable("");
                            }

                            const stsmsg = this.dg.open(MessageComponent, {
                                width: '500px',
                                data: {heading: "Status -Production Update", message: updmessage}
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
                    data: {heading: "Confirmation -Production Update", message: "Nothing Changed"}
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
                heading: "Confirmation - Production Delete",
                message: "Are you sure to Delete following Production ? : <br> <br>" + this.production.number
            }
        });

        confirm.afterClosed().subscribe(async result => {
            if (result) {
                let delstatus: boolean = false;
                let delmessage: string = "Server Not Found";

                this.pos.delete(this.production.id).then((response: [] | undefined) => {

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
                        //Object.values(this.innerform.controls).forEach(control => {
                        //control.markAsUntouched();
                        //});

                        this.loadTable("");
                    }
                    const stsmsg = this.dg.open(MessageComponent, {
                        width: '500px',
                        data: {heading: "Status - Production Delete ", message: delmessage}
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
