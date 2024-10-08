import {Component, Inject, OnInit} from '@angular/core';
import {Gender} from "../../../../entity/gender";
import {Designation} from "../../../../entity/designation";
import {Empstatus} from "../../../../entity/empstatus";
import {Emptype} from "../../../../entity/emptype";
import {GenderService} from "../../../../service/genderservice";
import {DesignationService} from "../../../../service/designationservice";
import {Empstatusservice} from "../../../../service/empstatusservice";
import {Emptypeservice} from "../../../../service/emptypeservice";
import {MessageComponent} from "../../../../util/dialog/message/message.component";
import {ConfirmComponent} from "../../../../util/dialog/confirm/confirm.component";
import {Employee} from "../../../../entity/employee";
import {UiAssist} from "../../../../util/ui/ui.assist";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RegexService} from "../../../../service/regexservice";
import {DatePipe} from "@angular/common";
import {EmployeeService} from "../../../../service/employeeservice";
import {finalize} from "rxjs";
import {AuthorizationManager} from "../../../../service/authorizationmanager";

@Component({
    selector: 'app-employee-form',
    templateUrl: './employee-form.component.html',
    styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

    public form!: FormGroup;
    employee!: Employee;
    oldemployee!: Employee;
    imageempurl: string = 'assets/default.png'

    popupTitle: any;
    selectedrow!: Employee;


    genders: Array<Gender> = [];
    designations: Array<Designation> = [];
    employeestatuses: Array<Empstatus> = [];
    employeetypes: Array<Emptype> = [];

    regexes: any;

    uiassist: UiAssist;

    ngOnInit() {
        this.initialize();
    }

    initialize() {
        this.rs.get('employee').then((regs: []) => {
            this.regexes = regs;
            this.createForm();
        });

        this.popupTitle = this.data.title;

        const genderLoad = this.gs.getAllList().then((gens: Gender[]) => {
            this.genders = gens;
            console.log(this.genders);
        });

        const designationLoad = this.ds.getAllList().then((dess: Designation[]) => {
            this.designations = dess;
        });

        const statusLoad = this.ss.getAllList().then((stes: Empstatus[]) => {
            this.employeestatuses = stes;
        });

        const typeLoad = this.ts.getAllList().then((types: Emptype[]) => {
            this.employeetypes = types;
        });

        if (this.popupTitle == "Edit Employee") {
            Promise.all([genderLoad, designationLoad, statusLoad, typeLoad])
                .then(() => this.fillForm(this.data.employee));
        }
    }


    constructor(
        private es: EmployeeService,
        private gs: GenderService,
        private ds: DesignationService,
        private ss: Empstatusservice,
        private ts: Emptypeservice,
        private dg: MatDialog,
        private rs: RegexService,
        private fb: FormBuilder,
        private dp: DatePipe,
        public authService: AuthorizationManager,
        public dialogRef: MatDialogRef<EmployeeFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

        this.uiassist = new UiAssist(this);

        this.form = this.fb.group({
            "number": new FormControl('', [Validators.required]),
            "fullname": new FormControl('', [Validators.required]),
            "callingname": new FormControl('', [Validators.required]),
            "gender": new FormControl('', [Validators.required]),
            "nic": new FormControl('', [Validators.required]),
            "dobirth": new FormControl('', [Validators.required]),
            "photo": new FormControl('', [Validators.required]),
            "address": new FormControl('', [Validators.required]),
            "mobile": new FormControl('', [Validators.required]),
            "land": new FormControl('',),
            "email": new FormControl('', [Validators.required]),
            "designation": new FormControl('', [Validators.required]),
            "doassignment": new FormControl('', [Validators.required]),
            "description": new FormControl('', [Validators.required]),
            "emptype": new FormControl('', [Validators.required]),
            "empstatus": new FormControl('', [Validators.required]),
        }, {updateOn: 'change'});

    }

    createForm() {

        this.form.controls['number'].setValidators([Validators.required, Validators.pattern(this.regexes['number']['regex'])]);
        this.form.controls['fullname'].setValidators([Validators.required, Validators.pattern(this.regexes['fullname']['regex'])]);
        this.form.controls['callingname'].setValidators([Validators.required, Validators.pattern(this.regexes['callingname']['regex'])]);
        this.form.controls['gender'].setValidators([Validators.required]);
        this.form.controls['nic'].setValidators([Validators.required, Validators.pattern(this.regexes['nic']['regex'])]);
        this.form.controls['dobirth'].setValidators([Validators.required]);
        this.form.controls['photo'].setValidators([Validators.required]);
        this.form.controls['address'].setValidators([Validators.required, Validators.pattern(this.regexes['address']['regex'])]);
        this.form.controls['mobile'].setValidators([Validators.required, Validators.pattern(this.regexes['mobile']['regex'])]);
        this.form.controls['land'].setValidators([Validators.pattern(this.regexes['land']['regex'])]);
        this.form.controls['email'].setValidators([Validators.required, Validators.pattern(this.regexes['email']['regex'])]);
        this.form.controls['designation'].setValidators([Validators.required]);
        this.form.controls['doassignment'].setValidators([Validators.required]);
        this.form.controls['description'].setValidators([Validators.required, Validators.pattern(this.regexes['description']['regex'])]);
        this.form.controls['emptype'].setValidators([Validators.required]);
        this.form.controls['empstatus'].setValidators([Validators.required]);

        Object.values(this.form.controls).forEach(control => {
            control.markAsTouched();
        });

        for (const controlName in this.form.controls) {
            const control = this.form.controls[controlName];
            control.valueChanges.subscribe(value => {
                    // @ts-ignore
                    if (controlName == "dobirth" || controlName == "doassignment")
                        value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

                    if (this.oldemployee != undefined && control.valid) {
                        // @ts-ignore
                        if (value === this.employee[controlName]) {
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
        // this.enableButtons(true,false,false);
    }

    selectImage(e: any): void {
        if (e.target.files) {
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (event: any) => {
                this.imageempurl = event.target.result;
                this.form.controls['photo'].clearValidators();
            }
        }
    }

    clearImage(): void {
        this.imageempurl = 'assets/default.png';
        this.form.controls['photo'].setErrors({'required': true});
    }

    add() {

        let errors = this.getErrors();

        if (errors != "") {
            const errmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Errors - Employee Add ", message: "You have following Errors <br> " + errors}
            });
            errmsg.afterClosed().subscribe(async result => {
                if (!result) {
                    return;
                }
            });
        } else {

            this.employee = this.form.getRawValue();

            //console.log("Photo-Before"+this.employee.photo);
            this.employee.photo = btoa(this.imageempurl);
            //console.log("Photo-After"+this.employee.photo);

            let empdata: string = "";

            empdata = empdata + "<br>Number is : " + this.employee.number;
            empdata = empdata + "<br>Fullname is : " + this.employee.fullname;
            empdata = empdata + "<br>Callingname is : " + this.employee.callingname;

            const confirm = this.dg.open(ConfirmComponent, {
                width: '500px',
                data: {
                    heading: "Confirmation - Employee Add",
                    message: "Are you sure to Add the following Employee? <br> <br>" + empdata
                }
            });

            let addstatus: boolean = false;
            let addmessage: string = "Server Not Found";

            confirm.afterClosed().subscribe(async result => {
                if (result) {
                    // console.log("EmployeeService.add(emp)");

                    this.es.add(this.employee).then((responce: [] | undefined) => {
                        //console.log("Res-" + responce);
                        //console.log("Un-" + responce == undefined);
                        if (responce != undefined) { // @ts-ignore
                            console.log("Add-" + responce['id'] + "-" + responce['url'] + "-" + (responce['errors'] == ""));
                            // @ts-ignore
                            addstatus = responce['errors'] == "";
                            console.log("Add Sta-" + addstatus);
                            if (!addstatus) { // @ts-ignore
                                addmessage = responce['errors'];
                            }
                        } else {
                            console.log("undefined");
                            addstatus = false;
                            addmessage = "Content Not Found"
                        }
                    }).finally(() => {

                        if (addstatus) {
                            addmessage = "Successfully Saved";
                            this.form.reset();
                            this.clearImage();
                            Object.values(this.form.controls).forEach(control => {
                                control.markAsTouched();
                            });
                            // loadTable("");
                        }

                        const stsmsg = this.dg.open(MessageComponent, {
                            width: '500px',
                            data: {heading: "Status -Employee Add", message: addmessage}
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

    fillForm(employee: Employee) {

        console.log(this.genders);

        this.selectedrow = employee;
        this.employee = JSON.parse(JSON.stringify(employee));
        this.oldemployee = JSON.parse(JSON.stringify(employee));

        if (this.employee.photo != null) {
            this.imageempurl = atob(this.employee.photo);
            this.form.controls['photo'].clearValidators();
        } else {
            this.clearImage();
        }
        this.employee.photo = "";

        // @ts-ignore
        this.employee.gender = this.genders.find(g => g.id === this.employee.gender.id);

        //@ts-ignore
        this.employee.designation = this.designations.find(d => d.id === this.employee.designation.id);
        //@ts-ignore
        this.employee.empstatus = this.employeestatuses.find(s => s.id === this.employee.empstatus.id);
        //@ts-ignore
        this.employee.emptype = this.employeetypes.find(s => s.id === this.employee.emptype.id);

        this.form.patchValue(this.employee);
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
        return updates;
    }


    update() {

        let errors = this.getErrors();

        if (errors != "") {

            const errmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Errors - Employee Update ", message: "You have following Errors <br> " + errors}
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
                        heading: "Confirmation - Employee Update",
                        message: "Are you sure to Save folowing Updates? <br> <br>" + updates
                    }
                });
                confirm.afterClosed().subscribe(async result => {
                    if (result) {
                        //console.log("EmployeeService.update()");
                        this.employee = this.form.getRawValue();
                        if (this.form.controls['photo'].dirty) this.employee.photo = btoa(this.imageempurl);
                        else this.employee.photo = this.oldemployee.photo;
                        this.employee.id = this.oldemployee.id;

                        this.es.update(this.employee).then((responce: [] | undefined) => {
                            //console.log("Res-" + responce);
                            // console.log("Un-" + responce == undefined);
                            if (responce != undefined) { // @ts-ignore
                                //console.log("Add-" + responce['id'] + "-" + responce['url'] + "-" + (responce['errors'] == ""));
                                // @ts-ignore
                                updstatus = responce['errors'] == "";
                                //console.log("Upd Sta-" + updstatus);
                                if (!updstatus) { // @ts-ignore
                                    updmessage = responce['errors'];
                                }
                            } else {
                                //console.log("undefined");
                                updstatus = false;
                                updmessage = "Content Not Found"
                            }
                        }).finally(() => {
                            if (updstatus) {
                                updmessage = "Successfully Updated";
                                this.form.reset();
                                this.clearImage();
                                Object.values(this.form.controls).forEach(control => {
                                    control.markAsTouched();
                                });
                                // this.loadTable("");
                            }

                            const stsmsg = this.dg.open(MessageComponent, {
                                width: '500px',
                                data: {heading: "Status -Employee Add", message: updmessage}
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
                    data: {heading: "Confirmation - Employee Update", message: "Nothing Changed"}
                });
                updmsg.afterClosed().subscribe(async result => {
                    if (!result) {
                        return;
                    }
                });

            }
        }
    }


    clear(): void {
        const confirm = this.dg.open(ConfirmComponent, {
            width: '500px',
            data: {
                heading: "Confirmation - Employee Clear",
                message: "Are you sure to Clear following Details ? <br> <br>"
            }
        });

        confirm.afterClosed().subscribe(async result => {
            if (result) {
                this.form.reset();
                this.onCloseForm();
            }
        });
    }

    onCloseForm(): void {
        this.dialogRef.close();
    }

}
