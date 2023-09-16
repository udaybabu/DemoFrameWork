import { Injectable } from '@angular/core';
import { Schema } from '../model/schema.model';

@Injectable({
    providedIn: 'root'
})
export class SchemaMerger {

    public mergerSchemaWithData(schema: Schema, data) {

        Object.keys(schema.properties).forEach((item) => {

            if (data[item] !== undefined && schema.properties[item].ui.element !== 'menu') {
                schema.properties[item].ui.default = data[item];
            }
        });

        return schema;
    }
}