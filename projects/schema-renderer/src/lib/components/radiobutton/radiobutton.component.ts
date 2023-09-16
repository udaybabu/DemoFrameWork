import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from '../../model/field.interface';

@Component({
  selector: "ipc-radiobutton",
  template: `
  <div class="cmy-1 form-wrap" [formGroup]="group" [ngClass]="{fadeOut: !field.show}">
    <div class="label-wrapper">
      <label class="radio-label-padding">{{field.label}} </label>
      <div class="description">{{field.desc}}</div>
    </div>
    <div class="input-wrapper">
      <mat-radio-group [formControlName]="field.name">
        <mat-radio-button *ngFor="let item of field.options" [value]="item.value" (change)="toggleChildren.emit({name:field.name, value: item.value})" [ngClass]="item.label"></mat-radio-button>
      </mat-radio-group>
    </div>
  </div>
  `,
  styles: []
})
export class RadiobuttonComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  @Output() toggleChildren = new EventEmitter();
  constructor() { }
  ngOnInit() { }
}
