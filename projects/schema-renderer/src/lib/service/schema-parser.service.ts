import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { FieldConfig } from '../model/field.interface';
import { Schema } from '../model/schema.model';
import { SchemaValidator } from '../schema.validator';

@Injectable({
  providedIn: 'root'
})
export class SchemaParser {

  constructor(private schemaValidator: SchemaValidator) { }

  menuMap = new Map();
  childDefaultKey = '';

  /**
   * UI parser.
   *
   * @param schema - Schema from the backend
   * @param groupKey - if groupKey is '', retrun all the ui component
   */
  public parse(schema: Schema, groupKey: string): Observable<FieldConfig[]> {

    const uiSchema: FieldConfig[] = [];

    if (groupKey === '' || groupKey === undefined) {
      groupKey = 'no_group_key';
    }

    for (const [key, value] of Object.entries(schema.properties)) {

      const defaultUiSchema = this.defaultUiSchema();

      if (value.ui.element === 'menu') {
        continue;
      }

      if (value.ui.group === groupKey || groupKey === 'no_group_key') {

        // switch case
        switch (value.ui.type) {
          case 'text':
            defaultUiSchema.type = value.ui.element;
            defaultUiSchema.label = value.title;
            defaultUiSchema.inputType = value.ui.type;
            defaultUiSchema.name = key;
            defaultUiSchema.value = value.ui.default;
            if (value.pattern) {
              defaultUiSchema.validation.push({
                name: 'pattern',
                validator: Validators.pattern(value.pattern),
                message: 'Validation failed'
              });
            }
            break;

          case 'radio':
            defaultUiSchema.type = 'radiobutton';
            defaultUiSchema.label = value.title;
            defaultUiSchema.inputType = value.ui.type;
            defaultUiSchema.name = key;
            defaultUiSchema.value = value.ui.default;
            defaultUiSchema.options = value.ui.options;
            defaultUiSchema.desc = value.desc;
            defaultUiSchema.show = value.ui.show;
            break;

          case 'date':
            defaultUiSchema.type = value.ui.type;
            defaultUiSchema.label = value.title;
            defaultUiSchema.inputType = value.ui.type;
            defaultUiSchema.name = key;
            defaultUiSchema.value = value.ui.default;
            defaultUiSchema.show = value.ui.show;
            defaultUiSchema.childOf = value.ui.childOf;
            break;

          case 'select':
            defaultUiSchema.type = value.ui.element;
            defaultUiSchema.label = value.title;
            defaultUiSchema.desc = value.desc;
            defaultUiSchema.inputType = value.ui.type;
            defaultUiSchema.name = key;
            defaultUiSchema.value = value.ui.default;
            defaultUiSchema.options = value.ui.options;
            defaultUiSchema.show = value.ui.show;
            defaultUiSchema.childOf = value.ui.childOf;
            break;
          case 'checkbox':
            defaultUiSchema.type = value.ui.type;
            defaultUiSchema.label = value.title;
            defaultUiSchema.desc = value.desc;
            defaultUiSchema.inputType = value.ui.type;
            defaultUiSchema.name = key;
            defaultUiSchema.value = value.ui.value.map(d => ({
              value: value.ui.default.some(v => v === d.value),
              label: d.label, name: d.name
            }));
            defaultUiSchema.options = value.ui.value;
            defaultUiSchema.show = value.ui.show;
            defaultUiSchema.childOf = value.ui.childOf;
            break;
          case 'input':
            defaultUiSchema.type = value.ui.type;
            defaultUiSchema.label = value.title;
            defaultUiSchema.inputType = value.ui.type;
            defaultUiSchema.name = key;
            defaultUiSchema.desc = value.desc;
            defaultUiSchema.value = value.ui.default;
            defaultUiSchema.show = value.ui.show;
            defaultUiSchema.childOf = value.ui.childOf;
            break;
          case 'textarea':
            defaultUiSchema.type = value.ui.type;
            defaultUiSchema.label = value.title;
            defaultUiSchema.inputType = value.ui.type;
            defaultUiSchema.name = key;
            defaultUiSchema.desc = value.desc;
            defaultUiSchema.value = value.ui.default;
            defaultUiSchema.show = value.ui.show;
            defaultUiSchema.childOf = value.ui.childOf;
            break;
          case 'htmlEditor':
            defaultUiSchema.type = value.ui.type;
            defaultUiSchema.label = value.title;
            defaultUiSchema.inputType = value.ui.type;
            defaultUiSchema.name = key;
            defaultUiSchema.desc = value.desc;
            defaultUiSchema.value = value.ui.default;
            defaultUiSchema.show = value.ui.show;
            defaultUiSchema.childOf = value.ui.childOf;
            break;
          case 'multipleInput':
            defaultUiSchema.type = value.ui.type;
            defaultUiSchema.label = value.title;
            defaultUiSchema.inputType = value.ui.type;
            defaultUiSchema.name = key;
            defaultUiSchema.value = value.ui.default;
            defaultUiSchema.desc = value.desc;
            defaultUiSchema.show = value.ui.show;
            defaultUiSchema.childOf = value.ui.childOf;
            defaultUiSchema.options = value.ui.options;
            break;

          case 'button':
            defaultUiSchema.type = value.ui.element;
            defaultUiSchema.label = value.title;
            defaultUiSchema.inputType = value.ui.type;
            defaultUiSchema.name = key;
            defaultUiSchema.value = value.ui.default;
            defaultUiSchema.show = value.ui.show;
            break;

          case 'groupStart':
            defaultUiSchema.type = value.ui.element;
            defaultUiSchema.label = value.title;
            defaultUiSchema.inputType = value.ui.type;
            defaultUiSchema.name = key;
            defaultUiSchema.show = value.ui.show;
            break;

          case 'link':
            defaultUiSchema.type = value.ui.type;
            defaultUiSchema.label = value.title;
            defaultUiSchema.inputType = value.ui.type;
            defaultUiSchema.name = key;
            defaultUiSchema.options = value.ui.default;
            defaultUiSchema.desc = value.desc;
            defaultUiSchema.link = value.ui.value;
            defaultUiSchema.show = value.ui.show;
            defaultUiSchema.childOf = value.ui.childOf;
            break;
          case 'integer':
            defaultUiSchema.type = value.ui.type;
            defaultUiSchema.label = value.title;
            defaultUiSchema.inputType = value.ui.type;
            defaultUiSchema.name = key;
            defaultUiSchema.desc = value.desc;
            defaultUiSchema.value = value.ui.default;
            defaultUiSchema.show = value.ui.show;
            defaultUiSchema.childOf = value.ui.childOf;
            break;
          case 'number':
            defaultUiSchema.type = value.ui.type;
            defaultUiSchema.label = value.title;
            defaultUiSchema.inputType = value.ui.type;
            defaultUiSchema.name = key;
            defaultUiSchema.desc = value.desc;
            defaultUiSchema.value = value.ui.default;
            defaultUiSchema.show = value.ui.show;
            defaultUiSchema.childOf = value.ui.childOf;
            break;
          case 'multiSelect':
            defaultUiSchema.type = value.ui.type;
            defaultUiSchema.label = value.title;
            defaultUiSchema.inputType = value.ui.type;
            defaultUiSchema.name = key;
            defaultUiSchema.value = value.ui.default;
            defaultUiSchema.desc = value.desc;
            defaultUiSchema.link = value.ui.value;
            defaultUiSchema.show = value.ui.show;
            defaultUiSchema.childOf = value.ui.childOf;
            defaultUiSchema.options = value.ui.options;
            break;
          case 'duration':
            defaultUiSchema.type = value.ui.type;
            defaultUiSchema.label = value.title;
            defaultUiSchema.inputType = value.ui.type;
            defaultUiSchema.name = key;
            defaultUiSchema.desc = value.desc;
            defaultUiSchema.value = value.ui.default;
            defaultUiSchema.show = value.ui.show;
            defaultUiSchema.childOf = value.ui.childOf;
            break;
          default:
            break;
        }
        // push the object into an array
        uiSchema[value.ui.order] = defaultUiSchema;
      }
    }

    return of(uiSchema);
  }


  /**
   * Method to parse and get the menu JSON
   *
   * @param schema - JSON schema from backend
   */
  public menuParser(schema: Schema) {

    const mainJson = { menu: [], type: '' };

    for (const [keys, value] of Object.entries(schema.properties)) {

      // main menu :eg notification
      if (value.ui.element === 'menu' && value.ui.group === '') {
        mainJson.menu.push({
          title: value.title,
          group: value.ui.group,
          key: keys
        });
      } else if (value.ui.element === 'menu') {
        this.menuMap.set(keys, value);
      }
      mainJson.type = value.ui.type;
    }

    this.menuMap.forEach((v, k) => {

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < mainJson.menu.length; i++) {
        if (mainJson.menu[i].key === v.ui.group) {

          if (mainJson.menu[i].menu === undefined) {
            mainJson.menu[i].menu = [];
          }
          mainJson.menu[i].menu.push({
            title: v.title,
            group: v.ui.group,
            key: k
          });
        }
      }

    });

    return mainJson;
  }


  /**
   * Directly map 'value' from 'menu' object
   *
   * @param schema - From backend
   */
  public menuJson(schema: Schema) {

    let menuJson: any = {};

    for (const [keys, v] of Object.entries(schema.properties)) {

      if (v.ui.element === 'menu' && v.ui.group === '') {
        menuJson = v.ui.value;
      }
    }
    menuJson.menu ? menuJson.enable = true : menuJson.enable = false;
    // get the defaultKey and set it in menuJson for highlight purpouse
    menuJson.childDefaultKey = this.childDefaultKey;
    return menuJson;
  }

  /**
   * UI Schema default structure
   */
  defaultUiSchema() {
    return {
      type: '',
      label: '',
      inputType: '',
      name: '',
      value: '',
      options: [],
      validation: [],
      desc: '',
      link: '',
      childOf: '',
      show: false
    };
  }

  /**
   * Get default key
   *
   * @param schema - Schema
   */
  public getDefaultKey(schema: Schema, groupMenu?: any) {
    if (groupMenu) {
      this.childDefaultKey = this.recursiveDefault(groupMenu);
      return this.childDefaultKey;
    } else {
      for (const [key, value] of Object.entries(schema.properties)) {
        if (value.ui.element === 'menu') {
          this.childDefaultKey = this.recursiveDefault(value.ui.value);
          return this.childDefaultKey;
        }
      }
    }

    return '';
  }


  /**
   * Recursive method to get default key
   *
   * @param value - Object
   */
  public recursiveDefault(value) {

    try {

      if (value.menu !== undefined && value.menu[value.default] !== undefined) {
        return this.recursiveDefault(value.menu[value.default]);
      }

    } catch (err) {
      console.log(err);
      return '';
    }

    return value.key !== undefined ? value.key : '';
  }

}
