import { Component, Input } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { Attachment } from '../../../table-wrapper/components/table-editable-crud/resources/attachment.class';
import { AttachmentOperationEnum } from '../../../table-wrapper/components/table-editable-crud/resources/attachment-operation.enum';
import { LocaleES } from '../../../../resources/localization';
import { GPUtil } from '../../../../services/core/gp-util.service';

@Component({
  selector: 'gp-form-file-field',
  templateUrl: './form-file-field.component.html',
  styleUrls: ['./form-file-field.component.scss'],
})
export class FormFileFieldComponent extends GpFormFieldControl {
  @Input() multiple = false;
  @Input() disabled = false;
  @Input() label = LocaleES.SELECT_A_FILE;

  /**
   * Current form field value
   */
  @Input() set currentValue(v: Attachment[]) {
    this._currentValue = GPUtil.isNullOrUndefined(v)
      ? []
      : v.map((f) => new Attachment().assign(f));
    this.copyValueFromControlToEditedRow(this.formField.formControl.editedRow);
  }

  get currentValue() {
    return this._currentValue;
  }

  /**
   * At the moment, file uploader with metadata doesn't require to upload anything by itself.
   * Only send an change event when it's modified by the user.
   * @param $event
   */
  onChangeEvent($event) {
    this.currentValue = [];
    for (const file of $event.files) {
      this.createTempFile(file).then((item) => this.currentValue.push(item));
    }
    this.onFieldChange();
  }

  /**
   * Clear completely the input file
   */
  onClearEvent($event) {
    this.currentValue = [];
    this.onFieldChange();
  }

  /**
   * When the user remove a file
   * @param $event
   */
  onRemoveEvent($event) {
    this.currentValue = this.currentValue.filter((item) => $event.file.name !== item.fileName);
    this.onFieldChange();
  }

  private async createTempFile(file: any): Promise<Attachment> {
    const temporalFile = new Attachment();
    temporalFile.operation = AttachmentOperationEnum.MODIFY;
    temporalFile.fieldName = this.formField.fieldMetadata.fieldName;
    temporalFile.fileName = file.name;
    temporalFile.mimeType = file.type;
    temporalFile.content = await this.readFile(file);
    return temporalFile;
  }

  private readFile(file: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64 = (reader.result as string).split(',');
          if (base64 && base64.length > 0) {
            resolve(base64[1]);
          }
          reject();
        };
      } else {
        reject();
      }

      reader.onerror = () => reject();
    });
  }
}
