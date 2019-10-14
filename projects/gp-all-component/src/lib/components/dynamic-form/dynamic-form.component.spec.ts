import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormComponent } from './dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '../button/button.module';
import { DynamicFieldModule } from '../../shared/dynamic-field/dynamic-field.module';
import { ControlErrorModule } from '../../shared/control-error/control-error.module';
import {
  FieldMetadata,
  IModifiedField,
} from '../../resources/data/data-table/meta-data/meta-data-field.model';
import {
  FormFieldCalendar,
  FormFieldCheckbox,
  FormFieldImg,
  FormFieldText,
  FormFieldTextNumber,
} from '../../shared/testing/@mock/types/form-field.mock';
import { TestingErrorCodeMock } from '../../shared/testing/@mock/utils/testing-mock-constants.class';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicFormComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        ButtonModule,
        ControlErrorModule,
        DynamicFieldModule,
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    component.metadata = new FieldMetadata().assign({
      fields: [
        FormFieldText.fieldMetadata,
        FormFieldImg.fieldMetadata,
        FormFieldTextNumber.fieldMetadata,
        FormFieldCheckbox.fieldMetadata,
        FormFieldCalendar.fieldMetadata,
      ],
      tableName: TestingErrorCodeMock.NO_ERROR,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', () => {
    expect(component).toBeTruthy();
    expect(component.form).toBeTruthy();
    expect(component.form.contains('name4')).toBeTruthy();
    expect(component.form.contains('name5')).toBeTruthy();
    expect(component.form.contains('name14')).toBeTruthy();
    expect(component.form.contains('name10')).toBeTruthy();
    expect(component.form.contains('name11')).toBeTruthy();
  });

  it('should listen on change event', () => {
    const value = 'Blahblah';
    const modified: IModifiedField = { field: FormFieldText, fieldName: 'name4', value };
    component.onChangeEvent(modified);
    fixture.detectChanges();
    expect(component.form.get('name4').value).toEqual(value);
  });

  it('should emit onCancel', () => {
    spyOn(component.onCancel, 'emit').and.callThrough();
    component.onCancelEvent({});
    expect(component.onCancel.emit).toHaveBeenCalled();
  });

  it('should emit onSubmit', () => {
    spyOn(component.onSubmit, 'emit').and.callThrough();
    component.onSubmitEvent({});
    expect(component.onSubmit.emit).toHaveBeenCalled();
  });

  it('should emit delete', () => {
    spyOn(component.onDelete, 'emit').and.callThrough();
    component.onDeleteEvent({});
    expect(component.onDelete.emit).toHaveBeenCalled();
  });

  describe('Scenario: with data', () => {
    beforeEach(() => {
      component.data = {
        name4: 'testing input value',
        name5: 'picture/path',
        name10: 'S',
        name14: 987,
        name11: '2019-02-10',
      };
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component.form.get('name4').value).toEqual('testing input value');
      expect(component.form.get('name5').value).toEqual('picture/path');
      expect(component.form.get('name10').value).toEqual(true);
      expect(component.form.get('name14').value).toEqual(987);
      expect(component.form.get('name11').value instanceof Date).toBeTruthy();
      expect(component.form.get('name11').value).toEqual(new Date('2019-02-10'));
    });
  });
});
