import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoLibModule } from 'demo-lib';
import { SchemaRenderModule } from 'projects/schema-render/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DemoLibModule,
    SchemaRenderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
