import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationComponent } from './administration.component';
import { CategoryComponent } from './components/category/category.component';
import { CustomerComponent } from './components/customer/customer.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { OrderComponent } from './components/order/order.component';
import { ProductsComponent } from './components/products/products.component';
import { ProviderComponent } from './components/provider/provider.component';


const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    children: [{
      path: 'productos',
      component: ProductsComponent
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
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
