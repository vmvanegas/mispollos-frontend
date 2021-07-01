import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {

  @ViewChild('myModalQuestion') public myModalQuestion: ElementRef;

  @Input() list;
  @Input() service;
  @Input() page;
  @Input() totalItems;
  @Input() colums;
  @Input() actions = true;
  @Output() onEdit = new EventEmitter<number>();
  @Output() onChangePage = new EventEmitter<number>();

  public loading = true;
  public idToDelete
  public form: FormGroup
  public searchString: string = null

  constructor(
    private http: HttpClient,
    private excelService: ExcelService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { 
    this.form = this.formBuilder.group({
      search: ['', [Validators.maxLength(40)]]
    })
  }

  get f() {
    return this.form.controls
  }

  ngOnInit(): void {
    this.getList()
    console.log("cargando componente")
  }

  public search() {
    this.searchString = this.f.search.value
    if (this.searchString) {
      console.log("query?")      
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          search: this.searchString
        },
        queryParamsHandling: 'merge',
        // preserve the existing query params in the route
        // do not trigger navigation
      });
      this.getList();
    } else {
      this.clearSearch()
    }
  }

  clearSearch() {
    this.router.navigate([], {relativeTo: this.route,});
    this.form.reset()
    this.searchString = null
    this.getList();
  }

  async exportData() {
    this.service.getList().subscribe(
      res => {
        this.excelService.exportAsExcelFile(res.data, 'data');
      }, 
      err => { console.log(err) })
    
  }


  sortByDate(list) {
    return list.sort((a, b) => (new Date(a.updatedOn) > new Date(b.updatedOn)) ? 1 : ((new Date(b.updatedOn) > new Date(a.updatedOn)) ? -1 : 0))
  }

  public getList() {
    this.service.get(this.page, this.searchString).subscribe(
      (res: any) => {
        this.list = res.data
        this.totalItems = new Array(Math.ceil(res.total / 10))
        this.loading = false
      }, err => {
        (console.log(err))
        this.loading = false
      })
  }


  public changePage(page) {
    this.loading = true
    if (page <= this.totalItems.length && page > 0) {
      this.page = page
      this.getList()
    }
    this.onChangePage.emit(this.page);
  }


  public deleteEmployee(id) {
    this.service.delete(id).subscribe(
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


  public getField(field, item) {
    var split = field.split(".");
    if (split.length > 1) {
      item = item[split[0]];
      split.shift();
      return this.getField(split.join("."), item);
    }
    return item[split[0]];
  }
}
