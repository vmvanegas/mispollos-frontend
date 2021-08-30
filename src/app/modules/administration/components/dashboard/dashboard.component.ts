import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { DashboardService } from '../../services/dashboard.service';
import * as moment from 'moment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('myChart') myChart: ElementRef

  public bestSellingProduct
  public leastSoldProduct
  public salesIncreasePercentage
  public lowStock
  public closeDueDate
  public totalOrders
  public totalCustomers
  public totalProviders
  public totalEmployee

  constructor(
    private dashboardService: DashboardService
  ) { }


  ngOnInit(): void { }


  ngAfterViewInit() {
    let labels = []
    let data = []

    this.dashboardService.getLastWeek().subscribe(
      (res: any) => {
        labels = res.labels
        data = res.data;
        /* .map(element => element + (Math.floor(Math.random() * 10) + 1)); */
        this.initBarCanvas(labels, data)
        this.getBestSellingProduct()
      },
      err => { })

  }

  isNaN(number: number): boolean {
    return this.isNaN(number)
  }


  getBestSellingProduct() {
    this.dashboardService.getBestSellingProduct().subscribe(
      res => {
        this.bestSellingProduct = res
        console.log("this.bestSellingProduct", this.bestSellingProduct)
        this.getLeastSoldProduct()
      },
      err => { })
  }

  getLeastSoldProduct() {
    this.dashboardService.getLeastSoldProduct().subscribe(
      res => {
        this.leastSoldProduct = res
        this.getSalesIncreasePercentage()
      },
      err => { })
  }

  getSalesIncreasePercentage() {
    this.dashboardService.getSalesIncreasePercentage().subscribe(
      res => {
        console.log(res)
        this.salesIncreasePercentage = res
        this.getLowStock()
      },
      err => { })
  }

  getLowStock() {
    this.dashboardService.getLowStock().subscribe(
      res => {
        this.lowStock = res
        this.getCloseDueDate()
      },
      err => { })
  }

  getCloseDueDate() {
    this.dashboardService.getCloseDueDate().subscribe(
      res => {
        this.closeDueDate = res
        this.closeDueDate.fechaVencimiento = moment(this.closeDueDate.fechaVencimiento).diff(Date.now(), 'days') + 1
        this.getTotalCardsInfo()
      },
      err => { })
  }

  getTotalCardsInfo(){
    this.getTotalOrders()
    this.getTotalCustomers()
    this.getTotalProviders()
    this.getTotalEmployees()
  }

  getTotalCustomers(){
    this.dashboardService.totalCustomers().subscribe(
      res => {
        this.totalCustomers = res
      }, 
      err => {}
    )
  }

  getTotalProviders(){
    this.dashboardService.totalProviders().subscribe(
      res => {
        this.totalProviders = res
      }, 
      err => {}
    )
  }

  getTotalEmployees(){
    this.dashboardService.totalEmployees().subscribe(
      res => {
        this.totalEmployee = res
      }, 
      err => {}
    )
  }

  getTotalOrders(){
    this.dashboardService.totalOrders().subscribe(
      res => {
        this.totalOrders = res
      }, 
      err => {}
    )
  }

  initBarCanvas(labels, data) {
    const canvas = <HTMLCanvasElement>document.getElementById('myChartBar')
    const ctx = canvas.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          barPercentage: 1,
          label: 'Pedidos realizados',
          data: data,
          /* data: [10, 15, 20, 18, 16, 25, 19], */
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 0
        }]
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
              
            },
            ticks: {
              color: "#99abb4",
              font: {
                size: 14,
                family: "'Open Sans', sans-serif"
            }
            }
          },

          y: {
            ticks: {
              color: "#99abb4",
              font: {
                size: 14,
                family: "'Open Sans', sans-serif"
            }
            }
          }
        },
        plugins: {
          legend: {
              labels: {
                  // This more specific font property overrides the global property
                  font: {
                      
                      size: 14,
                      family: "'Open Sans', sans-serif"
                  }
              }
          }
      }
      }
    });
  }

}
