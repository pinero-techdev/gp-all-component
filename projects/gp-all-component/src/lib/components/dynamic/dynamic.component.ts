import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  Injector,
  ViewContainerRef,
  ViewChild,
  ComponentRef,
  Input,
  Type,
} from '@angular/core';
import 'rxjs/add/operator/first';

export class DynamicMetadata {
  component: Type<any>;
  inputs?: any;
  outputs?: any;
}
@Component({
  selector: 'gp-dynamic-component',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss'],
})
export class DynamicComponent implements OnInit {
  /** Component data which is dynamically loading */
  @Input() componentData: DynamicMetadata = null;
  /** HTML Element where the component is loading */
  @ViewChild('gpdynamic', { read: ViewContainerRef }) dynamicComponent: ViewContainerRef;
  /** Component's instance once is loaded */
  public currentComponent = null;

  constructor(private resolver: ComponentFactoryResolver, private injector: Injector) {
    /* Empty */
  }

  ngOnInit() {
    if (!this.componentData) {
      this.destroy();
      return;
    }
    this.loadComponent();
  }

  destroy(): void {
    if (this.currentComponent) {
      this.currentComponent.destroy();
    }
  }

  /**
   * Basically the component target is inserted in the HTML once set the inputs/outputs up.
   * If everything is ok, the `currentComponent` is going to have the recent component loaded.
   */
  private loadComponent() {
    const inputProviders = Object.keys(this.componentData.inputs).map((inputName) =>
      Object.create({ provide: inputName, useValue: this.componentData.inputs[inputName] })
    );

    const factory = this.resolver.resolveComponentFactory(this.componentData.component);
    const component: ComponentRef<any> = factory.create(this.injector);

    inputProviders.forEach((input) => (component.instance[input.provide] = input.useValue));

    if (this.componentData.outputs) {
      const outputProviders = Object.keys(this.componentData.outputs).map((outputName) =>
        Object.create({
          provide: outputName,
          useValue: this.componentData.outputs[outputName],
        })
      );
      outputProviders.forEach((output) =>
        component.instance[output.provide].first().subscribe((value) => output.useValue(value))
      );
    }

    this.dynamicComponent.insert(component.hostView);
    this.destroy();
    this.currentComponent = component.instance;
  }
}
