import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCrudTesterComponent } from './table-crud-tester.component';

describe('TableCrudTesterComponent', () => {
  let component: TableCrudTesterComponent;
  let fixture: ComponentFixture<TableCrudTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableCrudTesterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCrudTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
