import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownTesterComponent } from './dropdown-tester.component';

describe('DropdownTesterComponent', () => {
  let component: DropdownTesterComponent;
  let fixture: ComponentFixture<DropdownTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownTesterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
