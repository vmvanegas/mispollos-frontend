import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('myDropDown') myDropDown: ElementRef
  public user
  
  constructor(
    private authService : AuthService,
  ) { 
    this.user = JSON.parse(localStorage.getItem('user'))
    console.log(this.user)
  }

  ngOnInit(): void {    
  }

  currentYear(){
    return new Date().getFullYear()
  }

  mouseEnter() {
    this.myDropDown.nativeElement.style.maxHeight = this.myDropDown.nativeElement.scrollHeight + "px"
  }

  mouseLeave() {
    this.myDropDown.nativeElement.style.maxHeight = 0
  }


  configDropDown() {
    this.myDropDown.nativeElement
  }


  ngAfterViewInit() {
    if(window.innerWidth <= 991) {
      this.admin.nativeElement.classList.add("hide-sideNav")
    }
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
        this.admin.nativeElement.classList.add("hide-sideNav")
        this.bgShadow.nativeElement.classList.remove("show")
      }
    }
  }

  resize() {
    if(window.innerWidth > 991) {
      this.bgShadow.nativeElement.classList.remove("show")
    }

    if(window.innerWidth <= 991) {
      this.admin.nativeElement.classList.add("hide-sideNav")
    }
  }

}
