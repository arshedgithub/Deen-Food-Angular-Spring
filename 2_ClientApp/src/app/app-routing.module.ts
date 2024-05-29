import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./view/login/login.component";
import {MainwindowComponent} from "./view/mainwindow/mainwindow.component";
import {EmployeeComponent} from "./view/modules/employee/employee.component";
import {HomeComponent} from "./view/home/home.component";
import {UserComponent} from "./view/modules/user/user.component";
import {ArrearsByProgramComponent} from "./report/view/arrearsbyprogram/arrearsbyprogram.component";
import {PaymentComponent} from "./view/modules/payment/payment.component";
import {IngredientComponent} from "./view/modules/ingredient/ingredient.component";
import {OperationComponent} from "./view/modules/operation/operation.component";
import {PrivilageComponent} from "./view/modules/privilage/privilage.component";

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "", redirectTo: 'login', pathMatch: 'full'},
  {
    path: "main",
    component: MainwindowComponent,
    children: [
      {path: "home", component: HomeComponent},
      {path: "employee", component: EmployeeComponent},
      {path: "user", component: UserComponent},
      {path: "privilege", component: PrivilageComponent},
      {path: "operation", component: OperationComponent},
      {path:"reports", component: ArrearsByProgramComponent},
      {path:"payments",component:PaymentComponent},
      {path: "home/payments", redirectTo: 'payments', pathMatch: 'full'},
      {path: "ingredient", component: IngredientComponent},
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
