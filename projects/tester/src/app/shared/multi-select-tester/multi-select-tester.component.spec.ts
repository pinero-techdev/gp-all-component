import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectTesterComponent } from './multi-select-tester.component';

describe('MultiSelectTesterComponent', () => {
  let component: MultiSelectTesterComponent;
  let fixture: ComponentFixture<MultiSelectTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiSelectTesterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
