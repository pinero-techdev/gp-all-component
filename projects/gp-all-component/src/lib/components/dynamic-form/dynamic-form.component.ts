import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  DisplayType,
  Field,
  FieldMetadata,
  FieldRestriction,
  FieldType,
  IModifiedField,
  RestrictionType,
  TextPropertyType,
} from '../../resources/data/data-table/meta-data/meta-data-field.model';
import { FormBuilder, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { OnChange } from 'property-watch-decorator';
import { FormValidations } from './resources/form-validations.class';
import { LocaleES } from '../../resources/localization';

@Component({
  selector: 'gp-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent {
  // tslint:disable-next-line
  private _metadata: FieldMetadata;
  private watchedRelated: string[];

  form = this.formBuilder.group({});
  errors: any = {};
  locale = LocaleES;
  relatedFields: any;
  readonly displayType = DisplayType;

  @Input() set metadata(value: FieldMetadata) {
    this.buildForm(value);
  }

  get metadata(): FieldMetadata {
    return this._metadata;
  }

  @Input() @OnChange<any>('buildData') data: any;

  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Output() onChange = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private cd: ChangeDetectorRef) {
    //
  }

  /** The form is created when the metadata is set */
  private buildForm(value: FieldMetadata) {
    if (value) {
      if (!this.form) {
        this.form = this.formBuilder.group({});
      }
      this._metadata = new FieldMetadata().assign(value, true);
      this._metadata.fields.map((item) => this.setControl(item));
      this.watchedRelated = this.metadata.getRelatedFieldNames();
      this.cd.detectChanges();
    }
  }

  /**
   * Set the control into form
   * @param item
   */
  private setControl(item: any) {
    const field = new Field().assign(item, true);
    if (field.isVisible()) {
      const name = field.fieldName;
      const value = this.getFieldValue(field);
      if (this.form.contains(name)) {
        this.form.get(name).setValue(value);
      } else {
        const validators = this.addValidators(field);
        const control = new FormControl(value, validators);
        this.form.addControl(name, control);
      }

      this.errors[name] = [];
    }

    return field;
  }

  private setControlValueByName(name: string, value: any) {
    if (this.form && this.form.contains(name)) {
      this.form.get(name).setValue(value);
      this.cd.markForCheck();
    }
  }

  private getFieldByName(name: string): Field {
    return this.metadata.fields.find((f) => f.fieldName === name);
  }

  /**
   * Get field value into data
   * @param fieldName
   */
  private getFieldValue(field: Field) {
    const fieldName = field.fieldName;
    let value = this.data && this.data.hasOwnProperty(fieldName) ? this.data[fieldName] : null;
    if (value) {
      switch (field.fieldType) {
        case FieldType.BOOLEAN:
          value = value === field.displayInfo.checkedValue ? true : false;
          break;
        case FieldType.NUMBER:
          value = Number(value);
          break;
        case FieldType.DATE:
          value = new Date(value);
          break;
        default:
      }
    }
    return value;
  }

  /**
   * A field was changed
   * @param $event {name: string, value: any}
   */
  onChangeEvent($event: IModifiedField) {
    const name = $event.fieldName;
    const value = $event.value;
    const control = this.form.get(name);
    if (control) {
      control.patchValue(value);

      if (this.watchedRelated.indexOf(name) > -1) {
        this.setRelatedFields(this.form.getRawValue());
      }
      this.form.markAsDirty();
    }
    this.onChange.emit($event);
  }

  /**
   * When the form is ready to submit
   * @param $event
   */
  onSubmitEvent($event: any = null) {
    this.onSubmit.emit(this.form.getRawValue());
  }

  onCancelEvent($event: any) {
    this.onCancel.emit($event);
  }

  onDeleteEvent($event: any) {
    this.onDelete.emit($event);
  }

  /***** Validations */
  private addValidators(item: Field): ValidatorFn {
    const validatorsArray: any[] = [];

    if (item.notNull) {
      validatorsArray.push(Validators.required);
    }

    if (item.fieldMaxLength > -1 && item.displayInfo.displayType !== DisplayType.CHECKBOX) {
      validatorsArray.push(FormValidations.ValidateLength(null, item.fieldMaxLength));
    }

    if (!item.allowAscii && item.fieldType !== FieldType.ATTACHMENT) {
      if (
        item.displayInfo.textProperties &&
        item.displayInfo.textProperties.indexOf(TextPropertyType.NO_SPACE) > -1
      ) {
        validatorsArray.push(FormValidations.ValidateBlankSpace());
      }
      validatorsArray.push(FormValidations.ValidateControlSpace());
      validatorsArray.push(FormValidations.ValidateSpecialChar());
    }

    return Validators.compose(this.setRestrictions(item, validatorsArray));
  }

  private setRestrictions(field: Field, validatorsArray: ValidatorFn[]): ValidatorFn[] {
    if (
      field.displayInfo.displayType !== DisplayType.NULLABLE_CHECKBOX &&
      field.displayInfo.displayType !== DisplayType.CHECKBOX
    ) {
      field.restrictions.forEach((restriction: FieldRestriction) => {
        switch (restriction.restrictionType) {
          case RestrictionType.MAX_LENGTH:
            validatorsArray.push(Validators.maxLength(restriction.maxLength));
            break;
          case RestrictionType.MIN_LENGTH:
            validatorsArray.push(Validators.minLength(restriction.minLength));
            break;
          default:
        }
      });
    }
    return validatorsArray;
  }

  private buildData() {
    if (this.data) {
      for (const key in this.data) {
        if (this.data.hasOwnProperty(key)) {
          const field = this.getFieldByName(key);
          const value = field ? this.getFieldValue(field) : this.data[key];
          this.setControlValueByName(key, value);
        }
      }
      this.setRelatedFields(this.data);
    }
  }

  /*** Related Fields */
  private setRelatedFields(data: any) {
    if (this.metadata instanceof FieldMetadata) {
      this.relatedFields = this.metadata.getRelatedFields(data);
    }
  }
}
