import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})

export class TextareaValidator {
    constructor() { }

    // validation for 'textarea'
    validateTextarea(obj): boolean {
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