import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationRoutingModule } from './administration-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { ProductsComponent } from './components/products/products.component';
import { AdministrationComponent } from './administration.component';
import { CategoryComponent } from './components/category/category.component';
import { ProviderComponent } from './components/provider/provider.component';
import { OrderComponent } from './components/order/order.component';
import { CustomerComponent } from './components/customer/customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { TableComponent } from './components/table/table.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { InputComponent } from './components/input/input.component';
import { FieldErrorsComponent } from './components/field-errors/field-errors.component';

// Implementado locale de colombia para fechas y currencies
import { registerLocaleData } from '@angular/common';
import localeCo from '@angular/common/locales/es-CO'
registerLocaleData(localeCo, 'es-CO');


@NgModule({
  declarations: [
    ProductsComponent,
    AdministrationComponent,
    CategoryComponent,
    ProviderComponent,
    OrderComponent,
    CustomerComponent,
    EmployeeComponent,
    DashboardComponent,
    ProductFormComponent,
    ProductsListComponent,
    TableComponent,
    OrderListComponent,
    OrderFormComponent,
    MyAccountComponent,
    AutocompleteComponent,
    BreadcrumbComponent,
    InputComponent,
    FieldErrorsComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  bootstrap: [AdministrationComponent],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'es-CO' // 'de-DE' for Germany, 'fr-FR' for France ...
  },
  ]
})
export class AdministrationModule { }
