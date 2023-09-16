import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { FieldConfig, Settings } from './model/field.interface';
import { Schema } from './model/schema.model';
import { Observable, of } from 'rxjs';
import { SchemaService } from './schema.service';
import { SchemaValidator } from './schema.validator';

@Component({
  exportAs: 'ipcSchemaRenderer',
  selector: 'ipc-schema-renderer',
  templateUrl: './schema-renderer.component.html',
  styleUrls: ['./styles.styl']
})
export class SchemaRendererComponent implements OnInit {
  @Input() schema: Schema;
  @Input() defaultSettings: Settings;

  formSubmitted: boolean;

  @Input()
  set isFormSubmitted(submited: boolean) {
    this.formSubmitted = submited;
  }

  title: string;
  updatedSettings: Settings;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  @Output() triggerExternalLink = new EventEmitter();
  @Output() isFormChangesEmit = new EventEmitter();

  form: FormGroup;
  fields: FieldConfig[];
  menus: any;
  defaultKey: string;

  get value() {
    return this.form.value;
  }

  get isFormSubmitted(): boolean {
    return this.formSubmitted;
  };

  constructor(
    private fb: FormBuilder,
    private schemaService: SchemaService,
    private schemaValidator: SchemaValidator
  ) { }

  ngOnInit() {
    this.updatedSettings = Object.assign({}, this.defaultSettings);
    // schema validation by 'ui.types'
    this.validateFormFields(this.schema).subscribe((res) => {
      if (res) {
        this.selectDefaultKey();
        // get the menu json from schema
        this.menus = this.schemaService.menuJson(this.schema);
        this.title = this.menus.default;
      } else {
        alert('schema validation failed');
      }
    });
  }

  selectDefaultKey() {
    // get default group key
    this.defaultKey = this.schemaService.getDefaultKey(this.schema);

    // to pass parsed fields
    this.generateFormByGroupKey(this.defaultKey);
  }

  onClickForm() {
    for (const [key] of Object.entries(this.updatedSettings)) {
      if (this.form.get(key)) {
        this.form.get(key).valueChanges.subscribe((selectedValue) => {
          this.formSubmitted = true;
          if (selectedValue._isAMomentObject && selectedValue._isAMomentObject !== null) {
            this.updatedSettings[key] = selectedValue.toISOString();
          } else {
            this.updatedSettings[key] = selectedValue;
          }
          this.isFormChangesEmit.emit(this.formSubmitted);
        });
      }
    }
  }

  generateFormByGroupKey(groupKey: string) {
    const toggle = { name: '', value: '' };
    let newKey = this.updatedSettings;
    for (const [key, val] of Object.entries(this.schema.properties)) {
      if (val.ui.default === undefined && val.type === 'array') {
        val.ui.default = [];
      } else if (val.ui.default === undefined && val.type === 'number') {
        val.ui.default = 0;
      } else if (val.ui.default === undefined && val.type === 'string') {
        val.ui.default = '';
      } else if (val.ui.default === undefined && val.type === 'boolean') {
        val.ui.default = false;
      } else if (val.ui.default === undefined && val.type === 'integer') {
        val.ui.default = 0;
      }
      newKey[key] = val.ui.default;
    }
    newKey = { ...newKey, ...this.defaultSettings };
    this.updatedSettings = newKey;
    // merge data with schema
    this.schema = this.schemaService.mergerSchemaWithData(this.schema, this.updatedSettings);
    this.schemaService.parse(this.schema, groupKey).subscribe((fields: FieldConfig[]) => {
      this.fields = fields;
    });
    this.fields.map((field) => {
      if (field.name.indexOf('Toggle') !== -1) {
        toggle.name = field.name;
        toggle.value = field.value;
        this.loadToggleChildren(toggle);
      }
    });
    this.form = this.createControl(this.fields);
  }

  loadExternalLinkTarget(event: any) {
    event.title = this.title;
    this.triggerExternalLink.emit(event);
  }

  loadToggleChildren(event: any) {
    this.fields.map((field) => {
      if (field.childOf === event.name) {
        field.show = event.value === 'on' ? true : false;
      }
    });
  }

  emitFormByKey(menu: any) {
    if (menu.key === (menu.title).toLowerCase()) {
      this.title = menu.title;
    } else {
      this.title = menu.group;
    }
    this.defaultKey = this.schemaService.getDefaultKey(this.schema, menu);
    this.generateFormByGroupKey(this.defaultKey);
    this.schemaService.changeDefaultKey = false;
  }

  createControl(fields: FieldConfig[]) {
    const group = this.fb.group({});
    fields.forEach(field => {
      if (field.type === 'button') { return; }
      if (field.type === 'checkbox') {
        field.value.forEach(array => {
          const control = this.fb.control(
            array.value,
            this.bindValidations(field.validations || [])
          );
          group.addControl(array.name, control);
        });
      } else if (field.type !== 'custom' && field.type !== 'multipleInput') {
        const control = this.fb.control(
          field.value,
          this.bindValidations(field.validations || [])
        );
        group.addControl(field.name, control);
      }
    });
    return group;
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid && this.formSubmitted) {
      this.formSubmitted = false;
      this.formSubmit.emit(this.updatedSettings);
      this.defaultSettings = Object.assign({}, this.updatedSettings);
      this.selectDefaultKey();
      this.schemaService.changeDefaultKey = true;
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  resetForm(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.formSubmitted = false;
    this.updatedSettings = Object.assign({}, this.defaultSettings);
    this.selectDefaultKey();
    this.schemaService.changeDefaultKey = true;
  }

  validateFormFields(schema: Schema): Observable<boolean> {
    let isValid = true;

    for (const [key, value] of Object.entries(schema.properties)) {
      this.schemaValidator.validate(value).subscribe((res) => {
        isValid = isValid && res;
      });
    }

    return of(isValid);
  }
}

