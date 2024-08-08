import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Grnitem} from "../../../entity/grnitem";
import {Ingredient} from "../../../entity/ingredient";
import {Grn} from "../../../entity/grn";
import {Grnstatus} from "../../../entity/grnstatus";
import {Employee} from "../../../entity/employee";
import {PurchaseOrder} from "../../../entity/purchaseOrder";
import {GrnService} from "../../../service/grnservice";
import {IngredientService} from "../../../service/ingredientservice";
import {EmployeeService} from "../../../service/employeeservice";
import {PurchaseOrderService} from "../../../service/purhchaseOrderService";
import {GrnStatusService} from "../../../service/grnstatusservice";
import {RegexService} from "../../../service/regexservice";
import {AuthorizationManager} from "../../../service/authorizationmanager";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UiAssist} from "../../../util/ui/ui.assist";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {MessageComponent} from "../../../util/dialog/message/message.component";

@Component({
    selector: 'app-grn',
    templateUrl: './grn.component.html',
    styleUrls: ['./grn.component.css']
})
export class GrnComponent {
    columns: string[] = ['employee', 'grnstatus', 'purorder', 'date', 'grnnumber', 'description'];
    headers: string[] = ['Employee', 'Status', 'Purorder No', 'Date', 'Number', 'Description'];
    binders: string[] = ['employee.fullname', 'grnstatus.name', 'purorder.ponumber', 'date', 'grnnumber', 'description'];

    cscolumns: string[] = ['csemployee', 'csgrnstatus', 'cspurorder', 'csdate', 'csgrnnumber', 'csdescription'];
    csprompts: string[] = ['Search by Employee', 'Search by Status', 'Search by Purorder No', 'Search by Date', 'Search by Number', 'Search by Description'];

    incolumns: string[] = ['item', 'unitcost', 'qty', 'linecost', 'store', 'remove'];
    inheaders: string[] = ['Item', 'Unit Cost', 'QTY', 'Line cost', 'Store', 'Remove',];
    inbinders: string[] = ['item.name', 'unitcost', 'qty', 'linecost', 'store.storenumber', 'getBtn()'];

    innerdata: any;
    oldinnerdata: any;

    indata!: MatTableDataSource<Grnitem>
    innerform!: FormGroup;
    ingredients: Array<Ingredient> = [];
    grnitems: Array<Grnitem> = [];

    public csearch!: FormGroup;
    public ssearch!: FormGroup;
    public form!: FormGroup;

    grn!: Grn;
    oldgrn!: Grn;

    today = new Date();

    grns: Array<Grn> = [];
    data!: MatTableDataSource<Grn>;
    imageurl: string = '';
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    imageempurl: string = 'assets/default.png'
    uiassist: UiAssist;

    regexes: any;
    innerregexes: any;
    selectedrow: any;

    grnstatuses: Array<Grnstatus> = [];
    employees: Array<Employee> = [];
    purorders: Array<PurchaseOrder> = [];

    enaadd: boolean = true;
    enaupd: boolean = false;
    enadel: boolean = false;

    constructor(
        private grs: GrnService,
        private ings: IngredientService,
        private emps: EmployeeService,
        private pos: PurchaseOrderService,
        private grss: GrnStatusService,
        private rs: RegexService,
        private fb: FormBuilder,
        private dg: MatDialog,
        private dp: DatePipe,
        // private ns: NumberService,
        public authService: AuthorizationManager) {

        this.uiassist = new UiAssist(this);

        this.csearch = this.fb.group({
            csemployee: new FormControl(),
            csgrnstatus: new FormControl(),
            cspurorder: new FormControl(),
            csdate: new FormControl(),
            csgrnnumber: new FormControl(),
            csdescription: new FormControl(),
        });

        this.ssearch = this.fb.group({
            ssgrnstatus: new FormControl(),
            sspurorder: new FormControl(),
        });

        this.form = this.fb.group({
            "grnnumber": new FormControl('', [Validators.required],),
            "date": new FormControl(this.today, [Validators.required],),
            "description": new FormControl('', [Validators.required]),
            "grandtotal": new FormControl('', [Validators.required]),
            "grnstatus": new FormControl('', [Validators.required]),
            "employee": new FormControl('', [Validators.required]),
            "purorder": new FormControl('', [Validators.required]),

        }, {updateOn: 'change'});

        this.innerform = this.fb.group({

            "store": new FormControl('', [Validators.required]),
            "qty": new FormControl('', [Validators.required]),
            "unitcost": new FormControl('', [Validators.required]),
            "item": new FormControl('', [Validators.required]),

        }, {updateOn: 'change'});

    }

    ngOnInit() {
        this.initialize();
    }

    initialize() {

        this.createView();

        this.grss.getAllList().then((vsts: Grnstatus[]) => {
            this.grnstatuses = vsts;
        });

        this.emps.getAll('').then((vtys: Employee[]) => {
            this.employees = vtys;
        });

        this.pos.getAll('').then((vbrs: PurchaseOrder[]) => {
            this.purorders = vbrs.filter(po => po.postatus.name != 'Pending');
        });

        this.ings.getAll('').then((vbrs: Ingredient[]) => {
            this.ingredients = vbrs;
        });

        this.rs.get('grn').then((regs: []) => {
            this.regexes = regs;
            this.rs.get('grnitem').then((regs: []) => {
                this.innerregexes = regs;
                this.createForm();
            })
        });

    }

    filterDates = (date: Date | null): boolean => {
        const currentDate = new Date();
        return !date || date.getTime() <= currentDate.getTime();
    };

    createView() {
        this.imageurl = 'assets/pending.gif';
        this.loadTable("");
    }

    createForm() {

        this.form.controls['grnnumber'].setValidators([Validators.required]);
        this.form.controls['date'].setValidators([Validators.required]);
        this.form.controls['description'].setValidators([Validators.required, Validators.pattern(this.regexes['description']['regex'])]);
        this.form.controls['grandtotal'].setValidators([Validators.required, Validators.pattern(this.regexes['grandtotal']['regex'])]);
        this.form.controls['grnstatuse'];
        this.form.controls['employee'].setValidators([Validators.required]);
        this.form.controls['purorder'].setValidators([Validators.required]);

        this.innerform.controls['store'].setValidators([Validators.required]);
        this.innerform.controls['qty'].setValidators([Validators.required, Validators.required, Validators.pattern(this.innerregexes['qty']['regex'])]);
        this.innerform.controls['unitcost'].setValidators([Validators.required, Validators.pattern(this.innerregexes['unitcost']['regex'])]);
        this.innerform.controls['item'].setValidators([Validators.required]);


        Object.values(this.form.controls).forEach(control => {
            control.markAsTouched();
        });
        Object.values(this.innerform.controls).forEach(control => {
            control.markAsTouched();
        });

        for (const controlName in this.form.controls) {
            const control = this.form.controls[controlName];
            control.valueChanges.subscribe(value => {
                    // @ts-ignore
                    if (controlName == "date" || controlName == "date")
                        value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

                    if (this.oldgrn != undefined && control.valid) {
                        // @ts-ignore
                        if (value === this.grn[controlName]) {
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
                    // @ts-ignore
                    if (this.oldgrn != undefined && control.valid) {
                        // @ts-ignore
                        if (value === this.grn[controlName]) {
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

        this.grs.getAll(query)
            .then((emps: Grn[]) => {
                this.grns = emps;
                // this.ns.setLastSequenceNumber(this.grns[this.grns.length - 1].grnnumber);
                // this.generateNumber();
                this.imageurl = 'assets/fullfilled.png';
            })
            .catch((error) => {
                this.imageurl = 'assets/rejected.png';
            })
            .finally(() => {
                this.data = new MatTableDataSource(this.grns.slice().reverse());
                this.data.paginator = this.paginator;
            });

    }

    filterTable(): void {

        const csearchdata = this.csearch.getRawValue();

        this.data.filterPredicate = (grn: Grn, filter: string) => {
            return (csearchdata.csdate == null || grn.date.toLowerCase().includes(csearchdata.csdate.toLowerCase())) &&
                (csearchdata.csdescription == null || grn.description.toLowerCase().includes(csearchdata.csdescription.toLowerCase())) &&
                (csearchdata.csgrnstatus == null || grn.grnstatus.name.toLowerCase().includes(csearchdata.csgrnstatus.toLowerCase())) &&
                (csearchdata.csgrnnumber == null || grn.grnnumber.toLowerCase().includes(csearchdata.csgrnnumber.toLowerCase())) &&
                (csearchdata.csemployee == null || grn.employee.fullname.toLowerCase().includes(csearchdata.csemployee.toLowerCase())) &&
                (csearchdata.cspurorder == null || grn.purorder.number.toLowerCase().includes(csearchdata.cspurorder.toLowerCase()));
        };
        this.data.filter = 'xx';

    }

    btnSearchMc(): void {

        this.csearch.reset();
        const sserchdata = this.ssearch.getRawValue();

        let purorderid = sserchdata.sspurorder;
        let grnstatusid = sserchdata.ssgrnstatus;

        let query = "";
        if (grnstatusid != null) query = query + "&grnstatusid=" + grnstatusid;
        if (purorderid != null) query = query + "&purorderid=" + purorderid;

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

    fillForm(grn: Grn) {

        this.enableButtons(false, true, true);

        this.selectedrow = grn;
        this.grn = JSON.parse(JSON.stringify(grn));
        this.oldgrn = JSON.parse(JSON.stringify(grn));

        // @ts-ignore
        this.grn.grnstatus = this.grnstatuses.find(g => g.id === this.grn.grnstatus.id);
        // @ts-ignore
        this.grn.employee = this.employees.find(e => e.id === this.grn.employee.id);
        // @ts-ignore
        this.grn.purorder = this.purorders.find(p => p.id === this.grn.purorder.id);

        this.indata = new MatTableDataSource(this.grn.grnitems);

        this.form.patchValue(this.grn);
        this.form.markAsPristine();
        this.calculateGrandTotal();
    }

    add() {
        let errors = this.getErrors();

        if (errors != "") {
            const errmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Errors - grn Add ", message: "You have following Errors <br> " + errors}
            });
            errmsg.afterClosed().subscribe(async result => {
                if (!result) {
                    return;
                }
            });
        } else {

            this.grn = this.form.getRawValue();
            this.grn.grnitems = this.grnitems;

            // @ts-ignore
            this.grnitems.forEach((i) => delete i.id);

            let itmdata: string = "";

            itmdata = itmdata + "<br>Date is : " + this.grn.date;
            itmdata = itmdata + "<br>Description is : " + this.grn.description;

            const confirm = this.dg.open(ConfirmComponent, {
                width: '500px',
                data: {
                    heading: "Confirmation - grn Add",
                    message: "Are you sure to Add the following grn? <br> <br>" + itmdata
                }
            });

            let addstatus: boolean = false;
            let addmessage: string = "Server Not Found";

            confirm.afterClosed().subscribe(async result => {
                if (result) {
                    // @ts-ignore
                    this.grs.add(this.grn).then((responce: [] | undefined) => {
                        if (responce != undefined) { // @ts-ignore
                            // @ts-ignore
                            addstatus = responce['errors'] == "";
                            if (!addstatus) { // @ts-ignore
                                addmessage = responce['errors'];
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
                            data: {heading: "Status -grn Add", message: addmessage}
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
                data: {heading: "Errors - grn Update ", message: "You have following Errors <br> " + errors}
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
                        heading: "Confirmation - grn Update",
                        message: "Are you sure to Save folowing Updates? <br> <br>" + updates
                    }
                });
                confirm.afterClosed().subscribe(async result => {
                    if (result) {

                        this.grn = this.form.getRawValue();
                        this.grn.grnitems = this.grnitems;
                        // @ts-ignore
                        this.grn.id = this.oldgrn.id;

                        // @ts-ignore
                        this.grnitems.forEach((i) => delete i.id);

                        // @ts-ignore
                        this.grn.date = this.dp.transform(this.grn.date, "yyyy-MM-dd");


                        this.grs.update(this.grn).then((responce: [] | undefined) => {
                            if (responce != undefined) { // @ts-ignore
                                updstatus = responce['errors'] == "";
                                if (!updstatus) { // @ts-ignore
                                    updmessage = responce['errors'];
                                }
                            } else {
                                updstatus = false;
                                updmessage = "Content Not Found"
                            }
                        }).finally(() => {
                            if (updstatus) {
                                updmessage = "Successfully Updated";
                                this.form.reset();
                                Object.values(this.form.controls).forEach(control => {
                                    control.markAsTouched();
                                });
                                this.loadTable("");
                                this.innerdata.data = [];
                            }

                            const stsmsg = this.dg.open(MessageComponent, {
                                width: '500px',
                                data: {heading: "Status -grn Add", message: updmessage}
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
                    data: {heading: "Confirmation - grn Update", message: "Nothing Changed"}
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
                heading: "Confirmation - grn Delete",
                message: "Are you sure to Delete following grn? <br> <br>" + this.grn.date + "id " + this.grn.id
            }
        });

        confirm.afterClosed().subscribe(async result => {
            if (result) {
                let delstatus: boolean = false;
                let delmessage: string = "Server Not Found";

                this.grs.delete(this.grn.id).then((responce: [] | undefined) => {

                    if (responce != undefined) { // @ts-ignore
                        delstatus = responce['errors'] == "";
                        if (!delstatus) { // @ts-ignore
                            delmessage = responce['errors'];
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
                    }

                    const stsmsg = this.dg.open(MessageComponent, {
                        width: '500px',
                        data: {heading: "Status - grn Delete ", message: delmessage}
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

    clear(): void {
        const confirm = this.dg.open(ConfirmComponent, {
            width: '500px',
            data: {
                heading: "Confirmation - grn Clear",
                message: "Are you sure to Clear following Details ? <br> <br>"
            }
        });

        confirm.afterClosed().subscribe(async result => {
            if (result) {
                this.form.reset()
                this.enableButtons(true, false, false);
                this.loadTable('');
                window.location.reload();
            }
        });


    }

    // filterIngredient() {
    //     let purorder = this.form.controls['purorder'].value.id;
    //     this.ings.getItemByPurorder(purorder).then((ings: Ingredient[]) => {
    //         this.ingredients = ings;
    //     });
    // }

    // inner table

    id = 0;

    btnaddMc() {

        this.innerdata = this.innerform.getRawValue();
        console.log(this.innerdata);

        if (!this.quantityValidator() && !this.enaupd) {
            return; // If validation fails, exit the function
        }

        if (this.innerdata != null) {

            let linecost = this.innerdata.qty * this.innerdata.unitcost;
            let grnitem = new Grnitem(this.id, this.innerdata.item, this.innerdata.unitcost, this.innerdata.qty, linecost);
            let tem: Grnitem[] = [];
            if (this.indata != null) this.indata.data.forEach((i) => tem.push(i));

            this.grnitems = [];
            tem.forEach((t) => this.grnitems.push(t));

            this.grnitems.push(grnitem);
            this.indata = new MatTableDataSource(this.grnitems);

            this.id++;
            this.calculateGrandTotal();
            this.innerform.reset();

        }

    }

    calculateGrandTotal() {
        let grandtotal = 0;
        this.indata.data.forEach((m) => {
            grandtotal = grandtotal + m.linecost
        })

        this.form.controls['grandtotal'].setValue(grandtotal);
    }

    deleteRaw(x: any) {

        let datasources = this.indata.data

        const index = datasources.findIndex(m => m.id === x.id);
        if (index > -1) {
            datasources.splice(index, 1);
        }
        this.indata.data = datasources;
        this.grnitems = this.indata.data;

        this.calculateGrandTotal();
    }

    // generateNumber(): void {
    //     const newNumber = this.ns.generateNumber('GRN');
    //     this.form.controls['grnnumber'].setValue(newNumber);
    // }

    fillInnerForm(grnitm: Grnitem) {
        this.innerdata = JSON.parse(JSON.stringify(grnitm));
        this.oldinnerdata = JSON.parse(JSON.stringify(grnitm));

        //@ts-ignore
        this.innerdata.item = this.items.find((s) => s.id === this.innerdata.item.id);
        //@ts-ignore
        this.innerdata.store = this.stores.find((s) => s.id === this.innerdata.store.id);

        this.innerform.patchValue(this.innerdata);

    }


    quantityValidator(): boolean {
        if (!this.enaupd) {
            let po = this.form.controls['purorder'].value.poitems;
            let it = this.innerform.controls['item'].value;
            let qy = 0;

            if (Array.isArray(po) && it && it.id) {
                for (const item of po) {

                    if (item.item && item.item.id === it.id) {
                        qy = item.qty;
                        break;
                    }
                }
            }
            let q = this.innerform.controls['qty'].value;
            if (qy < q) {
                const addmessage = `Required quantity (${q}) exceeds available quantity (${qy}).`;
                const stsmsg = this.dg.open(MessageComponent, {
                    width: '500px',
                    data: {heading: "Error -grn Add", message: addmessage}
                });
                return false;
            }
            return true;
        }
        return false;
    }
}
