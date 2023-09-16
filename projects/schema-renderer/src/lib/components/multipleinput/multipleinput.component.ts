import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FieldConfig } from '../../model/field.interface';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
@Component({
  selector: 'ipc-multipleinput',
  template: `
<mat-form-field class="chip-list cmy-1 form-wrap" [formGroup]="group" [ngClass]="{fadeOut: !field.show}">
<div class="label-wrapper">
    <label class="radio-label-padding">{{field.label}} </label>
  </div>
  <div class="input-wrapper">
  <mat-chip-list #chipList aria-label="Add Options" >
    <mat-chip *ngFor="let item of field.value" [selectable]="selectable"
             [removable]="removable" (removed)="remove(item)" [ngClass]="{noValue: !field.value}">
            {{item}}
      <mat-icon matChipRemove *ngIf="removable">cancel</mat-icon>
    </mat-chip>
    <input [matChipInputFor]="chipList"
           [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
           [matChipInputAddOnBlur]="addOnBlur"
           (matChipInputTokenEnd)="add($event)"
           [formControlName]="field.name"
           #dataInput
           >
  </mat-chip-list>
  <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
  <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
  </ng-container>
</div>
</mat-form-field>
    `,
})
export class MultipleInputComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('dataInput', { static: true }) dataInput: ElementRef;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private fb: FormBuilder

  ) { }
  ngOnInit() {
    this.group.addControl(this.field.name, this.fb.control(''));
    setTimeout(() => {
      this.dataInput.nativeElement.value = '';
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.field.value.push(value);
    }
    if (input) {
      input.value = '';
    }
    this.group.controls[this.field.name].setValue(this.field.value);
    this.dataInput.nativeElement.value = '';

  }
  remove(item): void {
    const index = this.field.value.indexOf(item);
    if (index >= 0) {
      this.field.value.splice(index, 1);
    }
    this.group.controls[this.field.name].setValue(this.field.value);
    this.dataInput.nativeElement.value = '';
  }
}
