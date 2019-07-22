import { GpFormFieldType } from './../../../../../form-wrapper/resources/form-field-type.enum';
import { AttachmentOperationEnum } from './../../resources/attachment-operation.enum';
import { switchMap } from 'rxjs/operators';
import { Attachment } from './../../resources/attachment.class';
import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomInput } from './../../resources/custom-input.class';
import { Filter } from './../../../../../../resources/data/filter/filter.model';
import { FilterOperationType } from './../../../../../../resources/data/filter/filter-operation-type.enum';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { TableColumnMetadata } from './../../resources/table-column-metadata.model';
import { TableFieldEvent } from '../../resources/table-events.interface';
import { TableMetadataService } from './../../../../../../services/api/table/table-metadata.service';
import { TableService } from './../../../../../../services/api/table/table.service';

@Component({
  selector: 'gp-table-editable-cell',
  styleUrls: ['./table-editable-cell.component.scss'],
  templateUrl: './table-editable-cell.component.html',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: TableEditableCellComponent, multi: true }],
})
export class TableEditableCellComponent extends CustomInput implements AfterViewInit {
  readonly inputType = GpFormFieldType;
  form: FormGroup;
  editable: boolean;
  optionsList = [];
  imgModalVisible = false;
  textareaModalVisible = false;
  wysiwygModalVisible = false;
  fileModalVisible = false;
  calendarLocale = {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ],
    monthNamesShort: [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic',
    ],
  };
  dateFormat = 'yy-mm-dd';
  translationKeys = '';
  temporalValue = '';
  temporalFile = new Attachment();
  subject = new Subject();

  @Input() columnMetadata = new TableColumnMetadata();
  @Input() item: any; // item es el objeto row, con todos los campos
  @Input() isFilter: boolean;
  @Output() startEditing = new EventEmitter<TableFieldEvent>();
  @Output() stopEditing = new EventEmitter<TableFieldEvent>();
  @Output() downloadFile = new EventEmitter<TableFieldEvent>();

  constructor(
    private tableService: TableService,
    private messageService: MessageService,
    private metadataService: TableMetadataService,
    private fb: FormBuilder
  ) {
    super();
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      avatar: null,
    });
  }

  ngAfterViewInit() {
    this.form.get('name').setValue(this.columnMetadata.name);
    this.value =
      this.item && this.item[this.columnMetadata.name] ? this.item[this.columnMetadata.name] : '';

    if (
      this.columnMetadata.type === GpFormFieldType.DROPDOWN ||
      this.columnMetadata.type === GpFormFieldType.DROPDOWN_RELATED
    ) {
      this.getOptions();
    }

    if (
      !this.isFilter &&
      (this.columnMetadata.type === GpFormFieldType.CHECKBOX ||
        this.columnMetadata.type === GpFormFieldType.SWITCH)
    ) {
      if (
        !this.value &&
        this.columnMetadata.uncheckedValue !== null &&
        this.columnMetadata.uncheckedValue !== undefined
      ) {
        this.startStop(this.columnMetadata.uncheckedValue);
      }
    }

    if (
      this.item &&
      this.columnMetadata.translationInfo &&
      this.columnMetadata.translationInfo.keyFields
    ) {
      this.translationKeys = '';
      for (const keyField of this.columnMetadata.translationInfo.keyFields) {
        this.translationKeys += this.item[keyField];
      }
    }
  }

  onModelChange(value: any) {
    if (this.columnMetadata.beforeChangeFn) {
      this.value = this.columnMetadata.beforeChangeFn(this.item, value, this.columnMetadata);
    } else {
      this.value = value;
    }
    if (this.item) {
      if (!this.item.hasOwnProperty(this.columnMetadata.name)) {
        this.item = Object.assign(this.columnMetadata.name, this.item);
      }
      this.item[this.columnMetadata.name] = this.value;
      this.item[this.columnMetadata.name] = this.value;
    }

    this.stopEditing.emit({ value: this.value, column: this.columnMetadata });
  }

  isCheckboxChecked(): boolean {
    if (
      this.columnMetadata.checkedValue !== null &&
      this.columnMetadata.checkedValue !== undefined
    ) {
      return this.columnMetadata.checkedValue === this.value;
    } else {
      return this.value;
    }
  }

  onCheckboxChange(value: any) {
    if (value) {
      this.startStop(this.columnMetadata.checkedValue || value);
    } else {
      this.startStop(this.columnMetadata.uncheckedValue || value);
    }
  }

  startStop(value: any) {
    this.onStartEditing();
    this.onModelChange(value);
  }

  setTimeValue(date: Date) {
    const value = date.toLocaleTimeString().substr(0, 5);
    this.startStop(value);
  }

  isEditable() {
    if (this.columnMetadata.validateFn) {
      return this.columnMetadata.editableFn(this.value, this.item, this.columnMetadata);
    } else {
      return this.metadataService.isEditable(this.value, this.item, this.columnMetadata);
    }
  }

  onStartEditing() {
    this.startEditing.emit({ value: this.value, column: this.columnMetadata });
  }

  openImgModal() {
    if (this.value) {
      this.temporalValue = this.value.slice();
    } else {
      this.temporalValue = '';
    }
    this.imgModalVisible = true;
  }

  openTextareaModal() {
    if (this.value) {
      this.temporalValue = this.value.slice();
    } else {
      this.temporalValue = '';
    }
    this.textareaModalVisible = true;
  }

  openWYSIWYGModal() {
    if (this.value) {
      this.temporalValue = this.value.slice();
    } else {
      this.temporalValue = '';
    }
    this.wysiwygModalVisible = true;
  }

  openFileModal() {
    if (this.value) {
      this.temporalFile = Object.assign(new Attachment(), this.value);
    } else {
      this.temporalFile = new Attachment();
    }
    this.fileModalVisible = true;
  }

  getOptions() {
    if (this.columnMetadata.referencedTable) {
      this.getRelatedOptions();
    } else {
      if (this.columnMetadata.setOptionsFn) {
        this.setCustomOptions(this.columnMetadata.options || []);
      } else {
        this.setOptions(this.columnMetadata.options || []);
      }
    }
  }

  getRelatedOptions() {
    if (this.subject.observers.length === 0) {
      this.subject
        .pipe(
          switchMap(() => {
            const filters: Filter[] = [];
            if (this.columnMetadata && this.columnMetadata.relatedFields) {
              for (const related of this.columnMetadata.relatedFields) {
                // Validation disabled to prevent get All elements when related
                // fields are not selected
                // if (this.item[related.field] !== null &&
                // this.item[related.field] !== undefined) {
                filters.push(
                  new Filter(
                    FilterOperationType.EQUAL,
                    related.fieldExternal ? related.fieldExternal : related.field,
                    [this.isFilter ? related.value : this.item[related.field]]
                  )
                );
                // }
              }
            }
            return this.tableService.list(
              this.columnMetadata.referencedTable,
              this.columnMetadata.retrieveMetadata,
              false,
              this.columnMetadata.fieldToOrderBy || null,
              filters
            );
          })
        )
        .subscribe(
          (data) => {
            if (data.ok) {
              if (this.columnMetadata.setOptionsFn) {
                this.setCustomOptions(data.data);
              } else {
                // caso no tenemos una setOptionsFn
                this.setOptions(data.data);
              }
            } else {
              if (this.columnMetadata.setOptionsFn) {
                this.setCustomOptions([]);
              } else {
                this.optionsList = [{ label: 'Error recuperando datos.', value: null }];
                this.messageService.add({
                  severity: 'error',
                  summary: 'error',
                  detail: 'Error interno cargando el registro.',
                });
              }
            }
          },
          (err) => {
            if (this.columnMetadata.setOptionsFn) {
              this.setCustomOptions([]);
            } else {
              this.optionsList = [{ label: 'Error recuperando datos.', value: null }];
              this.messageService.add({
                severity: 'error',
                summary: 'error',
                detail: 'Error interno cargando el registro.',
              });
            }
          }
        );
    }
    this.subject.next();
    return this.optionsList;
  }

  setCustomOptions(customData: any[]) {
    // caso setOptionsFn es Observable
    const opts = this.columnMetadata.setOptionsFn(customData, this.item, this.columnMetadata);
    if (opts instanceof Observable) {
      opts.subscribe(
        (data) => {
          this.setOptions(data);
        },
        (e) => {
          this.optionsList = [{ label: 'Error recuperando datos.', value: null }];
        }
      );
    } else {
      // caso setOptionsFn es any[]
      this.setOptions(opts);
    }
  }

  readFile(event: any) {
    const reader = new FileReader();
    const [file] = event.target.files || event.srcElement.files;
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = (reader.result as string).split(',');
      if (base64 && base64.length > 1) {
        this.temporalFile.operation = AttachmentOperationEnum.MODIFY;
        this.temporalFile.fieldName = this.columnMetadata.name;
        this.temporalFile.fileName = file.name;
        this.temporalFile.mimeType = file.type;
        this.temporalFile.content = base64[1];
      }
    };
  }

  setOptions(options: any[]) {
    const optionsFormatted = [
      {
        label: 'Seleccione ' + this.columnMetadata.name.toLowerCase() + ' ...',
        value: null,
      },
    ];
    for (const row of options) {
      let optionLabel = '';
      let separator = '';
      // row._label = "";
      for (const fieldDesc of this.columnMetadata.optionsLabels) {
        optionLabel += separator + row[fieldDesc];
        separator = ' - ';
      }
      optionsFormatted.push({
        label: optionLabel,
        value: row[this.columnMetadata.optionsValue],
      });
    }
    this.optionsList = optionsFormatted;
  }

  hasFile(): boolean {
    return (
      (this.item[`${this.columnMetadata.name}Empty`] === false && !this.value) ||
      (this.value && this.value.operation === AttachmentOperationEnum.MODIFY)
    );
  }

  deleteFile() {
    if (!this.value) {
      const deleteAttachment = new Attachment();
      deleteAttachment.fieldName = this.columnMetadata.name;
      deleteAttachment.operation = AttachmentOperationEnum.DELETE;
      this.startStop(deleteAttachment);
    } else {
      this.value = null;
      this.item[`${this.columnMetadata.name}Empty`] = true;
      this.startStop(this.value);
    }
  }
}
