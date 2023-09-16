import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from '../../model/field.interface';

@Component({
    selector: "ipc-anchor",
    template: `
    <div class="cmy-2 form-wrap" [formGroup]="group" [ngClass]="{fadeOut: !field.show}">
        <div class="label-wrapper">
            <label class="radio-label-padding">{{field.label}} </label>
            <div class="description">{{field.desc}}</div>
        </div>
        <div class="input-wrapper">
            <a class="mat-icon-wrap" (click)="externalTarget(field)" *ngFor="let link of field.link">
            <span class="label">{{link.text}}</span>
            <mat-icon aria-hidden="false" aria-label="navigate icon">chevron_right</mat-icon>
            </a>
        </div>
    </div>
    `,
    styles: []
})
export class LinkComponent implements OnInit {
    field: FieldConfig;
    group: FormGroup;
    @Output() externalLinkTarget = new EventEmitter();

    constructor() { }
    ngOnInit() { }
    externalTarget(fieldData: any) {
        this.externalLinkTarget.emit(fieldData);
    }
}
