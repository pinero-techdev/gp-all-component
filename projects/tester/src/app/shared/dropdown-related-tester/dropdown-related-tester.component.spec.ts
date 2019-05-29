import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownRelatedTesterComponent } from './dropdown-related-tester.component';

describe('DropdownRelatedTesterComponent', () => {
  let component: DropdownRelatedTesterComponent;
  let fixture: ComponentFixture<DropdownRelatedTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownRelatedTesterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownRelatedTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
