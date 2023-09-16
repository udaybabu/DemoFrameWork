import { NgModule } from '@angular/core';
import { SchemaRendererComponent } from './schema-renderer.component';
import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { CKEditorModule } from 'ckeditor4-angular';



import { MaterialModule } from './material.module';
import { DynamicFieldDirective } from './directives/dynamic-field.directive';
import { DynamicMenuDirective } from './directives/dynamic-menu.directive';
import { ipcDynamicComponents } from './components/component-exporter';

@NgModule({
  declarations: [
    ipcDynamicComponents,
    DynamicFieldDirective,
    DynamicMenuDirective,
    SchemaRendererComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
   // CKEditorModule
  ],
  entryComponents: [
    ipcDynamicComponents
  ],
  providers: [
  ],
  exports: [
    ipcDynamicComponents,
    DynamicMenuDirective,
    DynamicFieldDirective
  ]
})
export class SchemaRendererModule { }
