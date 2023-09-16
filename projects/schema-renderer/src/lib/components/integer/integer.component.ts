import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../model/field.interface';
@Component({
  selector: 'ipc-integer',
  template: `
<mat-form-field class="cmy-1 form-wrap" [formGroup]="group" [ngClass]="{fadeOut: !field.show}">
  <div class="label-wrapper">
    <label class="radio-label-padding">{{field.label}} </label>
  </div>
  <div class="input-wrapper">
    <input matInput [formControlName]="field.name" [type]="field.type" step="1" [ngClass]="{noValue: !field.value}">
    <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
    <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
    </ng-container>
  </div>
</mat-form-field>
`,
  styles: []
})
export class IntegerComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() { }
  ngOnInit() { }
}
