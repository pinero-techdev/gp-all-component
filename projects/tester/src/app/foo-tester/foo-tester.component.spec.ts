import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooTesterComponent } from './foo-tester.component';

describe('FooTesterComponent', () => {
  let component: FooTesterComponent;
  let fixture: ComponentFixture<FooTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooTesterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
