import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../model/field.interface';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';
@Component({
    selector: 'ipc-htmleditor',
    template: `
    <div class="my-1 form-wrap" [formGroup]="group" [ngClass]="{fadeOut: !field.show}">
        <div class="label-wrapper">
            <label class="radio-label-padding">{{field.label}} </label>
        </div>
        <div class="input-wrapper">
            <ckeditor data={{field.value}} (change)="onChange($event)" name="inline-editor" type="inline"
            [formControlName]="field.name" [ngClass]="{noValue: !field.value}"></ckeditor>
        </div>
    </div>
  `,
    styles: []
})
export class HtmlEditorComponent implements OnInit {
    field: FieldConfig;
    group: FormGroup;
    constructor() { }
    ngOnInit() { }
    public onChange(event: CKEditor4.EventInfo) {
    }
}
