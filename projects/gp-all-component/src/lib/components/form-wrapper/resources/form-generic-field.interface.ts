import { GpFormField } from './form-field.model';
import { DataTableMetaDataField } from '../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';

export interface FormGenericField {
  /**
   * Returns current form field
   */
  getFormField(): GpFormField;

  /**
   * Returns current field metadata
   */
  getFieldMetadata(): DataTableMetaDataField;

  /**
   * Copies values from editing row to control
   * @param editedRow The editing row
   */
  copyValueFromEditedRowToControl(editedRow: any): void;

  /**
   * Copies value from control to editing row
   * @param editedRow The editing row
   */
  copyValueFromControlToEditedRow(editedRow: any): void;

  /**
   * Starts validation for editing row
   * @param editedRow The editing row
   */
  validateField(editedRow: any): boolean;
}
