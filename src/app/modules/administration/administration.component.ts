import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  @ViewChild('admin') admin: ElementRef
  @ViewChild('btnToggle') btnToggle: ElementRef
  @ViewChild('sideNav') sideNav: ElementRef
  @ViewChild('bgShadow') bgShadow: ElementRef
  

  public innerWidth

  constructor(
    private authService : AuthService
  ) { }

  ngOnInit(): void {
  }


  logout() {
    this.authService.logout()
  }

  toggleSideBar() {
    this.admin.nativeElement.classList.toggle("hide-sideNav")
    if(window.innerWidth <= 991) {
      this.bgShadow.nativeElement.classList.add("show")
    }
  }
  
  closeSideBar(e) {
    if(e.target === this.bgShadow.nativeElement){
      if(window.innerWidth <= 991) {
        this.admin.nativeElement.classList.remove("hide-sideNav")
        this.bgShadow.nativeElement.classList.remove("show")
      }
    }
  }

  resize() {
    if(window.innerWidth > 991) {
      this.bgShadow.nativeElement.classList.remove("show")
    }
  }

}
