import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GpFormField } from '../../resources/form-field.model';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { DataTableMetaDataField } from '../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { TableService } from '../../../../services/api/table/table.service';
import { FileUpload } from 'primeng/primeng';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'gp-form-b64-file-field',
  templateUrl: './form-b64-file-field.component.html',
  styleUrls: ['./form-b64-file-field.component.scss'],
})
export class FormB64FileFieldComponent extends GpFormFieldControl implements OnInit {
  @Input() formField: GpFormField;

  @ViewChild(FileUpload, {static : false}) upload: FileUpload;

  regExImage = /image\/.*/;
  isImageFile = false;

  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  getFieldMetadata(): DataTableMetaDataField {
    return this.formField && this.formField.fieldMetadata ? this.formField.fieldMetadata : null;
  }

  public getFormField(): GpFormField {
    return this.formField ? this.formField : null;
  }

  ngOnInit() {
    this.init();
    this.isDisabled = this.controlDisabled();
  }

  onSelect(event) {
    const reader = new FileReader();
    const self = this;
    reader.readAsDataURL(event.files[0]);
    reader.onloadend = () => {
      self.currentValue = reader.result;
    };
  }

  // FIXME: VPRATS 24/04/2020
  /*download( file: File ) {
    console.log('download-file: ', file);
    console.log('currentValue:', this.currentValue);
    // window.location.href = this.currentValue;
    navigator.msSaveBlob(file, file.name);
  }*/

  remove() {
    this.upload.files = [];
    this.currentValue = null;
  }

  /* Init method to setup  */
  init() {
    this.setRestrictions();
  }

  /* Depending of the restrictions, the current value is formatted */
  copyValueFromControlToEditedRow(editedRow: any) {
    const hasTextProperties =
      this.formField.fieldMetadata.displayInfo &&
      this.formField.fieldMetadata.displayInfo.textProperties;

    let newValue = this.currentValue;

    if (hasTextProperties) {
      const setUppercase =
        this.formField.fieldMetadata.displayInfo.textProperties.indexOf(
          TableService.TEXT_UPPERCASE
        ) !== -1;

      const setTrimText =
        this.formField.fieldMetadata.displayInfo.textProperties.indexOf(TableService.TEXT_TRIM) !==
        -1;

      if (setUppercase) {
        newValue = newValue === null ? null : newValue.toUpperCase();
        this.currentValue = newValue;
      }

      if (setTrimText) {
        newValue = newValue === null ? null : newValue.trim();
        this.currentValue = newValue;
      }
    }

    if (editedRow) {
      editedRow[this.formField.fieldMetadata.fieldName] = newValue;
    }
  }

  /* After change in a table crud, the current value needs to be updated */
  copyValueFromEditedRowToControl(editedRow: any) {
    if (this.formField && this.formField.fieldMetadata) {
      this.currentValue = editedRow[this.formField.fieldMetadata.fieldName];
      if (this.currentValue) {
        const file = this.b64toFile(this.currentValue);
        if (file) {
          this.upload.files = [file];
        }
      } else {
        this.upload.files = [];
      }
    }
  }

  /* Check the validations when the current value is changed */
  validateField(editedRow: any) {
    return this.validateTextField(editedRow);
  }

  b64toFile(dataURI): File {
    const base64Prefix = dataURI.split(',')[0];
    const byteString = atob(dataURI.split(',')[1]);
    // get mime type from dataUri (from Base64 prefix)
    const init = base64Prefix.indexOf(':');
    const initType = base64Prefix.indexOf('/');
    const final = base64Prefix.indexOf(';');

    if (init < 0 || final < 0) {
      return null;
    }
    const mimeType = base64Prefix.slice(init + 1, final);
    const fileType = base64Prefix.slice(initType + 1, final);

    const byteArray = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }
    this.isImageFile = this.regExImage.test(mimeType);

    const fileName = `fichero_guardado.${fileType}`;

    return new File([byteArray], fileName, { type: mimeType });
  }

  getImgSrc(base64: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(base64);
  }
}
