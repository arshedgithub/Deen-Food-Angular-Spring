import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {Productionorder} from "../../../entity/productionorder";
import {Prodorderstatus} from "../../../entity/prodorderstatus";
import {UiAssist} from "../../../util/ui/ui.assist";
import {ProdOrderStatusService} from "../../../service/prodorderstatusservice";
import {ProductionOrderService} from "../../../service/productionorderservice";
import {RegexService} from "../../../service/regexservice";
import {DatePipe} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MessageComponent} from "../../../util/dialog/message/message.component";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {ProductionOrderProduct} from "../../../entity/productionorderproduct";
import {Employee} from "../../../entity/employee";
import {Product} from "../../../entity/product";
import {EmployeeService} from "../../../service/employeeservice";
import {ProductService} from "../../../service/productservice";

@Component({
    selector: 'app-production-order',
    templateUrl: './production-order.component.html',
    styleUrls: ['./production-order.component.css']
})
export class ProductionOrderComponent {

    @ViewChild('myForm', {static: false}) myForm!: ElementRef;
    @ViewChild('myInnerForm', {static: false}) myInnerForm!: ElementRef;

    public csearch!: FormGroup;
    public ssearch!: FormGroup;
    public form!: FormGroup;
    public innerform!: FormGroup;

    columns: string[] = ['orderNumber', 'doplaced', 'dorequired', 'description', 'productionOrderstatus', 'employee'];
    headers: string[] = ['Order No', 'Date Placed', 'Date Required', 'Description', 'Pr. Order Status', 'Employee'];
    binders: string[] = ['orderNumber', 'doplaced', 'dorequired', 'description', 'productionOrderstatus.name', 'employee.callingname'];

    cscolumns: string[] = ['csordernumber', 'csdoplaced', 'csdorequired', 'csdescription', 'csproductionorderstatus', 'csemployee'];
    csprompts: string[] = ['Search by Order No', 'Search by Date Placed', 'Search by Date Required',
        'Search by Description', 'Search by Production Order Status', 'Search by Employee'];

    incolumns: string[] = ['code', 'amount', 'remove'];
    inheaders: string[] = ['Product Code', 'Amount', ''];
    inbinders: string[] = ['product.productnumber', 'amount', 'getBtn()'];

    data!: MatTableDataSource<Productionorder>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    indata!: MatTableDataSource<ProductionOrderProduct>

    orders: Array<Productionorder> = [];
    postatuses: Array<Prodorderstatus> = [];
    employees: Array<Employee> = [];

    products: Array<Product> = [];
    oldProducts: Array<Product> = [];

    productionorderproducts: Array<ProductionOrderProduct> = [];
    oldproductionorderproducts: Array<ProductionOrderProduct> = [];

    productionorderproduct!: ProductionOrderProduct;
    oldproductionorderproduct!: ProductionOrderProduct;

    imageurl: string = '';

    regexes: any;
    innerregexes: any;
    uiassist: UiAssist;

    productionOrder!: Productionorder;
    oldProductionOrder!: Productionorder;

    innerdata: any;
    oldinnerdata: any;

    selectedrow: any;
    selectedinnerrow: any;

    enaadd: boolean = false;
    enaupd: boolean = false;
    enadel: boolean = false;

    constructor(
        private pos: ProductionOrderService,
        private posts: ProdOrderStatusService,
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
            "csordernumber": new FormControl(),
            "csemployee": new FormControl(),
            "csdoplaced": new FormControl(),
            "csdorequired": new FormControl(),
            "csdescription": new FormControl(),
            "csproductionorderstatus": new FormControl()
        });

        this.ssearch = this.fb.group({
            "ssdorequired": new FormControl(),
            "ssdoplaced": new FormControl(),
            "ssproductionorderstatus": new FormControl(),
        });

        this.form = this.fb.group({
            "orderNumber": new FormControl('', Validators.required),
            "dorequired": new FormControl(Validators.required),
            "description": new FormControl('', Validators.required),
            "productionOrderstatus": new FormControl(Validators.required),
            "doplaced": new FormControl({value: new Date(), disabled: true}, Validators.required),
            "employee": new FormControl('', Validators.required)
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

        this.posts.getAllList().then((poss: Prodorderstatus[]) => this.postatuses = poss);
        this.ps.getAll("").then((products: Product[]) => this.products = products);
        this.es.getAllListNameId().then((emps: Employee[]) => this.employees = emps);

        this.rx.get("productionorders").then((regs: []) => {
            this.regexes = regs;
            this.rx.get('productionorderproducts').then((regs: []) => {
                this.innerregexes = regs;
                this.createForm();
            })
        });

    }

    createView() {
        this.imageurl = 'assets/pending.gif';
        this.loadTable("");
    }

    createForm() {

        this.form.controls['orderNumber'].setValidators([Validators.required]);
        this.innerform.controls['product'].setValidators([Validators.required]);
        this.innerform.controls['amount'].setValidators([Validators.required, Validators.pattern(this.innerregexes['amount']['regex'])]);
        this.form.controls['dorequired'].setValidators([Validators.required]);
        this.form.controls['description'].setValidators([Validators.required, Validators.pattern(this.regexes['description']['regex'])]);
        this.form.controls['productionOrderstatus'].setValidators([Validators.required]);
        this.form.controls['doplaced'].setValidators([Validators.required]);
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
                    // @ts-ignore
                    if (controlName == "doplaced" || controlName == "dorequired")
                        value = this.dp.transform(new Date(value), 'yyyy-MM-dd');
                    // console.log("Date" +value);
                    if (this.oldProductionOrder != undefined && control.valid) {
                        // @ts-ignore
                        if (value === this.productionOrder[controlName]) {
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
        // this.fillOrderNumber();
        this.enableButtons(true, false, false);
    }

    loadTable(query: string) {

        this.pos.getAll(query)
            .then((ords: Productionorder[]) => {
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

    // fillOrderNumber(): void {
    //     this.pos.getMaxNumber().then(maxNumber: string => {
    //         if (maxNumber === null) this.form.get("orderNumber")?.setValue("OD0001");
    //         else {
    //             let s1 = JSON.stringify(maxNumber).toString();
    //             // console.log(s1); ex OD0001
    //             let match1 = s1.match(/\d+/);
    //             // @ts-ignore
    //             let match = parseInt(match1[0], 10);
    //             this.form.get("ordernumber")?.setValue("PRO000" + ++match);
    //         }
    //     });
    //
    //     for (const controlName in this.innerform.controls) {
    //         this.innerform.controls[controlName].clearValidators();
    //         this.innerform.controls[controlName].updateValueAndValidity();
    //     }
    //     if (this.productCategorySubscription) {
    //         this.productCategorySubscription.unsubscribe();
    //     }
    //     this.productCategorySubscription = this.innerform.get("productcategory")?.valueChanges.subscribe((p: Productcategory) => {
    //         if (p) {
    //             let qry = "?productcategoryid=" + p;
    //             this.ps.getAllBy(qry).then((pcts: Product[]) =>
    //                 this.products = pcts
    //             );
    //
    //
    //         }
    //     });
    //
    // }

    filterTable(): void {

        const cserchdata = this.csearch.getRawValue();
        console.log(cserchdata.csordernumber);

        this.data.filterPredicate = (pOrder: Productionorder, filter: string) => {
            // @ts-ignore
            return (cserchdata.csordernumber == null || pOrder.orderNumber.includes(cserchdata.csordernumber)) &&
                (cserchdata.csemployee == null || pOrder.employee.fullname.toLowerCase().includes(cserchdata.csemployee)) &&
                (cserchdata.csdoplaced == null || pOrder.doplaced.includes(cserchdata.csdoplaced)) &&
                (cserchdata.csdorequired == null || pOrder.dorequired.includes(cserchdata.csdorequired)) &&
                (cserchdata.csdescription == null || pOrder.description.toString().includes(cserchdata.csdescription)) &&
                (cserchdata.csproductionorderstatus == null || pOrder.productionOrderstatus.name.toLowerCase().includes(cserchdata.csproductionorderstatus))
        };
        this.data.filter = 'xx';
    }

    btnSearchMc() {

        const ssearchdata = this.ssearch.getRawValue();
        let prodorderstatus = ssearchdata.ssproductionorderstatus;
        let doplaced = this.dp.transform(ssearchdata.ssdoplaced, 'yyyy-MM-dd');
        let dorequired = this.dp.transform(ssearchdata.ssdorequired, 'yyyy-MM-dd');

        let query = "";

        if (doplaced != null && doplaced.trim() != "") query = query + "&doplaced=" + doplaced;
        if (dorequired != null && dorequired.trim() != "") query = query + "&dorequired=" + dorequired;
        if (prodorderstatus != null) query = query + "&prodorderstatusid=" + prodorderstatus;

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

    getBtn(element: Productionorder) {
        return `<button mat-raised-button>Remove</button>`;
    }

    id = 0;

    deleteRaw(x: any) {

        // this.indata.data = this.indata.data.reduce((element) => element.id !== x.id);

        let datasources = this.indata.data;
        const index = datasources.findIndex(item => item.id === x.id);
        // console.log(x.id);
        // console.log(index)

        if (index > -1) {
            datasources.splice(index, 1);
        }
        this.indata.data = datasources;
        this.productionorderproducts = this.indata.data;
    }

    enableButtons(add: boolean, upd: boolean, del: boolean) {
        this.enaadd = add;
        this.enaupd = upd;
        this.enadel = del;
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
        this.innerdata = this.innerform.getRawValue();

        if (this.innerdata != null) {

            let productionorderproduct = new ProductionOrderProduct(this.id, this.innerdata.amount, this.innerdata.product);

            let tem: ProductionOrderProduct[] = [];
            if (this.indata != null) this.indata.data.forEach((i) => tem.push(i));

            this.productionorderproducts = [];
            tem.forEach((t) => this.productionorderproducts.push(t));

            this.productionorderproducts.push(productionorderproduct);
            this.indata = new MatTableDataSource(this.productionorderproducts);

            this.id++;

            // Reset the inner form
            this.innerform.reset();
            this.cdr.detectChanges();
        }
    }

    fillInnerForm(productionorderproduct: ProductionOrderProduct) {

        this.selectedinnerrow = productionorderproduct;

        this.productionorderproduct = JSON.parse(JSON.stringify(productionorderproduct));
        this.oldproductionorderproduct = JSON.parse(JSON.stringify(productionorderproduct));


        // @ts-ignore
        this.productionorderproduct.product = this.products.find((r) => r.id === this.productionorderproduct.product.id);

        this.innerform.patchValue(this.productionorderproduct);
        this.innerform.markAsPristine();

    }

    fillForm(productionorder: Productionorder) {

        this.enableButtons(false, true, true);

        this.selectedrow = productionorder;

        this.productionOrder = JSON.parse(JSON.stringify(productionorder));
        this.oldProductionOrder = JSON.parse(JSON.stringify(productionorder));

        // @ts-ignore
        this.productionOrder.employee = this.employees.find(e => e.id === this.productionOrder.employee.id);
        // @ts-ignore
        this.productionOrder.productionOrderstatus = this.postatuses.find(s => s.id === this.productionOrder.productionOrderstatus.id);

        // Update the form values
        this.form.patchValue(this.productionOrder);
        this.form.markAsPristine();

        this.updateDataSource(productionorder.productionOrderProducts);

        this.innerform.reset();

        for (const controlName in this.innerform.controls) {
            this.innerform.controls[controlName].clearValidators();
            this.innerform.controls[controlName].updateValueAndValidity();
        }
    }

    updateDataSource(productionorderproducts?: ProductionOrderProduct[]) {
        this.indata = new MatTableDataSource(productionorderproducts);
    }

    getUpdates(): string {

        let updates: string = "";
        for (const controlName in this.form.controls) {
            const control = this.form.controls[controlName];
            if (control.dirty) {
                updates = updates + "<br>" + controlName.charAt(0).toUpperCase() + controlName.slice(1) + " Changed";
            }
        }
        for (const controlName in this.innerform.controls) {
            const control = this.innerform.controls[controlName];
            if (control.dirty) {
                updates = updates + "<br>" + controlName.charAt(0).toUpperCase() + controlName.slice(1) + " Changed";
            }
        }
        if (JSON.stringify(this.productionorderproducts) !== JSON.stringify(this.oldProducts)) {
            updates = updates + "<br>Products in the Order Changed";
        }
        return updates;

    }

    clear(): void {
        const confirm = this.dg.open(ConfirmComponent, {
            width: '500px',
            data: {
                heading: "Confirmation - Production Order Clear",
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
        this.productionOrder = null;
        // @ts-ignore
        this.oldProductionOrder = null;

        // @ts-ignore
        this.indata = new MatTableDataSource([]);
        this.form.controls['orderNumber'].reset();
        this.enableButtons(true, false, false);
    }

    add() {

        let errors = this.getErrors();
        if (errors != "") {
            const errmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Errors - Production Order Add ", message: "You have following Errors <br> " + errors}
            });
            errmsg.afterClosed().subscribe(async result => {
                if (!result) {
                    return;
                }
            });
        } else {

            this.productionOrder = this.form.getRawValue();
            this.productionOrder.productionOrderProducts = this.productionorderproducts;

            // @ts-ignore
            this.productionorderproducts.forEach((i) => delete i.id);
            // @ts-ignore
            this.productionOrder.doplaced = this.dp.transform(this.productionOrder.doplaced, "yyyy-MM-dd");
            // @ts-ignore
            this.productionOrder.dorequired = this.dp.transform(this.productionOrder.dorequired, "yyyy-MM-dd");

            let invdata: string = "";
            invdata = invdata + "<br>Placed Day is : " + this.productionOrder.doplaced
            invdata = invdata + "<br>Production Order Number : " + this.productionOrder.orderNumber;

            const confirm = this.dg.open(ConfirmComponent, {
                width: '500px',
                data: {
                    heading: "Confirmation - Production Order Add",
                    message: "Are you sure to Add the following Production Order? <br> <br>" + invdata
                }
            });

            let addstatus: boolean = false;
            let addmessage: string = "Server Not Found";

            confirm.afterClosed().subscribe(async result => {
                if (result) {
                    this.pos.add(this.productionOrder).then((response: [] | undefined) => {
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
                            Object.values(this.innerform.controls).forEach(control => {
                                control.markAsUntouched();
                            });
                            this.loadTable("");
                        }

                        const stsmsg = this.dg.open(MessageComponent, {
                            width: '500px',
                            data: {heading: "Status - Production Order Add", message: addmessage}
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
                data: {heading: "Errors - Production Order Update ", message: "You have following Errors <br> " + errors}
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
                        heading: "Confirmation - Production Order Update",
                        message: "Are you sure to Save following Updates? <br> <br>" + updates
                    }
                });
                confirm.afterClosed().subscribe(async result => {
                    if (result) {

                        this.productionOrder = this.form.getRawValue();
                        this.productionOrder.productionOrderProducts = this.productionorderproducts;
                        // @ts-ignore
                        this.productionorderproducts.forEach((i) => delete i.id);
                        // @ts-ignore
                        this.productionOrder.doplaced = this.dp.transform(this.productionOrder.doplaced, 'yyyy-MM-dd');
                        // @ts-ignore
                        this.productionOrder.dorequired = this.dp.transform(this.productionOrder.dorequired, 'yyyy-MM-dd');
                        this.productionOrder.id = this.oldProductionOrder.id;

                        this.pos.update(this.productionOrder).then((response: [] | undefined) => {
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
                                this.loadTable("");
                                this.resetForms();
                                Object.values(this.form.controls).forEach(control => control.markAsUntouched());
                                Object.values(this.innerform.controls).forEach(control => control.markAsUntouched());

                            }

                            const stsmsg = this.dg.open(MessageComponent, {
                                width: '500px',
                                data: {heading: "Status -Production Order Update", message: updmessage}
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
                    data: {heading: "Confirmation -Production Order Update", message: "Nothing Changed"}
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
                heading: "Confirmation - Production Order Delete",
                message: "Are you sure to Delete following Production Order ? : <br> <br>" + this.productionOrder.orderNumber
            }
        });

        confirm.afterClosed().subscribe(async result => {
            if (result) {
                let delstatus: boolean = false;
                let delmessage: string = "Server Not Found";

                this.pos.delete(this.productionOrder.id).then((response: [] | undefined) => {

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
                        data: {heading: "Status - Production Order Delete ", message: delmessage}
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
