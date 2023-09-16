import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../model/field.interface';
import { InputComponent } from '../components/input/input.component';
import { ButtonComponent } from '../components/button/button.component';
import { SelectComponent } from '../components/select/select.component';
import { DateComponent } from '../components/date/date.component';
import { RadiobuttonComponent } from '../components/radiobutton/radiobutton.component';
import { CheckboxComponent } from '../components/checkbox/checkbox.component';
import { CustomComponent } from '../components/custom/custom.component';
import { LinkComponent } from '../components/link/link.component';
import { TextareaComponent } from '../components/textarea/textarea.components';
import { MultipleInputComponent } from '../components/multipleinput/multipleinput.component';
import { HtmlEditorComponent } from '../components/htmlEditor/htmlEditor.component';
import { IntegerComponent } from '../components/integer/integer.component';
import { NumberComponent } from '../components/number/number.component';
import { MultiSelectComponent } from '../components/multiSelect/multiSelect.component';
import { DurationComponent } from '../components/duration/duration.component';

const componentMapper = {
  input: InputComponent,
  select: SelectComponent,
  date: DateComponent,
  radiobutton: RadiobuttonComponent,
  checkbox: CheckboxComponent,
  button: ButtonComponent,
  custom: CustomComponent,
  link: LinkComponent,
  textarea: TextareaComponent,
  multipleInput: MultipleInputComponent,
  htmlEditor: HtmlEditorComponent,
  integer: IntegerComponent,
  number: NumberComponent,
  multiSelect: MultiSelectComponent,
  duration: DurationComponent,
};
@Directive({
  selector: '[ipcDynamicField]'
})
export class DynamicFieldDirective implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  @Output() loadExternalLinkTarget = new EventEmitter();
  @Output() loadToggleChildren = new EventEmitter();
  componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }
  ngOnInit() {
    if (this.field && this.field.type) {
      const factory = this.resolver.resolveComponentFactory(
        componentMapper[this.field.type]
      );
      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.field = this.field;
      this.componentRef.instance.group = this.group;
      if (this.componentRef.instance.externalLinkTarget) {
        this.componentRef.instance.externalLinkTarget.subscribe(data => {
          this.loadExternalLinkTarget.emit(data);
        });
      }
      if (this.componentRef.instance.toggleChildren) {
        this.componentRef.instance.toggleChildren.subscribe(data => {
          this.loadToggleChildren.emit(data);
        });
      }
    }
  }
}
