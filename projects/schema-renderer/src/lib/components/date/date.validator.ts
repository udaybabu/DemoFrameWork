import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DateValidator {

  constructor() { }

  /**
   * Validate the schema for the type 'Date'
   * 
   * @param schema - Schema from the backend
   */
  validateDate(schema): boolean {

    let isValid: boolean = false;

    if (_.isEmpty(schema)) {
      return isValid;
    }

    if (_.isEmpty(schema.ui.type) ||
      _.isEmpty(schema.ui.element)) {
      return isValid;
    }

    if (typeof schema.ui.type === 'string' &&
      typeof schema.ui.element === 'string') {
      isValid = true;
    }

    return isValid;
  }

}
