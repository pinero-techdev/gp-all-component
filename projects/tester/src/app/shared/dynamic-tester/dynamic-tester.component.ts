import { DynamicComponent } from '@lib/components/dynamic/dynamic.component';
import { FooTesterComponent } from '../../foo-tester/foo-tester.component';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dynamic-tester',
  templateUrl: './dynamic-tester.component.html',
  styleUrls: ['./dynamic-tester.component.scss'],
})
export class DynamicTesterComponent {
  @ViewChild(DynamicComponent) dynamic: DynamicComponent;

  public componentData = {
    component: FooTesterComponent,
    inputs: { bar: ['Hola', 'A'], foo: 'Adios' },
    outputs: {
      fooEmitter: (value: boolean) => {
        console.info('fooEmitter', value);
      },
    },
  };
}
