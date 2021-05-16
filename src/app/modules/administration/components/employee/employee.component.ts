import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  public page = 1
  public employeers = []
  public totalEmployeers = []
  error: boolean = false
  loading: boolean = false



  constructor(
    private employeeService: EmployeeService //Objeto instanciado
  ) { }

  ngOnInit(): void {
  }


  public getEmployeeList() {
    this.EmployeeService.getCustomers(this.page).subscribe(
      (res:any) =>{/*Respuesta Positiva*/
      this.employeers = res.data
      this.totalEmployeers = new Array(Math.ceil(res.total/10))
      this.error = false
      this.loading = false
      console.log(this.employeers);
    },err=>{/*respuestaNegativa*/
      (console.log(err))
      this.loading= false
      this.error = true
    }
  )

  }

}
