import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFileFieldComponent } from './form-file-field.component';
import { FormFieldValidatorDirective } from '../form-field-validator/form-field-validator.directive';
import { FileUploadModule } from 'primeng/primeng';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormFieldFile } from '../../../../shared/testing/@mock/types/form-field.mock';
import { GpFormField } from '../../resources/form-field.model';
import { Attachment } from '../../../table-wrapper/components/table-editable-crud/resources/attachment.class';

describe('FormFileFieldComponent', () => {
  let component: FormFileFieldComponent;
  let fixture: ComponentFixture<FormFileFieldComponent>;
  const value = [new Attachment().assign({ fileName: 'A' })];
  const editRow = { [FormFieldFile.fieldMetadata.fieldName]: value };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormFileFieldComponent, FormFieldValidatorDirective],
      imports: [FileUploadModule, HttpClientTestingModule],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFileFieldComponent);
    component = fixture.componentInstance;
    component.formField = new GpFormField().assign(FormFieldFile);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should copy value to editRow', () => {
    component.currentValue = value;
    component.copyValueFromControlToEditedRow(component.formField.formControl.editedRow);
    expect(component.formField.formControl.editedRow).toEqual(editRow);
  });

  it('should copy value from editRow', () => {
    component.currentValue = null;
    component.formField.formControl.editedRow = editRow;
    component.copyValueFromEditedRowToControl(editRow);
    expect(component.currentValue).toEqual(value);
  });

  it('should clear the files', () => {
    component.onClearEvent({});
    expect(component.currentValue.length).toEqual(0);
  });

  it('should clear the files', () => {
    const removeEvent = { ['file']: { name: 'A' } };
    component.currentValue = [
      new Attachment().assign({ fileName: 'A' }),
      new Attachment().assign({ fileName: 'B' }),
    ];
    component.onRemoveEvent(removeEvent);
    expect(component.currentValue.length).toEqual(1);
  });

  it('should create a file when change event', () => {
    const aFileParts = ['<a id="a"><b id="b">hey!</b></a>'];
    const blob = new Blob(aFileParts, { type: 'application/octet-binary' });
    const files = [new File([blob], 'A')];
    const event = { ['files']: files };
    component.onChangeEvent(event);
    expect(component.currentValue).toBeTruthy();
  });
});
