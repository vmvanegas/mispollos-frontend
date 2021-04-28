import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public items = [1,2,3,4,5,6,7,8,9,10,11];

  constructor() { }

  ngOnInit(): void {
  }

}
