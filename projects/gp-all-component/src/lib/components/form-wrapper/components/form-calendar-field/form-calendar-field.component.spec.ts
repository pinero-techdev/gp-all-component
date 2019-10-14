import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TableServiceMock } from '../../../../services/api/table/table.service.mock';
import { TableService } from '../../../../services/api/table/table.service';
import { FormFieldCalendar } from '../../../../shared/testing/@mock/types/form-field.mock';
import { GpFormField } from '../../resources/form-field.model';
import { FormCalendarFieldComponent } from './form-calendar-field.component';
import { FormFieldValidatorDirective } from '../form-field-validator/form-field-validator.directive';
import { GPUtil } from '../../../../services/core/gp-util.service';

describe('FormCalendarFieldComponent', () => {
  let component: FormCalendarFieldComponent;
  let fixture: ComponentFixture<FormCalendarFieldComponent>;
  let tableService: TableService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormCalendarFieldComponent, FormFieldValidatorDirective],
      imports: [FormWrapperSharedModules, HttpClientTestingModule],
      providers: [
        FormWrapperSharedProviders,
        { provide: TableService, useClass: TableServiceMock },
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCalendarFieldComponent);
    component = fixture.componentInstance;
    tableService = TestBed.get(TableService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(tableService).toBeTruthy();
  });

  describe('Scenario: formField is NULL', () => {
    beforeEach(() => {
      component.formField = null;
      fixture.detectChanges();
    });

    it('should NOT call init', () => {
      expect(component.formField).toBeNull();
      expect(component.readonly).toBeFalsy();
      expect(component.required).toBeFalsy();
      expect(component.isDisabled).toBeFalsy();
      expect(component.currentValue).toBeUndefined();
    });
  });

  describe('Scenario: field is INVALID', () => {
    const value = new Date('false');
    const valueExpected = new Date();
    const editRowExpected = GPUtil.dateToYyyymmdd(valueExpected);
    const editRow = { [FormFieldCalendar.fieldMetadata.fieldName]: editRowExpected };

    beforeEach(() => {
      component.currentValue = value;
      component.formField = new GpFormField().assign(FormFieldCalendar);
      fixture.detectChanges();
    });

    it('should editRow equal to currentValue', () => {
      expect(component.formField.formControl.editedRow).toEqual(editRow);
      expect(component.currentValue).not.toEqual(value);
      expect(component.currentValue instanceof Date).toBeTruthy();
    });

    it('should be enabled', () => {
      expect(component.isDisabled).toBeFalsy();
    });

    it('should be mandatory', () => {
      expect(component.required).toEqual(FormFieldCalendar.fieldMetadata.notNull);
    });

    it('should be readonly', () => {
      expect(component.readonly).toEqual(FormFieldCalendar.fieldMetadata.readOnly);
    });

    it('should copy value to editRow', () => {
      component.copyValueFromControlToEditedRow(component.formField.formControl.editedRow);
      expect(component.formField.formControl.editedRow).toBeTruthy(valueExpected);
    });

    it('should copy value from editRow', () => {
      component.copyValueFromEditedRowToControl(editRow);
      expect(component.currentValue).toBeTruthy();
      expect(component.currentValue instanceof Date).toBeTruthy();
    });
  });

  describe('Scenario: field is VALID', () => {
    const value = new Date('1995-12-17');
    const valueExpected = value;
    const editRowExpected = GPUtil.dateToYyyymmdd(valueExpected);
    const editRow = { [FormFieldCalendar.fieldMetadata.fieldName]: editRowExpected };

    beforeEach(() => {
      component.currentValue = value;
      component.formField = new GpFormField().assign(FormFieldCalendar);
      fixture.detectChanges();
    });

    it('should editRow equal to currentValue', () => {
      expect(component.formField.formControl.editedRow).toEqual(editRow);
      expect(component.currentValue).toEqual(valueExpected);
      expect(component.currentValue instanceof Date).toBeTruthy();
    });

    it('should be enabled', () => {
      expect(component.isDisabled).toBeFalsy();
    });

    it('should be mandatory', () => {
      expect(component.required).toEqual(FormFieldCalendar.fieldMetadata.notNull);
    });

    it('should be readonly', () => {
      expect(component.readonly).toEqual(FormFieldCalendar.fieldMetadata.readOnly);
    });

    it('should copy value to editRow', () => {
      component.copyValueFromControlToEditedRow(component.formField.formControl.editedRow);
      expect(component.formField.formControl.editedRow).toBeTruthy(valueExpected);
    });

    it('should copy value from editRow', () => {
      component.copyValueFromEditedRowToControl(editRow);
      expect(component.currentValue).toBeTruthy();
      expect(component.currentValue instanceof Date).toBeTruthy();
    });
  });
});
