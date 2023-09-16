import { Component, OnInit, Output, EventEmitter, DoCheck } from '@angular/core';
import { SchemaService } from '../../schema.service';

@Component({
  selector: 'ipc-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.styl']
})
export class SidebarComponent implements OnInit, DoCheck {
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
  public keepOrder = (a, b) => a.key;
}
