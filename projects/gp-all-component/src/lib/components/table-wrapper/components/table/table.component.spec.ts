import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { TableModule } from 'primeng/table';
import { RowComponent } from './row/row.component';
import { MemoPipeModule } from '../../../../pipes/memo-pipe/memo.pipe.module';
import { IsNilPipeModule } from '../../../../pipes/is-nil-pipe/is-nil.pipe.module';
import { TableModel } from './models/table.model';
import {
  mockTableColumn,
  mockFilterEvent,
} from '../../../../shared/testing/@mock/types/table.type.mock';
import { ButtonModule } from '../../../button/button.module';
import { ButtonModule as PButtonModule } from 'primeng/button';
import { AddRowDirective } from './row/add-row/add-row.directive';
import { DynamicFieldModule } from '../../../../shared/dynamic-field/dynamic-field.module';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent, RowComponent, AddRowDirective],
      imports: [
        TableModule,
        MemoPipeModule,
        DynamicFieldModule,
        ButtonModule,
        PButtonModule,
        IsNilPipeModule,
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('model input change', () => {
    it('should trigger build model method', () => {
      const previousModel = component.coreModel;

      component.model = new TableModel();

      const newModel = component.coreModel;

      expect(previousModel).not.toEqual(newModel);
    });
  });

  describe('after content init angular lifecycle hook', () => {
    it('should trigger build model method', () => {
      const previousModel = component.coreModel;

      const newModel = component.coreModel;

      expect(previousModel).not.toEqual(newModel);
    });
  });

  it('should emit filter event and call table filter method', () => {
    const tableFilterSpy = spyOn(component.table, 'filter');
    const tableFilterEmitSpy = spyOn(component.filter, 'emit');

    component.onFilter(mockFilterEvent, mockTableColumn);

    expect(tableFilterSpy).toHaveBeenCalled();
    expect(tableFilterEmitSpy).toHaveBeenCalled();
  });
});
