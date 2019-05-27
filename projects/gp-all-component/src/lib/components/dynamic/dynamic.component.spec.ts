import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DynamicComponent, DynamicMetadata } from './dynamic.component';
import { Component } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';

@Component({
  selector: 'gp-test-hosted',
  template: 'templ',
})
class HostedComponent {
  content: string;
}

fdescribe('DynamicComponent', () => {
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

    TestBed.compileComponents();
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
    };
    component.componentData = data;
    component.ngOnInit();
    fixture.detectChanges();
    expect(fixture.componentInstance.dynamicComponent.length).toBe(1);
    expect(fixture.nativeElement.querySelector('gp-test-hosted')).toBeTruthy();
  });
});
