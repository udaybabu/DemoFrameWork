import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FieldConfig } from '../../model/field.interface';
@Component({
    selector: 'ipc-checkbox',
    template: `
    <div class="cmy-1 form-wrap" [formGroup]="group" [ngClass]="{fadeOut: !field.show}">
        <div class="label-wrapper">
            <label class="radio-label-padding">{{field.label}} </label>
            <div class="description">{{field.desc}}</div>
        </div>
        <div class="input-wrapper">
            <mat-checkbox [formControlName]="option.name" *ngFor="let option of field.value" (change)="onChange($event, option.label, option.name)">{{option.label}}</mat-checkbox>
        </div>
    </div>
    `,
    styles: []
})
export class CheckboxComponent implements OnInit {
    field: FieldConfig;
    group: FormGroup;
    fieldValue = [];
    constructor(
        private fb: FormBuilder
    ) { }
    ngOnInit() {
        this.field.value.filter((a) => {
            if (a.value) {
                this.fieldValue.push(a.label.toLowerCase());
            }
        });
        this.group.addControl(this.field.name, this.fb.control(this.fieldValue));
    }
    onChange(event: any, label: string, name: string) {
        if (event.checked) {
            if (!this.fieldValue.includes(label.toLowerCase())) {
                this.group.removeControl[name];
                this.fieldValue.push(label.toLowerCase());
            }
        } else {
            let removeItem;
            removeItem = this.fieldValue.indexOf(label.toLowerCase());
            if (removeItem !== -1) {
                this.fieldValue.splice(removeItem, 1);
            }
        }
        this.group.controls[this.field.name].setValue(this.fieldValue);
    }
}
