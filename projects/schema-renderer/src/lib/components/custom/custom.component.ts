import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from '../../model/field.interface';
@Component({
    selector: "ipc-custom",
    template: `
    <h3 class="group-title">
    {{field.label}}
    </h3>
    `,
    styles: []
})
export class CustomComponent implements OnInit {
    field: FieldConfig;
    group: FormGroup;
    constructor() { }
    ngOnInit() { }
}
