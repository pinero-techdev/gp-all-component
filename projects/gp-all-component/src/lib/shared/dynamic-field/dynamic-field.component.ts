import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { GpFormField } from '../../components/form-wrapper/resources/form-field.model';
import { GpFormControl } from '../../components/form-wrapper/resources/form-control.model';
import {
  DisplayType,
  Field,
  FieldType,
  IModifiedField,
  IModifiedRelatedField,
} from '../../resources/data/data-table/meta-data/meta-data-field.model';

@Component({
  selector: 'gp-dynamic-field',
  templateUrl: './dynamic-field.component.html',
  styleUrls: ['./dynamic-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFieldComponent implements OnInit {
  displayType = DisplayType;
  fieldType = FieldType;
  formField: GpFormField;

  @Input() field: Field;
  @Input() data: any;
  @Input() relatedFields: IModifiedRelatedField;
  @Input() value: any;

  @Output() onChange = new EventEmitter();

  ngOnInit() {
    if (this.field) {
      const editedRow = this.data ? this.data : { [this.field.fieldName]: this.value };
      const originalRow = this.data ? this.data : { [this.field.fieldName]: this.value };
      // Create formField object to init the field
      this.formField = new GpFormField().assign(
        {
          formControl: new GpFormControl().assign({ editedRow, originalRow }, true),
          fieldMetadata: this.field,
        },

        true
      );
    }
  }

  isValid() {
    return this.formField && this.formField.validField ? this.formField.validField : false;
  }

  public onChangeEvent($event: IModifiedField) {
    this.formField.validField = $event.field.validField;
    this.onChange.emit($event);
  }
}
