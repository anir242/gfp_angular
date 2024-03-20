import {AbstractControl, UntypedFormControl, UntypedFormGroup, ValidatorFn} from '@angular/forms';
import {concat} from 'rxjs';

export default class Validation {
  static match(checkControl: UntypedFormControl): ValidatorFn {
    return (controls: AbstractControl) => {
      if (checkControl?.errors && !checkControl?.errors?.matching) {
        return null;
      }

      if (controls?.value !== checkControl?.value) {
        controls.setErrors({mismatch: true});
        return {mismatch: true};
      } else {
        return null;
      }
    };
  }
}

export function ConfirmedValidator(controlName: string, matchingControlName: string): any {
  return (formGroup: UntypedFormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.mismatch) {
      return;
    }
    if ((control.value !== matchingControl?.value)) {
      matchingControl.setErrors({mismatch: true});
    } else {
      matchingControl.setErrors(null);
    }

  };
}
