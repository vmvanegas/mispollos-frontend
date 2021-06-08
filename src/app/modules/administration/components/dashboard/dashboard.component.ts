import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { DashboardService } from '../../services/dashboard.service';


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
        data = res.data
        console.log("labels", labels)
        console.log("data", data)
        this.initBarCanvas(labels, data)
        this.getBestSellingProduct()
      },
      err => { })

  }


  getBestSellingProduct() {
    this.dashboardService.getBestSellingProduct().subscribe(
      res => {
        this.bestSellingProduct = res
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
      },
      err => { })
  }

  initBarCanvas(labels, data) {
    console.clear()

    const canvas = <HTMLCanvasElement>document.getElementById('myChartBar')
    const ctx = canvas.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Pedidos realizados',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
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
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
