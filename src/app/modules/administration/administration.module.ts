import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { AdministrationComponent } from './administration.component';
import { CategoryComponent } from './components/category/category.component';
import { ProviderComponent } from './components/provider/provider.component';
import { OrderComponent } from './components/order/order.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

@NgModule({
  declarations: [
    ProductsComponent, 
    AdministrationComponent, 
    CategoryComponent, 
    ProviderComponent, 
    OrderComponent, 
    CustomerComponent, 
    EmployeeComponent, 
    DashboardComponent, ProductFormComponent, ProductsListComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    ReactiveFormsModule
  ],
  bootstrap: [AdministrationComponent]
})
export class AdministrationModule { }
