import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RadiobuttonValidator {

  constructor() { }

  /**
   * Validate the schema for the type 'radiobutton'
   *
   * @param schema - Schema from the backend
   */
  validateRadio(schema): boolean {

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
