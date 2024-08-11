import {Component, ViewChild} from '@angular/core';
import {IngredientService} from "../../../service/ingredientservice";
import {RegexService} from "../../../service/regexservice";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {AuthorizationManager} from "../../../service/authorizationmanager";
import {UiAssist} from "../../../util/ui/ui.assist";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Ingredient} from "../../../entity/ingredient";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {MessageComponent} from "../../../util/dialog/message/message.component";
import {Product} from "../../../entity/product";
import {Productingredient} from "../../../entity/productingredient";
import {Employee} from "../../../entity/employee";
import {EmployeeService} from "../../../service/employeeservice";
import {ProductService} from "../../../service/productservice";
import {Productstatusservice} from "../../../service/productStatusservice";
import {Productstatus} from "../../../entity/productstatus";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent {

    columns: string[] = ['productnumber', 'name', 'description', 'quantity', 'price', 'employee'];
    headers: string[] = ['Number', 'Name', 'Description', 'Quantity', 'Price', 'Employee'];
    binders: string[] = ['productnumber', 'name', 'description', 'quantity', 'price', 'employee.fullname'];

    cscolumns: string[] = ['csnumber', 'csname', 'csdescription', 'csquantity', 'csprice', 'csemployee'];
    csprompts: string[] = ['Search by Number', 'Search by Name', 'Search by Description', 'Search by Quantity', 'Search by Price', 'Search by Employee'];

    incolumns: string[] = ['ingredient', 'quantityratio', 'remove'];
    inheaders: string[] = ['Ingredient', 'Quantity', ''];
    inbinders: string[] = ['ingredient.name', 'quantityratio', 'getBtn()'];

    innerdata: any;
    oldinnerdata: any;

    indata!: MatTableDataSource<Productingredient>;
    innerform!: FormGroup;

    ingredients: Array<Ingredient> = [];
    products: Array<Product> = [];
    productIngredients: Array<Productingredient> = [];
    employees: Array<Employee> = [];
    productStatuses: Array<Productstatus> = [];

    public csearch!: FormGroup;
    public ssearch!: FormGroup;
    public form!: FormGroup;

    product !: Product;
    oldProduct !: Product;

    data!: MatTableDataSource<Product>;
    imageurl: string = '';
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    uiassist: UiAssist;

    regexes: any;
    selectedrow: any;

    enaadd: boolean = false;
    enaupd: boolean = false;
    enadel: boolean = false;

    constructor(
        private prodService: ProductService,
        private prodStatusService: Productstatusservice,
        private ings: IngredientService,
        private emps: EmployeeService,
        private rs: RegexService,
        private fb: FormBuilder,
        private dg: MatDialog,
        private dp: DatePipe,
        // private ns: NumberService,
        public authService: AuthorizationManager) {

        this.uiassist = new UiAssist(this);

        this.csearch = this.fb.group({
            csnumber: new FormControl(),
            csname: new FormControl(),
            csdescription: new FormControl(),
            csquantity: new FormControl(),
            csprice: new FormControl(),
            csemployee: new FormControl(),
        });

        this.ssearch = this.fb.group({
            ssemployee: new FormControl(),
            ssproductstatus: new FormControl(),
        });

        this.form = this.fb.group({
            "productnumber": new FormControl('', [Validators.required]),
            "name": new FormControl('', [Validators.required]),
            "description": new FormControl('', [Validators.required]),
            "quantity": new FormControl('', [Validators.required]),
            "price": new FormControl('', [Validators.required]),
            "productStatus": new FormControl('', [Validators.required]),
            "dointroduced": new FormControl({value: new Date(), disabled: false}, [Validators.required]),
            "employee": new FormControl('', [Validators.required]),
        }, {updateOn: 'change'});

        this.innerform = this.fb.group({
            "ingredient": new FormControl('', [Validators.required]),
            "quantityratio": new FormControl('', [Validators.required]),
        }, {updateOn: 'change'});

    }

    ngOnInit() {
        this.initialize();
    }

    initialize() {

        this.createView();

        this.prodStatusService.getAllList().then((statuses: Productstatus[]) => {
            this.productStatuses = statuses;
        });

        this.prodService.getAll("").then((products: Product[]) => {
            this.products = products;
        });

        this.emps.getAll('').then((emps: Employee[]) => {
            this.employees = emps;
        });

        this.ings.getAll('').then((ings: Ingredient[]) => {
            this.ingredients = ings;
        });

        this.rs.get('products').then((regs: []) => {
            this.regexes = regs;
            this.createForm();
        });
    }

    createView() {
        this.imageurl = 'assets/pending.gif';
        this.loadTable("");
    }

    createForm() {
        this.form.controls['productnumber'].setValidators([Validators.required]);
        this.form.controls['name'].setValidators([Validators.required]);
        this.form.controls['description'].setValidators([Validators.required, Validators.pattern(this.regexes['description']['regex'])]);
        this.form.controls['quantity'].setValidators([Validators.required, Validators.pattern(this.regexes['quantity']['regex'])]);
        this.form.controls['price'].setValidators([Validators.required, Validators.pattern(this.regexes['price']['regex'])]);
        this.form.controls['dointroduced'].setValidators([Validators.required, Validators.pattern(this.regexes['dointroduced']['regex'])]);
        this.form.controls['productStatus'].setValidators([Validators.required]);
        this.form.controls['employee'].setValidators([Validators.required]);

        this.innerform.controls['ingredient'].setValidators([Validators.required]);
        this.innerform.controls['quantityratio'].setValidators([Validators.required, Validators.pattern(this.regexes['quantity']['regex'])]);

        Object.values(this.form.controls).forEach(control => {
            control.markAsTouched();
        });

        for (const controlName in this.form.controls) {
            const control = this.form.controls[controlName];
            control.valueChanges.subscribe(value => {
                    // @ts-ignore
                    if (controlName == "dointroduced")
                        value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

                    if (this.oldProduct != undefined && control.valid) {
                        // @ts-ignore
                        if (value === this.product[controlName]) {
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
        this.enableButtons(true, false, false);
    }

    enableButtons(add: boolean, upd: boolean, del: boolean) {
        this.enaadd = add;
        this.enaupd = upd;
        this.enadel = del;
    }

    loadTable(query: string) {
        this.prodService.getAll(query)
            .then((prods: Product[]) => {
                this.products = prods;
                // this.ns.setLastSequenceNumber(this.purorders[this.purorders.length-1].number);
                // this.generateNumber();
                this.imageurl = 'assets/fullfilled.png';
            })
            .catch((e: any) => {
                this.imageurl = 'assets/rejected.png';
            })
            .finally(() => {
                this.data = new MatTableDataSource(this.products.slice().reverse());
                this.data.paginator = this.paginator;
            });
    }

    filterTable(): void {

        const csearchData = this.csearch.getRawValue();
        this.data.filterPredicate = (product: Product, filter: string) => {
            // @ts-ignore
            return (csearchData.csnumber == null || product.productnumber.toLowerCase().includes(csearchData.csnumber.toLowerCase())) &&
                (csearchData.csname == null || product.name.toLowerCase().includes(csearchData.csname.toLowerCase())) &&
                (csearchData.csdescription == null || product.description.toLowerCase().includes(csearchData.csdescription.toLowerCase())) &&
                (csearchData.csquantity == null || product.quantity.toString().includes(csearchData.csquantity)) &&
                (csearchData.csprice == null || product.price.toString().includes(csearchData.csprice)) &&
                (csearchData.csemployee == null || product.employee.fullname.toLowerCase().includes(csearchData.csemployee.toLowerCase()))
        };
        this.data.filter = 'xx';
    }

    btnSearchMc(): void {

        this.csearch.reset();
        const sserchdata = this.ssearch.getRawValue();

        let employeeId = sserchdata.ssemployee;
        let prodstatusid = sserchdata.ssproductstatus;

        let query = "";
        if (prodstatusid != null) query = query + "&productstatusid=" + prodstatusid;
        if (employeeId != null) query = query + "&employeeid=" + employeeId;
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

    fillForm(product: Product) {

        this.enableButtons(false, true, true);

        this.selectedrow = product;
        this.product = JSON.parse(JSON.stringify(product));
        this.oldProduct = JSON.parse(JSON.stringify(product));

        //@ts-ignore
        this.product.productStatus = this.productStatuses.find(s => s.id === this.product.productStatus.id);
        //@ts-ignore
        this.product.employee = this.employees.find(e => e.id === this.product.employee.id);

        this.indata = new MatTableDataSource(this.product.productIngredients);
        this.form.patchValue(this.product);
        this.form.markAsPristine();
    }

    add() {

        let errors = this.getErrors();

        if (errors != "") {
            const errmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Errors - Product Add ", message: "You have following Errors <br> " + errors}
            });
            errmsg.afterClosed().subscribe(async result => {
                if (!result) {
                    return;
                }
            });
        } else {

            this.product = this.form.getRawValue();
            this.product.productIngredients = this.productIngredients;
            // @ts-ignore
            this.productIngredients.forEach((i) => delete i.id);

            let productData: string = "";
            productData = productData + "<br>Product Number is : " + this.product.productnumber;

            const confirm = this.dg.open(ConfirmComponent, {
                width: '500px',
                data: {
                    heading: "Confirmation - Product Add",
                    message: "Are you sure to Add the following Product? <br> <br>" + productData
                }
            });

            let addstatus: boolean = false;
            let addmessage: string = "Server Not Found";

            confirm.afterClosed().subscribe(async result => {
                if (result) {
                    this.prodService.add(this.product).then((response: [] | undefined) => {
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
                            this.indata.data = [];
                        }

                        const stsmsg = this.dg.open(MessageComponent, {
                            width: '500px',
                            data: {heading: "Status - Product Add", message: addmessage}
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
                data: {heading: "Errors - Product Update ", message: "You have following Errors <br> " + errors}
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
                        heading: "Confirmation - Product Update",
                        message: "Are you sure to Save folowing Updates? <br> <br>" + updates
                    }
                });
                confirm.afterClosed().subscribe(async result => {
                    if (result) {
                        this.product = this.form.getRawValue();
                        this.product.productIngredients = this.productIngredients;

                        this.product.id = this.oldProduct.id;

                        // @ts-ignore
                        this.productIngredients.forEach((i) => delete i.id);

                        // @ts-ignore
                        this.product.date = this.dp.transform(this.product.date, "yyyy-MM-dd");

                        this.prodService.update(this.product).then((response: [] | undefined) => {
                            if (response != undefined) { // @ts-ignore
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
                                this.form.reset();
                                this.innerform.reset();
                                this.loadTable("");
                                this.indata.data = [];
                                Object.values(this.form.controls).forEach(control => {
                                    control.markAsTouched();
                                });
                            }

                            const stsmsg = this.dg.open(MessageComponent, {
                                width: '500px',
                                data: {heading: "Status - Product Add", message: updmessage}
                            });
                            stsmsg.afterClosed().subscribe(async result => {
                                if (!result) {
                                    return;
                                }
                            });
                        });
                    }
                });
            } else {

                const updmsg = this.dg.open(MessageComponent, {
                    width: '500px',
                    data: {heading: "Confirmation - Product Update", message: "Nothing Changed"}
                });
                updmsg.afterClosed().subscribe(async result => {
                    if (!result) {
                        return;
                    }
                });

            }
        }
    }

    getUpdates(): string {

        let updates: string = "";
        for (const controlName in this.form.controls) {
            const control = this.form.controls[controlName];
            if (control.dirty) {
                updates = updates + "<br>" + controlName.charAt(0).toUpperCase() + controlName.slice(1) + " Changed";
            }
        }
        return updates;
    }

    delete() {

        const confirm = this.dg.open(ConfirmComponent, {
            width: '500px',
            data: {
                heading: "Confirmation - Product Delete",
                message: "Are you sure to Delete following Product? <br> <br>Product Number: " + this.product.productnumber
            }
        });

        confirm.afterClosed().subscribe(async result => {
            if (result) {
                let delstatus: boolean = false;
                let delmessage: string = "Server Not Found";

                this.prodService.delete(this.product.id).then((response: [] | undefined) => {

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
                        this.form.reset();
                        Object.values(this.form.controls).forEach(control => {
                            control.markAsTouched();
                        });
                        this.loadTable("");
                        this.indata.data = [];
                    }

                    const stsmsg = this.dg.open(MessageComponent, {
                        width: '500px',
                        data: {heading: "Status - Product Delete", message: delmessage}
                    });
                    stsmsg.afterClosed().subscribe(async result => {
                        if (!result) return;
                    });
                });
            }
        });
    }

    clear(): void {
        const confirm = this.dg.open(ConfirmComponent, {
            width: '500px',
            data: {
                heading: "Confirmation - Product Clear",
                message: "Are you sure to Clear following Details ? <br> <br>"
            }
        });

        confirm.afterClosed().subscribe(async result => {
            if (result) {
                this.form.reset()
                window.location.reload();
            }
        });
        this.enableButtons(true, false, false);
    }

    //inner table
    id = 0;

    btnAddLine() {

        this.innerdata = this.innerform.getRawValue();

        if (this.innerdata != null) {
            let productIngredient = new Productingredient(this.id, this.innerdata.quantityratio, this.innerdata.ingredient);
            let productIngredients: Productingredient[] = [];

            if (this.indata != null) this.indata.data.forEach((i) => productIngredients.push(i));

            this.productIngredients = [];
            productIngredients.forEach((i) => this.productIngredients.push(i));
            this.productIngredients.push(productIngredient);
            this.indata = new MatTableDataSource(this.productIngredients);

            this.id++;
            this.innerform.reset();
        }
    }

    deleteRaw(x: any) {

        let datasources = this.indata.data

        const index = datasources.findIndex(m => m.id === x.id);
        if (index > -1) {
            datasources.splice(index, 1);
        }
        this.indata.data = datasources;
        this.productIngredients = this.indata.data;
    }

    // generateNumber(): void {
    //   const newNumber = this.ns.generateNumber('POR');
    //   this.form.controls['number'].setValue(newNumber);
    // }

    fillInnerForm(prodIngredient: Productingredient) {
        this.innerdata = JSON.parse(JSON.stringify(prodIngredient));
        this.oldinnerdata = JSON.parse(JSON.stringify(prodIngredient));

        //@ts-ignore
        this.innerdata.ingredient = this.ingredients.find((i) => i.id === this.innerdata.ingredient.id);
        this.innerform.patchValue(this.innerdata);
    }
}
