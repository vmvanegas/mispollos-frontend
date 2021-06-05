import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { OrderService } from '../../services/order.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('myChart') myChart: ElementRef

  constructor(
    private orderService: OrderService
  ) { }


  ngOnInit(): void { }


  ngAfterViewInit() {
    this.initPieCanvas()
    this.initLineCanvas()
    this.initBarCanvas()
  }

  initPieCanvas() {
    const canvas = <HTMLCanvasElement>document.getElementById('myChart')
    const ctx = canvas.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
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

  initLineCanvas() {
    const canvas = <HTMLCanvasElement>document.getElementById('myChartLine')
    const ctx = canvas.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
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

  initBarCanvas() {
    console.clear()
    let semanaPasada = []

    for (let i = 0; i <= 6; i++) {
      const hoy = new Date()
      hoy.setDate(hoy.getDate() - i);
      semanaPasada[hoy.toLocaleDateString()] = 0
    }

    this.orderService.getList().subscribe((
      res: any) => {
      let fechaProductos = new Date(res.data[0].fecha)
      console.log(fechaProductos.toLocaleDateString())
      res.data.forEach(element => {
        let fechaPedido = new Date(element.fecha)
        for (let i in semanaPasada) {
          
          if(fechaPedido.toLocaleDateString() == i) {
            semanaPasada[i] += 1
          }
        }
      });

      console.log(semanaPasada)

    }, err => {
      console.log(err)
    })

    const canvas = <HTMLCanvasElement>document.getElementById('myChartBar')
    const ctx = canvas.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
        datasets: [{
          label: 'Pedidos realizados',
          data: [56, 56, 82, 14, 49, 23],
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
