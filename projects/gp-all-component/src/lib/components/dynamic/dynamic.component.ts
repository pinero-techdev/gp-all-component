import {
    Component,
    ComponentFactoryResolver,
    Injector,
    ViewContainerRef,
    ViewChild,
    Input,
} from '@angular/core';
import 'rxjs/add/operator/first';

class DynamicMetadata {
    component: any;
    inputs?: any;
    outputs?: any;
}
@Component({
    selector: 'gp-dynamic-component',
    templateUrl: './dynamic.component.html',
    styleUrls: ['./dynamic.component.scss'],
})
export class DynamicComponent {
    @ViewChild('gpdynamic', { read: ViewContainerRef }) dynamicComponent: ViewContainerRef;

    public currentComponent = null;

    @Input() set componentData(data: DynamicMetadata) {
        if (!data) {
            if (this.currentComponent) {
                this.currentComponent.destroy();
            }
            return;
        }
        
        this.loadComponent(data);
    }

    constructor(private resolver: ComponentFactoryResolver, private injector: Injector) {}

    private loadComponent(data: DynamicMetadata){
        const inputProviders = Object.keys(data.inputs).map((inputName) =>
            Object.create({ provide: inputName, useValue: data.inputs[inputName] })
        );

        const factory = this.resolver.resolveComponentFactory(data.component);
        const component = factory.create(this.injector);

        inputProviders.forEach((input) => (component.instance[input.provide] = input.useValue));

        if (data.outputs) {
            const outputProviders = Object.keys(data.outputs).map(outputName =>
                Object.create({ provide: outputName, useValue: data.outputs[outputName] })
            );
            outputProviders.forEach(output =>
                component.instance[output.provide]
                    .first()
                    .subscribe(value => output.useValue(value))
            );
        }

        this.dynamicComponent.insert(component.hostView);

        if (this.currentComponent) {
            this.currentComponent.destroy();
        }
        this.currentComponent = component;
    }
}
