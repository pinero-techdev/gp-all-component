import { FooTesterComponent } from './../foo-tester/foo-tester.component';
import { AppModule } from '../app.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicTesterComponent } from './dynamic-tester.component';

describe('DynamicTesterComponent', () => {
  let component: DynamicTesterComponent;
  let fixture: ComponentFixture<DynamicTesterComponent>;
  let elementRef: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [AppModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    elementRef = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a foo instance', () => {
    /* Getting FooTesterComponent tag element*/
    const fooElement: HTMLElement = elementRef.querySelector('app-foo-tester');

    /* Getting FooTesterComponent instance */
    const fooInstance: FooTesterComponent =
      fixture.componentInstance.dynamic.currentComponent.instance;
    expect(fooElement).toBeTruthy();
    expect(fooInstance).toBeDefined();
    expect(fooInstance.foo).toBe('Adios');
    expect(fooInstance.bar).toEqual(['Hola', 'A']);
  });

  it('should have a foo instance given a custom componentData', () => {
    const fooElement: HTMLElement = elementRef.querySelector('app-foo-tester');
    const testData = {
      component: FooTesterComponent,
      inputs: { bar: null, foo: 'Test1' },
      outputs: {
        fooEmitter: (value: boolean) => {
          expect(value).toBe(true);
        },
      },
    };

    component.componentData = testData;
    fixture.detectChanges();

    /* Getting FooTesterComponent instance */
    const fooInstance: FooTesterComponent =
      fixture.componentInstance.dynamic.currentComponent.instance;
    expect(fooElement).toBeTruthy();
    expect(fooInstance).toBeDefined();
    expect(fooInstance.foo).toBe(testData.inputs.foo);
    expect(fooInstance.bar).toEqual(testData.inputs.bar);
    fooInstance.fooEmitter.emit(true);
  });
});
