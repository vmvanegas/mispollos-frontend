import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ProductService } from "../modules/administration/services/product.service";

@Injectable({ providedIn: 'root' })
export class QuantityValidator implements AsyncValidator {

  constructor(private productService: ProductService) {}

  validate = (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return this.productService.getById(ctrl.value.product).pipe(
      map((product: any) => (product.stock < ctrl.value.quantity ? { quantityExceeded: true } : null)),
      catchError(() => of(null))
    );
  }
}