import { FormControl } from '@angular/forms';
import * as moment from 'moment';


export function dateValidator(control: FormControl): { [s: string]: boolean } {
  if (control.value) {
    const date = moment(control.value);
    const today = moment();
    if (date.isBefore(today)) {
      return { 'invalidDate': true }
    }
  }
  return null;
}