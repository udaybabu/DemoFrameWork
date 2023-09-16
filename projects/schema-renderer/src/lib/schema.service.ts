import { Injectable } from '@angular/core';
import { Schema } from './model/schema.model';
import { Observable } from 'rxjs';
import { FieldConfig } from './model/field.interface';
import { SchemaParser } from './service/schema-parser.service';
import { SchemaMerger } from './service/schema-merger';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  changeDefaultKey: boolean;
  constructor(
    private schemaParser: SchemaParser,
    private schemaMerger: SchemaMerger
  ) { }

  parse(schema: Schema, groupKey: string) {
    return this.schemaParser.parse(schema, groupKey);
  }

  menuParser(schema) {
    return this.schemaParser.menuParser(schema);
  }

  menuJson(schema) {
    return this.schemaParser.menuJson(schema);
  }

  mergerSchemaWithData(schema, data) {
    return this.schemaMerger.mergerSchemaWithData(schema, data);
  }

  getDefaultKey(schema, menu?) {
    return this.schemaParser.getDefaultKey(schema, menu);
  }
}
