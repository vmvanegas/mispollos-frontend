import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationComponent } from './administration.component';
import { CategoryComponent } from './components/category/category.component';
import { CustomerComponent } from './components/customer/customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { OrderComponent } from './components/order/order.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsComponent } from './components/products/products.component';
import { ProviderComponent } from './components/provider/provider.component';


const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'productos',
        component: ProductsComponent,
        children: [
          {
            path: '',
            component: ProductsListComponent
          },
          {
            path: 'crear',
            component: ProductFormComponent
          },
          {
            path: 'crear/:id',
            component: ProductFormComponent
          }
        ]
      },
      {
        path: 'pedidos',
        component: OrderComponent
      },
      {
        path: 'categorias',
        component: CategoryComponent
      },
      {
        path: 'clientes',
        component: CustomerComponent
      },
      {
        path: 'proveedores',
        component: ProviderComponent
      },
      {
        path: 'empleados',
        component: EmployeeComponent
      },
      {
        path: '',
        redirectTo: 'productos'
      },
      {
        path: '**',
        redirectTo: 'productos'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
