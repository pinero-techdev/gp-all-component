import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DynamicComponent, DynamicMetadata } from './dynamic.component';
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';

@Component({
  selector: 'gp-test-hosted',
  template: 'templ',
})
class HostedComponent {
  content: string;
  @Output() testEmitter = new EventEmitter();
  @Input() bar: string[];
  @Input() foo: string[];

  destroy() {
    console.info('[Dynamic UT] Destroy called!');
  }
}

describe('DynamicComponent', () => {
  let fixture: ComponentFixture<DynamicComponent>;
  let component: DynamicComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostedComponent, DynamicComponent],
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [HostedComponent],
      },
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicComponent);
    component = fixture.componentInstance;
  });

  it('should create', async(() => {
    expect(fixture.componentInstance).toBeTruthy();
    expect(component).toBeTruthy();
  }));

  it('should instantiatе hosted component correctly', async () => {
    const data: DynamicMetadata = {
      component: HostedComponent,
      inputs: { bar: ['Hello', 'A'], foo: 'Bye' },
      outputs: {
        testEmitter: (value: boolean) => {
          console.info('[Dynamic UT] testEmitter', value);
        },
      },
    };
    component.componentData = data;
    component.ngOnInit();
    fixture.detectChanges();
    expect(fixture.componentInstance.dynamicComponent.length).toBe(1);
    expect(fixture.nativeElement.querySelector('gp-test-hosted')).toBeTruthy();
  });

  it('should instantiatе hosted component correctly - only inputs', async () => {
    const data: DynamicMetadata = {
      component: HostedComponent,
      inputs: { bar: ['Hello', 'A'], foo: 'Bye' },
    };
    component.componentData = data;
    component.ngOnInit();
    fixture.detectChanges();
    expect(fixture.componentInstance.dynamicComponent.length).toBe(1);
    expect(fixture.nativeElement.querySelector('gp-test-hosted')).toBeTruthy();
  });

  it('should instantiatе hosted component correctly - only outputs', async () => {
    const data: DynamicMetadata = {
      component: HostedComponent,
      outputs: {
        testEmitter: (value: boolean) => {
          console.info('[Dynamic UT] testEmitter', value);
        },
      },
    };
    component.componentData = data;
    component.ngOnInit();
    fixture.detectChanges();
    expect(fixture.componentInstance.dynamicComponent.length).toBe(1);
    expect(fixture.nativeElement.querySelector('gp-test-hosted')).toBeTruthy();
  });

  it('should destroy', () => {
    spyOn(component, 'destroy').and.callThrough();
    component.componentData = null;
    component.ngOnInit();
    expect(component.destroy).toHaveBeenCalled();
  });
});
