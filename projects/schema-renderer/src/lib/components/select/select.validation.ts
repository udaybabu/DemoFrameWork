import { Injectable } from '@angular/core';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class SelectValidator {

  constructor() { }

  /**
   * Validate the schema for the type 'select'
   * 
   * @param schema - Schema from the backend
   */
  validateSelect(schema): boolean {

    let isValid: boolean = false;

    if (_.isEmpty(schema)) {
      return isValid;
    }

    if (_.isEmpty(schema.ui.type) ||
      _.isEmpty(schema.ui.element) ||
      _.isEmpty(schema.ui.options)) {
      return isValid;
    }

    if (typeof schema.ui.type === 'string' &&
      typeof schema.ui.element === 'string' &&
      Array.isArray(schema.ui.options)) {
      isValid = true;
    }
    return isValid;
  }

}
