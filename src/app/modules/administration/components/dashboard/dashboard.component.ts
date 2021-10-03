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
        /* this.bestSellingProduct = res */
        this.bestSellingProduct = [
          {
            product: {
              nombre: "Jamon de cerdo sin conserv pietrán 431 Gramos"
            },
            quantity: 100
          },
          {
            product: {
              nombre: "Yogurt original melocotón botella ALPINA 1750 gr"
            },
            quantity: 84
          },
          {
            product: {
              nombre: "Jamon de cerdo sin conserv pietrán 431 Gramos"
            },
            quantity: 65
          },
          {
            product: {
              nombre: "Queso Mozarella bloque ALPINA"
            },
            quantity: 50
          },
          {
            product: {
              nombre: "Leche Alqueria Deslactosada Sixpack x 1300 Ml c.u"
            },
            quantity: 49
          },
        ]
        console.log("this.bestSellingProduct", this.bestSellingProduct)
        this.getLeastSoldProduct()
      },
      err => { })
  }

  getLeastSoldProduct() {
    this.dashboardService.getLeastSoldProduct().subscribe(
      res => {
        /*  this.leastSoldProduct = res */
        this.leastSoldProduct = [
          {
            product: {
              nombre: "Lomo Ancho Ancla & Viento 450 Gr"
            },
            quantity: 1
          },
          {
            product: {
              nombre: "Pollo con visceras x 1800 Gramo"
            },
            quantity: 2
          },
          {
            product: {
              nombre: "Pierna pernil de pollo marinado Frescampo x 1000 g"
            },
            quantity: 5
          },
          {
            product: {
              nombre: "Nuggets de pollo apanados frescampo x 20 Unds"
            },
            quantity: 7
          },
          {
            product: {
              nombre: "Filete pechuga de pollo"
            },
            quantity: 10
          },
        ]
        this.getSalesIncreasePercentage()
      },
      err => { })
  }

  getSalesIncreasePercentage() {
    this.dashboardService.getSalesIncreasePercentage().subscribe(
      res => {
        console.log("getSalesIncreasePercentage", res)
        /* this.salesIncreasePercentage = res */
        this.salesIncreasePercentage = {
          currentWeek: 35,
          increase: true,
          lastWeek: 18,
          percent: 94.44
        }
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

  getTotalCardsInfo() {
    this.getTotalOrders()
    this.getTotalCustomers()
    this.getTotalProviders()
    this.getTotalEmployees()
  }

  getTotalCustomers() {
    this.dashboardService.totalCustomers().subscribe(
      res => {
        this.totalCustomers = res
      },
      err => { }
    )
  }

  getTotalProviders() {
    this.dashboardService.totalProviders().subscribe(
      res => {
        this.totalProviders = res
      },
      err => { }
    )
  }

  getTotalEmployees() {
    this.dashboardService.totalEmployees().subscribe(
      res => {
        this.totalEmployee = res
      },
      err => { }
    )
  }

  getTotalOrders() {
    this.dashboardService.totalOrders().subscribe(
      res => {
        this.totalOrders = res
      },
      err => { }
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
          /* data: data, */
          data: [10, 15, 20, 18, 16, 25, 19],
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
