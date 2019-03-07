import {
    Component,
    ComponentFactoryResolver,
    Input,
    ReflectiveInjector,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

@Component({
    selector: 'gp-dynamic-component',
    templateUrl: './gp-dynamic.component.html',
    styleUrls: ['./gp-dynamic.component.scss']
})
export class GpDynamicComponent {
    currentComponent = null;
    @ViewChild('gpdynamic', {read: ViewContainerRef}) dynamicComponent: ViewContainerRef;

    constructor(private resolver: ComponentFactoryResolver) {
    }

    @Input() set componentData(data: { component: any, inputs: any, outputs: any }) {
        if (!data) {
            if (this.currentComponent) {
                this.currentComponent.destroy();
            }
            return;
        }
        const inputProviders = Object.keys(data.inputs).map((inputName) => {
            return {provide: inputName, useValue: data.inputs[inputName]};
        });
        const resolvedInputs = ReflectiveInjector.resolve(inputProviders);
        const injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponent.parentInjector);
        const factory = this.resolver.resolveComponentFactory(data.component);
        const component = factory.create(injector);
        inputProviders.forEach(input => {
            component.instance[input.provide] = input.useValue;
        });
        if (data.outputs) {
            const outputProviders = Object.keys(data.outputs).map((outputName) => {
                return {provide: outputName, useValue: data.outputs[outputName]};
            });
            outputProviders.forEach(output => {
                component.instance[output.provide].subscribe(value => {
                    output.useValue(value);
                });
            });
        }
        this.dynamicComponent.insert(component.hostView);

        if (this.currentComponent) {
            this.currentComponent.destroy();
        }
        this.currentComponent = component;
    }
}
