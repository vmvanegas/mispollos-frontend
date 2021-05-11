import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProviderService } from '../../services/provider.service';


@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {

  @ViewChild('myModal') public myModal: ElementRef;  
  @ViewChild('myModalQuestion') public myModalQuestion: ElementRef;  

  public providers = []
  public editing: boolean = false
  public editingProvider: any = {}
  public page = 1
  public totalProviders = []
  public idToDelete = ""
  public loading = true;

  providerForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    telephone: ['', [Validators.required]]
  })

  constructor(
    private formBuilder: FormBuilder,
    private providerService: ProviderService,
    private elementRef: ElementRef
    ) { 
    this.getProvidersList()
    console.log("constructor")
  }

  ngOnInit(): void {
    console.log("ngOnInit")
  }

  ngAfterViewInit() {
    console.log(this.page)
    
  }

  public setIdToDelete(id) {
    this.idToDelete = id;
  }


  public getProvidersList() {
    this.providerService.getProviders(this.page).subscribe(
      (res: any)=>{
        console.log(res)
        this.providers = res.data
        this.totalProviders = new Array(Math.ceil(res.total/10))   
        this.loading = false; 
      }, 
      err=>{
        console.log(err)
      }
      )
  }

  public sendProvider() {
    if(this.providerForm.valid){

      if(!this.editing){

        const provider = {
          Nombre: this.providerForm.controls['name'].value,
          Telefono: this.providerForm.controls['telephone'].value
        }
        
        this.providerService.createProvider(provider).subscribe(
          res => {
            console.log(res)
            this.providerForm.reset()
            this.myModal.nativeElement.click();
            this.getProvidersList()
          }, 
          err => {
            console.log(err)
          }
        )
      } else {

        const provider = {
          Id: this.editingProvider.id,
          Nombre: this.providerForm.controls['name'].value,
          Telefono: this.providerForm.controls['telephone'].value
        }

        console.log("editado?")
        this.providerService.updateProvider(provider).subscribe(
          res=>{
            console.log(res)
            this.editing = false
            this.editingProvider = {}
            this.providerForm.reset()
            this.myModal.nativeElement.click();
            this.getProvidersList()
          }, 
          err=>{
            console.log(err)
          }
          )
      }
    }
  }


  public deleteProvider(id) {
    this.providerService.deleteProvider(id).subscribe(
      res=>{
      console.log(res)
      this.idToDelete = "";
      this.myModalQuestion.nativeElement.click()
      this.getProvidersList()
    }, err=>{
      console.log(err)
    })
    
  }



  public editProvider(provider) {
    this.editing = true
    this.editingProvider = provider
    this.providerForm.patchValue({
      name: provider.nombre,
      telephone: provider.telefono
    })
  }


  public changePage(page) {  
    if(!this.loading) {
      if(page <= this.totalProviders.length && page > 0){
        this.page = page
        this.setTableNavigationLinkActive()
        this.providerService.getProviders(this.page).subscribe(
          (res: any)=>{
            this.providers = res.data
          }, 
          err=>{
            console.log(err)
          }
          )
      }
    }
  }


  setTableNavigationLinkActive() {
    let elements = []
    this.elementRef.nativeElement.querySelectorAll('.page-link').forEach(item => {
      if(item.classList.contains("active")){
        item.classList.remove("active")
      }
      elements.push(item)
    })
    elements[this.page].classList.add("active")
  }

}
