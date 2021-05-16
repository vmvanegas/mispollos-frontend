import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public page = 1
  public customers = []
  public totalCustomers = []
  error: boolean= false
  loading: boolean = true


  constructor(
    private customerService: CustomerService //obj instanciado

  ) {

    }

  ngOnInit(): void {
  }

  public getCustomerList(){/*Funcion para entrar o llamar la lista Customer*/
      this.customerService.getCustomers(this.page).subscribe(
        (res:any) =>{/*Respuesta Positiva*/
        this.customers = res.data
        this.totalCustomers = new Array(Math.ceil(res.total/10))
        this.error = false
        this.loading = false
        console.log(this.customers);
      },err=>{/*respuestaNegativa*/
        (console.log(err))
        this.loading= false
        this.error = true
      }
    )
  }

}
