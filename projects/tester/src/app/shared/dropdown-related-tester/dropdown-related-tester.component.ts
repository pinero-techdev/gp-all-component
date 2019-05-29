import { DataTableMetaDataFieldDisplayInfoRelatedField } from '@lib/resources/data/data-table/meta-data/data-table-meta-data-field-display-info-related-field.model';
import { FormFieldMock } from '@lib/shared/testing/@mock/types/form-wrapper.type.mock';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown-related-tester',
  templateUrl: './dropdown-related-tester.component.html',
})
export class DropdownRelatedTesterComponent {
  // copy object without reference
  formField = JSON.parse(JSON.stringify(FormFieldMock));
  formField2 = JSON.parse(JSON.stringify(FormFieldMock));
  fieldsChanged: any = null;

  constructor() {
    const relatedFieldName = 'test-dropdown';
    const relatedFieldType = 'gp-form-dropdown-field';
    const fieldName = 'test-dropdown-related';
    const relatedField = {
      field: relatedFieldName,
      fieldExternal: relatedFieldType,
      fieldDescription: 'none',
      value: null,
    } as DataTableMetaDataFieldDisplayInfoRelatedField;

    this.formField.fieldMetadata.fieldName = fieldName;
    this.formField.fieldMetadata.formFieldType = 'gp-form-dropdown-related-field';
    this.formField.fieldMetadata.displayInfo.relatedFields = [relatedField];
    this.formField2.fieldMetadata.fieldName = relatedFieldName;
    this.formField2.fieldMetadata.formFieldType = relatedFieldType;
  }

  onChangeEvent(data) {
    this.fieldsChanged = {};
    this.fieldsChanged[data.field] = data.value;
  }
}
