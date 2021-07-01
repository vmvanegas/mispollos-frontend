import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  routes = []
  base: string = "/administracion/"

  constructor(private router: Router) {
    router.events.subscribe(val => {
      this.setRoutes()
    });
  }

  ngOnInit(): void {
    this.setRoutes()
  }

  setRoutes() {
    this.routes = this.currentUrl().split("/")
  }

  currentUrl() {
    return window.location.pathname.replace(this.base, "");
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }



}
