import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowComponent } from './row.component';
import { TableModule } from 'primeng/table';
import { TableBuilder } from '../table.builder';
import { MemoPipeModule } from '../../../../../pipes/memo-pipe/memo.pipe.module';
import { DynamicFieldModule } from '../../../../../shared/dynamic-field/dynamic-field.module';
import { ButtonModule } from '../../../../button/button.module';
import { IModifiedField } from '../../../../../resources/data/data-table/meta-data/meta-data-field.model';
import { GpFormField } from '../../../../form-wrapper/resources/form-field.model';

describe('RowComponent', () => {
  let component: RowComponent;
  let fixture: ComponentFixture<RowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RowComponent],
      imports: [TableModule, MemoPipeModule, DynamicFieldModule, ButtonModule],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowComponent);
    component = fixture.componentInstance;
    component.builder = new TableBuilder();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should editing to true', () => {
    spyOn(component.editing, 'emit').and.callThrough();
    component.startEdition();
    expect(component.editing.emit).toHaveBeenCalled();
    expect(component.isEditing).toBeTruthy();
  });

  it('should save', () => {
    spyOn(component.save, 'emit').and.callThrough();
    component.persistEdition();
    expect(component.save.emit).toHaveBeenCalled();
  });

  it('should cancel', () => {
    spyOn(component.onCancelEdition, 'emit').and.callThrough();
    component.cancelEdition();
    expect(component.onCancelEdition.emit).toHaveBeenCalled();
    expect(component.isEditing).toBeFalsy();
  });

  it('should delete', () => {
    spyOn(component.delete, 'emit').and.callThrough();
    component.deleteRow();
    expect(component.delete.emit).toHaveBeenCalled();
  });

  it('should add a new row', () => {
    spyOn(component, 'startEdition').and.callThrough();
    component.row = { value: null };
    fixture.detectChanges();
    expect(component.startEdition).toHaveBeenCalled();
    expect(component.isEditing).toBeTruthy();
    expect(component.disableSave).toBeTruthy();
  });

  it('should get a value from dynamic field', () => {
    const field = new GpFormField();
    const modified: IModifiedField = { fieldName: 'field1', value: 'value 1', field };
    component.row = { field1: null };
    component.onDynamicFieldChange(modified);
    fixture.detectChanges();
    expect(component.disableSave).toBeFalsy();
  });
});
