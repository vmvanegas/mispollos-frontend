import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {

  @ViewChild('myModalQuestion') public myModalQuestion: ElementRef;

  @Input() list;
  @Input() serviceGet;
  @Input() serviceDelete;
  @Input() page;
  @Input() totalItems;
  @Input() colums;
  @Output() onEdit = new EventEmitter<number>();

  public loading = true;
  public idToDelete

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getList()
  }

  public getList() {
    this.serviceGet(this.page).subscribe(
       (res:any) =>{
       this.list = res.data
       this.totalItems = new Array(Math.ceil(res.total/10))
       this.loading = false 
     },err=>{
       (console.log(err))
       this.loading= false
     })
  }


  public changePage(page) {
    this.loading = true
    if (page <= this.totalItems.length && page > 0) {
      this.page = page
      this.getList()
    }
  }


   public deleteEmployee(id) {
    this.serviceDelete(id).subscribe(
      res => {
        console.log(res)
        this.idToDelete = "";
        this.myModalQuestion.nativeElement.click()
        this.getList()
      }, err => {
        console.log(err)
      }
    )

  }

  editItem(item: any) {
    this.onEdit.emit(item);
  }

  public setIdToDelete(id) {
    this.idToDelete = id;
  }

}
