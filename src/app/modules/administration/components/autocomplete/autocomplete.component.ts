import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  @Input() list;
  @Input() disabled = false
  @Input() form;
  @Input() placeholder = "Buscar...";
  @Input() controlName;
  @Input('selectedItem') selectedItemInput;
  @Output() onSelect = new EventEmitter<number>();
  @Output() onFocusOut = new EventEmitter<number>();

  @ViewChild('myInput') myInput: ElementRef

  public autoCompleteResults
  public showAutoCompleteResults
  public selectedItem = null
  public inputText

  constructor() { }

  ngOnInit(): void {
    if (this.selectedItemInput) {
      this.selectedItem = this.list.find(item => item.id == this.selectedItemInput);
    }
  }

  ngOnChanges(changes) {
    if (this.selectedItemInput) {
      this.selectedItem = this.list.find(item => item.id == this.selectedItemInput);
      this.inputText = this.selectedItem.nombre
    } else {
      this.inputText = ""
    }


  }

  ngAfterViewInit() {
    if (this.selectedItemInput) {
      this.inputText = this.selectedItem.nombre
    }

  }

  onSelectItem(item: any) {
    this.onSelect.emit(item);
  }

  focusOut(item: any) {
    this.onFocusOut.emit(item);
  }


  validateBackSpace(e) {
    let KeyID = e.keyCode;
    if ((KeyID == 8 || KeyID == 46) && this.selectedItem) {
      this.selectedItem = null
      this.inputText = ""
    }    
  }

  autoComplete(e) {
    this.autoCompleteResults = []
    this.showAutoCompleteResults = true  

    if (this.inputText == "") {
      this.autoCompleteResults = this.list.slice(1, 10)
    } else {
      this.list.forEach(item => {
        if (item.nombre.toLowerCase().indexOf(this.inputText.toLowerCase()) != -1) {
          if (this.autoCompleteResults.length < 10) {
            this.autoCompleteResults.push(item)
          } else {
            return
          }
        }
      })
      if (this.autoCompleteResults.length == 0) {
        this.showAutoCompleteResults = false
      }
    }
  }

  hideResults(e) {
    if (!this.selectedItem) {
      this.inputText = ""
    }
    if (this.inputText == "") {
      this.selectedItem = null
    }
    this.validateCustomer(this.selectedItem)
    this.focusOut(this.selectedItem)
    this.autoCompleteResults = []
    this.showAutoCompleteResults = false
  }

  selectItem(item) {
    this.inputText = item.nombre
    this.setCustomer(item)
    this.onSelectItem(item)
    this.selectedItem = item
    this.autoCompleteResults = []
    this.showAutoCompleteResults = false
  }


  setCustomer(item) {
    this.form.controls[this.controlName].setValue(item.id)
  }

  validateCustomer(item) {
    if (item == null) {
      this.form.controls[this.controlName].setValue(null)
    }
    this.form.controls[this.controlName].markAsTouched()
  }
}
