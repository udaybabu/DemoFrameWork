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
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { TopbarComponent } from '../components/topbar/topbar.component';

const componentMapper = {
    sideBar: SidebarComponent,
    topBar: TopbarComponent
};
@Directive({
    selector: '[ipcDynamicMenu]'
})
export class DynamicMenuDirective implements OnInit {
    @Input() menu: any;
    @Input() type: string;
    @Output() loadFormByKey = new EventEmitter();
    componentRef: any;
    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef
    ) { }
    ngOnInit() {
        const factory = this.resolver.resolveComponentFactory(
            componentMapper[this.type]
        );
        this.componentRef = this.container.createComponent(factory);
        this.componentRef.instance.menu = this.menu;
        this.componentRef.instance.type = this.type;
        this.componentRef.instance.emitFormByKey.subscribe(data => {
            this.loadFormByKey.emit(data);
        });
    }
}
