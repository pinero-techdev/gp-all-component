import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { TableModule } from 'primeng/table';
import { RowComponent } from './row/row.component';
import { MemoPipeModule } from '../../../../pipes/memo-pipe/memo.pipe.module';
import { IsNilPipeModule } from '../../../../pipes/is-nil-pipe/is-nil.pipe.module';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent, RowComponent],
      imports: [TableModule, MemoPipeModule, IsNilPipeModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
