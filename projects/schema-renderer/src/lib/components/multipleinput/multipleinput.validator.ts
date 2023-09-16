import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})

export class MultipleInputValidator {
    constructor() { }

    // validation for 'textarea'
    validateMultipleInput(obj): boolean {
    if (_.isEmpty(obj)) {
      return false;
    }

    if (_.isEmpty(obj.ui.type)) {
      return false;
    }

    if (typeof obj.ui.type === 'string'
      && typeof obj.ui.element === 'string') {
      return true;
    }

    return false;
  }
}