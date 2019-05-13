import { GpAllComponentModule } from './../../../gp-all-component/src/lib/gp-all-component.module';
import { FooTesterComponent } from './foo-tester/foo-tester.component';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, FooTesterComponent],
      imports: [GpAllComponentModule, RouterTestingModule],
      providers: [],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
