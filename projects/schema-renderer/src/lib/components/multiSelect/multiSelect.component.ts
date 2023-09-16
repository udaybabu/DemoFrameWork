import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../model/field.interface';
@Component({
  selector: 'ipc-multiselect',
  template: `
<mat-form-field [formGroup]="group" class="cmy-1 form-wrap" [ngClass]="{fadeOut: !field.show}">
  <div class="label-wrapper">
    <label class="radio-label-padding">{{field.label}} </label>
  </div>
  <div class="input-wrapper">
    <mat-select [formControlName]="field.name" multiple [ngClass]="{noValue: !field.options}">
      <mat-option *ngFor="let item of field.options" [value]="item.value">{{item.label}}</mat-option>
    </mat-select>
  </div>
</mat-form-field>
`,
  styles: []
})
export class MultiSelectComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() { }
  ngOnInit() { }
}
