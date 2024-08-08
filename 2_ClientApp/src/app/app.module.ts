import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './view/home/home.component';
import {LoginComponent} from './view/login/login.component';
import {MainwindowComponent} from './view/mainwindow/mainwindow.component';
import {EmployeeComponent} from './view/modules/employeeModule/employee/employee.component';
import {UserComponent} from './view/modules/user/user.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MessageComponent} from "./util/dialog/message/message.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {EmployeeService} from "./service/employeeservice";
import {MatSelectModule} from "@angular/material/select";
import {ConfirmComponent} from "./util/dialog/confirm/confirm.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {DatePipe} from "@angular/common";
import { ArrearsByProgramComponent } from './report/view/arrearsbyprogram/arrearsbyprogram.component';
import {CountByDesignationComponent} from "./report/view/countbydesignation/countbydesignation.component";
import {MatChipsModule} from "@angular/material/chips";
import { PrivilageComponent } from './view/modules/privilage/privilage.component';
import {JwtInterceptor} from "./service/JwtInterceptor";
import {AuthorizationManager} from "./service/authorizationmanager";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { OperationComponent } from './view/modules/operation/operation.component';
import { PaymentComponent } from './view/modules/payment/payment.component';
import { IngredientComponent } from './view/modules/ingredientModule/ingredient/ingredient.component';
import {MatRadioModule} from "@angular/material/radio";
import { IngredientcountbycategoryComponent } from './report/view/ingredientcountbycategory/ingredientcountbycategory.component';
import { SupplierComponent } from './view/modules/supplierModule/supplier/supplier.component';
import { EmployeeFormComponent } from './view/modules/employeeModule/employee-form/employee-form.component';
import { SupplierFormComponent } from './view/modules/supplierModule/supplier-form/supplier-form.component';
import { IngredientFormComponent } from './view/modules/ingredientModule/ingredient-form/ingredient-form.component';
import { PurchaseOrderComponent } from './view/modules/purchase-order/purchase-order.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MainwindowComponent,
    EmployeeComponent,
    UserComponent,
    ConfirmComponent,
    ArrearsByProgramComponent,
    CountByDesignationComponent,
    MessageComponent,
    PrivilageComponent,
    OperationComponent,
    PaymentComponent,
    IngredientComponent,
    IngredientcountbycategoryComponent,
    SupplierComponent,
    EmployeeFormComponent,
    SupplierFormComponent,
    IngredientFormComponent,
    PurchaseOrderComponent,
  ],
    imports: [
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatGridListModule,
        MatCardModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatExpansionModule,
        MatIconModule,
        MatDialogModule,
        HttpClientModule,
        MatChipsModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatRadioModule,
    ],
  providers: [
    OperationComponent,
    EmployeeService,
    DatePipe,
    AuthorizationManager,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
