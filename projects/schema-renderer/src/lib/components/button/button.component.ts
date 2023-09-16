import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../model/field.interface';
@Component({
    selector: 'ipc-button',
    template: `
    <div class="cmy-2" [formGroup]="group">
    <button type="submit" mat-raised-button color="primary">{{field.label}}</button>
    </div>
    `,
    styles: []
})
export class ButtonComponent implements OnInit {
    field: FieldConfig;
    group: FormGroup;
    constructor() { }
    ngOnInit() { }
}
