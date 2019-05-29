import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectTesterComponent } from './redirect-tester.component';

describe('RedirectTesterComponent', () => {
  let component: RedirectTesterComponent;
  let fixture: ComponentFixture<RedirectTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RedirectTesterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
