import { Injectable } from '@angular/core';
import { InputValidator } from './components/input/input.validator';
import { Observable, of } from 'rxjs';
import { RadiobuttonValidator } from './components/radiobutton/radiobutton.validator';
import { CheckboxValidator } from './components/checkbox/checkbox.validator';
import { ButtonValidator } from './components/button/button.validator';
import { SelectValidator } from './components/select/select.validation';
import { DateValidator } from './components/date/date.validator';
import { TextareaValidator } from './components/textarea/textarea.validator';
import { MultipleInputValidator } from './components/multipleinput/multipleinput.validator';
import { HtmlEditorValidator } from './components/htmlEditor/htmlEditor.validator';
import { IntegerValidator } from './components/integer/integer.validator';
import { NumberValidator } from './components/number/number.validator';
import { MultiSelectValidator } from './components/multiSelect/multiSelect.validator';
import { DurationValidator } from './components/duration/duration.validator';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SchemaValidator {

  constructor(
    private inputValidator: InputValidator,
    private radiobuttunValidator: RadiobuttonValidator,
    private checkboxValidator: CheckboxValidator,
    private buttonValidator: ButtonValidator,
    private selectValidator: SelectValidator,
    private dateValidator: DateValidator,
    private textareaValidator: TextareaValidator,
    private multipleInputValidator: MultipleInputValidator,
    private htmlEditorValidator: HtmlEditorValidator,
    private integerValidator: IntegerValidator,
    private numberValidator: NumberValidator,
    private multiSelectValidator: MultiSelectValidator,
    private durationValidator: DurationValidator
  ) { }

  /**
   * Validator method for given schema
   *
   * @param schema - Schema
   */
  validate(schema): Observable<boolean> {

    let isValid: boolean = false;

    if (!schema.ui) {
      return of(isValid);
    }

    switch (schema.ui.type) {
      case 'text':
        isValid = this.inputValidator.validateText(schema);
        break;
      case 'radio':
        isValid = this.radiobuttunValidator.validateRadio(schema);
        break;
      case 'checkbox':
        isValid = this.checkboxValidator.validateCheckbox(schema);
        break;
      case 'button':
        isValid = this.buttonValidator.validateButton(schema);
        break;
      case 'select':
        isValid = this.selectValidator.validateSelect(schema);
        break;
      case 'date':
        isValid = this.dateValidator.validateDate(schema);
        break;
      case 'sideBar':
        isValid = this.validateMenu(schema);
        break;
      case 'topBar':
        isValid = this.validateMenu(schema);
        break;
      case 'textarea':
        isValid = this.textareaValidator.validateTextarea(schema);
        break;
      case 'multipleInput':
        isValid = this.multipleInputValidator.validateMultipleInput(schema);
        break;
      case 'htmlEditor':
        isValid = this.htmlEditorValidator.validatehtmlEditor(schema);
        break;
      case 'integer':
        isValid = this.integerValidator.validateInteger(schema);
        break;
      case 'number':
        isValid = this.numberValidator.validateNumber(schema);
        break;
      case 'multiSelect':
        isValid = this.multiSelectValidator.validatemultiSelect(schema);
        break;
      case 'duration':
        isValid = this.durationValidator.validateduration(schema);
        break;
      default:
        isValid = true;
    }
    if (!isValid) {
      console.log(schema.ui.type, 'failed validations');
    }

    return of(isValid);
  }

  /**
   * Validate the schema for the type 'menu'
   *
   * @param schema - Schema from the backend
   */
  validateMenu(schema): boolean {
    let isValid: boolean = false;

    if (_.isEmpty(schema)) {
      return isValid;
    }

    if (_.isEmpty(schema.ui.type) ||
      _.isEmpty(schema.ui.element) ||
      _.isEmpty(schema.ui.value)) {
      return isValid;
    }

    // check typeof
    if (typeof schema.ui.type === 'string' &&
      typeof schema.ui.element === 'string' &&
      typeof schema.ui.group === 'string' &&
      typeof schema.ui.value === 'object') {
      isValid = true;
    }

    return isValid;
  }

}
