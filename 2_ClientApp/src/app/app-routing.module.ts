import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./view/login/login.component";
import {MainwindowComponent} from "./view/mainwindow/mainwindow.component";
import {EmployeeComponent} from "./view/modules/employeeModule/employee/employee.component";
import {HomeComponent} from "./view/home/home.component";
import {UserComponent} from "./view/modules/user/user.component";
import {PaymentComponent} from "./view/modules/payment/payment.component";
import {IngredientComponent} from "./view/modules/ingredientModule/ingredient/ingredient.component";
import {OperationComponent} from "./view/modules/operation/operation.component";
import {PrivilageComponent} from "./view/modules/privilage/privilage.component";
import {CountByDesignationComponent} from "./report/view/countbydesignation/countbydesignation.component";
import {
  IngredientcountbycategoryComponent
} from "./report/view/ingredientcountbycategory/ingredientcountbycategory.component";
import {SupplierComponent} from "./view/modules/supplierModule/supplier/supplier.component";
import {PurchaseOrderComponent} from "./view/modules/purchase-order/purchase-order.component";
import {GrnComponent} from "./view/modules/grn/grn.component";
import {ProductComponent} from "./view/modules/product/product.component";
import {ProductionOrderComponent} from "./view/modules/production-order/production-order.component";
import {ProductionComponent} from "./view/modules/production/production.component";
import {CustomerComponent} from "./view/modules/customerModule/customer/customer.component";
import {CustomerOrderComponent} from "./view/modules/customer-order/customer-order.component";
import {InvoiceComponent} from "./view/modules/invoice/invoice.component";

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
      {path: "ingredient", component: IngredientComponent},
      {path: "product", component: ProductComponent},
      {path: "supplier", component: SupplierComponent},
      {path: "purchase", component: PurchaseOrderComponent},
      {path: "grn", component: GrnComponent},
      {path: "customer", component: CustomerComponent},
      {path: "customerorder", component: CustomerOrderComponent},
      {path: "productionorder", component: ProductionOrderComponent},
      {path: "production", component: ProductionComponent},
      {path: "invoice", component: InvoiceComponent},
      {path: "payments",component:PaymentComponent},
      {path: "home/payments", redirectTo: 'payments', pathMatch: 'full'},
      {path: "reports/countbydesignation", component: CountByDesignationComponent},
      {path: "reports/ingredientcountbycategory", component: IngredientcountbycategoryComponent},
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
