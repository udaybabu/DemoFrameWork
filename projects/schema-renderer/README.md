# schema-renderer

> 




## Install
Add package path inside your `package.json` file run command `npm install`
```bash
npm i -S schema-renderer
```

## Usage
Make sure that your `app.module.ts` contains `BrowserAnimationsModule` and `CommonModule` in the import section.

```js
@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```
And add component selector, pass the sample json as an input

```html
<ipc-schema-renderer [schema]="schema" (formSubmit)="submit($event)">

</ipc-schema-renderer>
```

## Sample schema

```json
{
  "title": "A registration form",
  "description": "A simple form example.",
  "type": "object",
  "required": [
    "name",
    "gender"
  ],
  "properties": {
    "name": {
      "type": "string",
      "title": "First Name",
      "pattern": "regex",
      "minLength": 10,
      "default": "Sans",
      "ui": {
        "element": "input",
        "type": "text",
        "value": "",
        "group": "activationInvitation",
        "title": "Enter your Name"
      }
    },
    "select": {
      "type": "string",
      "title": "Country",
      "default": "India",
      "ui": {
        "element": "select",
        "type": "select",
        "value": "India",
        "group": "reminderMessage",
        "title": "Select the country",
        "options": ["India", "UAE", "UK", "US"]
      }
    },
    "checkbox": {
      "type": "string",
      "title": "Terms",
      "default": "",
      "ui": {
        "element": "input",
        "type": "checkbox",
        "value": true,
        "group": "reminderMessage",
        "title": "Terms"
      }
    },
    "textarea": {
      "type": "string",
      "title": "Message",
      "default": "",
      "ui": {
        "element": "textarea",
        "type": "textarea",
        "value": "Enter Message",
        "group": "reminderMessage",
        "title": "Message"
      }
    },
    "htmlEditor": {
      "type": "string",
      "title": "Message",
      "default": "",
      "ui": {
        "element": "richTextarea",
        "type": "htmlEditor",
        "value": "Enter Message",
        "group": "reminderMessage",
        "title": "Message"
      }
    },
    "multipleInput": {
      "type": "string",
      "title": "Categories",
      "default": "Onboarding Courses",
      "ui": {
        "element": "multipleInput",
        "type": "multipleInput",
        "value": "Enter Message",
        "group": "reminderMessage",
        "title": "Categories"
      }
    },
    "integer": {
      "type": "string",
      "title": "Integer number",
      "default": "45",
      "ui": {
        "element": "integer",
        "type": "integer",
        "value": "Enter number",
        "group": "reminderMessage",
        "title": "Integer number"
      }
    },
    "number": {
      "type": "string",
      "title": "Enter number",
      "default": "45",
      "ui": {
        "element": "number",
        "type": "number",
        "value": "Enter number",
        "group": "reminderMessage",
        "title": "Enter number"
      }
    },
    "multiSelect": {
      "type": "string",
      "title": "Select with multiple selection",
      "default": "Mushroom",
      "ui": {
        "element": "select",
        "type": "multiSelect",
        "value": "Enter number",
        "group": "reminderMessage",
        "title": "Select with multiple selection"
      }
    },
    "duration": {
      "type": "string",
      "title": "Enter Duration",
      "default": "45",
      "ui": {
        "element": "input",
        "type": "duration",
        "value": "Enter duration",
        "group": "reminderMessage",
        "title": "Enter duration"
      }
    },
    "button": {
      "type": "button",
      "title": "Update",
      "default": "Update",
      "ui": {
        "element": "button",
        "type": "button",
        "value": "",
        "group": "activationInvitation",
        "title": "Submit"
      }
    },
    "activation": {
      "type": "string",
      "title": "Activation",
      "default": "activationInvitation",
      "ui": {
        "element": "menu",
        "type": "side-bar",
        "value": ["Assignments", "User registration"],
        "group": "",
        "options": ["Assignments", "User registration"]
      }
    },
    "assignment": {
      "type": "string",
      "title": "Assignment",
      "default": "",
      "ui": {
        "element": "menu",
        "type": "side-bar",
        "value": ["Assignments", "User registration"],
        "group": "",
        "options": ["Assignments", "User registration"]
      }
    },
    "activationInvitation": {
      "type": "string",
      "title": "Activation Invitation",
      "default": "",
      "ui": {
        "element": "menu",
        "type": "side-bar",
        "group": "activation"
      }
    },
    "reminderMessage": {
      "type": "string",
      "title": "Reminder Message",
      "default": "",
      "ui": {
        "element": "menu",
        "type": "side-bar",
        "group": "activation"
      }
    },
    "subAssignment": {
      "type": "string",
      "title": "Sub Assignment",
      "default": "",
      "ui": {
        "element": "menu",
        "type": "side-bar",
        "group": "assignment"
      }
    }
  }
}

```

### To Lazy load module 

route to 

```js
    loadChildren: () => import('./lazy/lazy.module').then(mod => mod.LazyModule),
```
and in the lazy loaded module 
```js
import { SchemaRendererModule } from 'schema-renderer';
```
```js
@NgModule({
  declarations: [
    LazyComponent
  ],
  imports: [
    LazyRoutingModule,
    CommonModule,
    SchemaRendererModule
  ]
})
export class LazyModule { }

```
TODO
- Groupping form fields
## License

[MIT](http://vjpr.mit-license.org)