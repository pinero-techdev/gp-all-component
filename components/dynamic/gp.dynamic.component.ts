import {
    Component,
    ViewContainerRef,
    ViewChild,
    ReflectiveInjector,
    ComponentFactoryResolver,
    Input
} from "@angular/core";

@Component({
    selector: 'gp-dynamic-component',
    templateUrl: './gp.dynamic.component.html'
})
export class GPDynamicComponent {
    currentComponent = null;
    @ViewChild('gpdynamic', {read: ViewContainerRef}) dynamicComponent:ViewContainerRef;

    constructor(private resolver:ComponentFactoryResolver) {
    }

    @Input() set componentData(data:{component:any, inputs:any, outputs:any }) {
        if (!data) {
            if (this.currentComponent) {
                this.currentComponent.destroy();
            }
            return;
        }
        let inputProviders = Object.keys(data.inputs).map((inputName) => {
            return {provide: inputName, useValue: data.inputs[inputName]};
        });
        let resolvedInputs = ReflectiveInjector.resolve(inputProviders);
        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponent.parentInjector);
        let factory = this.resolver.resolveComponentFactory(data.component);
        let component = factory.create(injector);
        inputProviders.forEach(input => {
            component.instance[input.provide] = input.useValue;
        });
        if (data.outputs) {
            let outputProviders = Object.keys(data.outputs).map((outputName) => {
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
