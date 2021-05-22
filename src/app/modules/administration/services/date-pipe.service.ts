import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatePipeService extends DatePipe {

  transform(value, format) {
    return super.transform(value, format);
  }

}
