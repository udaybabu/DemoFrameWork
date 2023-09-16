import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SchemaService } from '../../schema.service';

@Component({
    selector: 'ipc-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.styl']
})
export class TopbarComponent implements OnInit {
    menu: any;
    type: any;
    active: string;
    childActive: string;
    @Output() emitFormByKey = new EventEmitter();
    constructor(
        private schemaService: SchemaService
    ) { }

    ngOnInit() {
        this.active = this.menu.default;
        this.childActive = this.menu.childDefaultKey;
    }

    ngDoCheck() {
        if (this.schemaService.changeDefaultKey) {
            this.active = this.menu.default;
            this.childActive = this.menu.childDefaultKey;
        }
    }

    loadSubmenu(menu: any) {
        this.childActive = menu.default;
        this.active = menu.key;
        this.emitFormByKey.emit(menu);
    }
    loadSubMenuData(submenu: any) {
        this.childActive = submenu.key;
        this.emitFormByKey.emit(submenu);
    }

}
