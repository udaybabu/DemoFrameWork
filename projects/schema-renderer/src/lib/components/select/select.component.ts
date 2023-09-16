import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../model/field.interface';
@Component({
    selector: 'ipc-select',
    template: `
    <div class="cmy-1 form-wrap" [ngClass]="{fadeOut: !field.show}">
        <div class="label-wrapper">
            <label class="radio-label-padding">{{field.label}} </label>
            <div class="description">{{field.desc}}</div>
        </div>
        <div class="input-wrapper">
            <mat-form-field  [formGroup]="group">
                <mat-select [ngClass]="{noValue: !field.value}" 
                [formControlName]="field.name" disableOptionCentering panelClass="custom-select-option">
                    <mat-option *ngFor="let item of field.options" [value]="item.value">{{item.label}}</mat-option>
                </mat-select>
            </mat-form-field>
        </div>
    </div>
    `,
    styles: []
})
export class SelectComponent implements OnInit {
    field: FieldConfig;
    group: FormGroup;
    constructor() { }
    ngOnInit() { }
}
