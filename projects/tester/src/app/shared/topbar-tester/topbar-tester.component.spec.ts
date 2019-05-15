import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarTesterComponent } from './topbar-tester.component';

describe('TopbarTesterComponent', () => {
  let component: TopbarTesterComponent;
  let fixture: ComponentFixture<TopbarTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopbarTesterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
