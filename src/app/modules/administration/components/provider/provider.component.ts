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

  public list = []
  public editing: boolean = false
  public editingItem: any = {}
  public page = 1
  public totalItems = []
  public idToDelete = ""
  public loading = true;
  public error = false
  public tableColums = [{ title: "Nombre", field: "nombre" }, { title: "Teléfono", field: "telefono" }]


  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    telephone: ['', [Validators.required]]
  })

  constructor(
    private formBuilder: FormBuilder,
    public providerService: ProviderService,
  ) {
    this.getList()
  }


  ngOnInit(): void {
  }

  public setIdToDelete(id) {
    this.idToDelete = id;
  }


  public getList() {
    console.log(this.page)
    this.providerService.get(this.page).subscribe(
      (res: any) => {
        this.list = res.data
        this.totalItems = new Array(Math.ceil(res.total / 10))
        this.error = false
        this.loading = false;
      },
      err => {
        console.log(err)
        this.loading = false;
        this.error = true
      }
    )
  }

  public send() {
    if (this.form.valid) {

      if (!this.editing) {

        const provider = {
          Nombre: this.form.controls['name'].value,
          Telefono: this.form.controls['telephone'].value
        }

        this.providerService.create(provider).subscribe(
          res => {
            this.form.reset()
            this.myModal.nativeElement.click();
            this.getList()
          },
          err => {
            console.log(err)
          }
        )
      } else {

        const provider = {
          Id: this.editingItem.id,
          Nombre: this.form.controls['name'].value,
          Telefono: this.form.controls['telephone'].value,
          CreatedOn: this.editingItem.createdOn
        }

        console.log("editado?")
        this.providerService.update(provider).subscribe(
          res => {
            console.log(res)
            this.editing = false
            this.editingItem = {}
            this.form.reset()
            this.myModal.nativeElement.click();
            this.getList()
          },
          err => {
            console.log(err)
          }
        )
      }
    }
  }

  public editItem(provider) {
    this.editing = true
    this.editingItem = provider
    this.form.patchValue({
      name: provider.nombre,
      telephone: provider.telefono
    })
  }


  public resetModalForm() {
    this.editing = false
    this.form.reset()
  }



}
