import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../model/field.interface';
@Component({
    selector: 'ipc-date',
    template: `
    <mat-form-field class="cmy-1 form-wrap" [formGroup]="group" [ngClass]="{fadeOut: !field.show}">
        <div class="label-wrapper">
          <label class="radio-label-padding">{{field.label}} </label>
        </div>
        <div class="input-wrapper">
            <input matInput class="date-field" [matDatepicker]="picker" #input 
            (focus)="picker.open()" [ngClass]="{noValue: !field.value}" [formControlName]="field.name">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker (opened)="input.click()"></mat-datepicker>
            <mat-hint></mat-hint>
            <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
            <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
            </ng-container>
        </div>
    </mat-form-field>
    `,
    styles: []
})
export class DateComponent implements OnInit {
    field: FieldConfig;
    group: FormGroup;
    constructor() { }
    ngOnInit() { }
}
