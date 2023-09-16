import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../model/field.interface';
@Component({
  selector: 'ipc-duration',
  template: `
  <mat-form-field class="cmy-1 form-wrap" [formGroup]="group" [ngClass]="{fadeOut: !field.show}">
      <div class="label-wrapper">
          <label class="radio-label-padding">{{field.label}} </label>
          <div class="description">{{field.desc}}</div>
      </div>
      <div class="input-wrapper">
        <input matInput [formControlName]="field.name" [type]="field.inputType"
        (keypress)="onKeyPress($event)" [ngClass]="{noValue: !field.value}">
        <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
        <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
        </ng-container>
      </div>
</mat-form-field>
`,
  styles: []
})
export class DurationComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  values: any;
  constructor() { }
  ngOnInit() { }
  onKeyPress(event: any) {
    this.values = event.target.value;
    if (/^\s*(?:(?:[1-9]\d*|0)d\s+)?(?:(?:1?\d|2[0-3])h\s+)?(?:[1-5]?\dm\s+)?(?:[1-5]?\ds)?\s*$/.test(this.values)) {
      console.log('correct');
    } else {
      console.log('false');
    }
  }
}
