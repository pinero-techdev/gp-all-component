import { FormFieldMock } from '../../../shared/testing/@mock/types/form-wrapper.type.mock';
import { GpFormField } from './form-field.model';
import { GpFormFieldControl } from './form-field-control.class';

// tslint:disable:variable-name

class FormFieldControlMock extends GpFormFieldControl {
  private _formField: GpFormField;

  get formField(): GpFormField {
    return this._formField;
  }

  set formField(value: GpFormField) {
    this._formField = value;
  }

  getFormField() {
    return this.formField;
  }

  copyValueFromControlToEditedRow(editedRow: any) {
    return true;
  }

  copyValueFromEditedRowToControl(editedRow: any) {
    return true;
  }

  validateField(editedRow: any) {
    return true;
  }
}

describe('FormFieldControl', () => {
  let returnedValue;
  const message = 'testing messages';
  const formControl = new FormFieldControlMock();

  it('should create', () => {
    expect(formControl).toBeTruthy();
    expect(formControl).not.toBeUndefined();
    expect(formControl).not.toBeNull();
  });

  describe('When formField is filled', () => {
    beforeEach(() => {
      formControl.formField = FormFieldMock;
    });

    describe('Then controlDisabled is called', () => {
      describe('and attributes are null', () => {
        beforeEach(() => {
          returnedValue = formControl.controlDisabled();
        });

        it('should return false', () => {
          expect(returnedValue).toBeFalsy();
          expect(returnedValue).not.toBeNull();
          expect(returnedValue).not.toBeUndefined();
        });
      });

      describe('and attributes are null', () => {
        beforeEach(() => {
          returnedValue = formControl.controlDisabled();
        });
        it('should return true', () => {
          expect(returnedValue).toBeFalsy();
          expect(returnedValue).not.toBeNull();
          expect(returnedValue).not.toBeUndefined();
        });
      });
    });

    describe('Then clearValidations is called', () => {
      beforeEach(() => {
        formControl.clearValidations();
      });

      it('should clear formField attributes', () => {
        expect(formControl.formField).toBeDefined();
        expect(formControl.formField.fieldMsgs).toBeNull();
        expect(formControl.formField.validField).toBeTruthy();
      });
    });

    describe('Then validateFieldAddMsgs is called', () => {
      beforeEach(() => {
        formControl.validateFieldAddMsgs(message);
      });

      it('should add a new message', () => {
        expect(formControl.formField).toBeDefined();
        expect(formControl.formField.validField).toBeFalsy();
        expect(formControl.formField.fieldMsgs.length).toBeGreaterThan(0);
        expect(formControl.formField.fieldMsgs[0].detail).toEqual(message);
      });
    });

    describe('Then validateField is called', () => {
      beforeEach(() => {
        formControl.validateField(message);
      });

      it('should keep the formField as before', () => {
        expect(formControl.formField).toBeDefined();
      });
    });

    describe('Then copyValueFromEditedRowToControl is called', () => {
      beforeEach(() => {
        formControl.copyValueFromEditedRowToControl(message);
      });

      it('should keep the formField as before', () => {
        expect(formControl.formField).toBeDefined();
      });
    });

    describe('Then copyValueFromControlToEditedRow is called', () => {
      beforeEach(() => {
        formControl.copyValueFromControlToEditedRow(message);
      });

      it('should keep the formField as before', () => {
        expect(formControl.formField).toBeDefined();
      });
    });

    describe('Then getFormField is called', () => {
      beforeEach(() => {
        returnedValue = formControl.getFormField();
      });

      it('should keep the getFormField as before', () => {
        expect(returnedValue).toBeDefined();
      });
    });

    describe('Then fieldChange is called', () => {
      beforeEach(() => {
        spyOn(formControl, 'copyValueFromControlToEditedRow').and.callThrough();
        returnedValue = formControl.onFieldChange();
      });

      it('should keep the getFormField as before', () => {
        expect(formControl.copyValueFromControlToEditedRow).toHaveBeenCalled();
      });
    });
  });

  describe('When formField is empty', () => {
    beforeEach(() => {
      formControl.formField = undefined;
    });

    describe('Then controlDisabled is called', () => {
      beforeEach(() => {
        returnedValue = formControl.controlDisabled();
      });

      it('should return false', () => {
        expect(returnedValue).toBeFalsy();
        expect(returnedValue).not.toBeNull();
        expect(returnedValue).not.toBeUndefined();
      });
    });

    describe('Then clearValidations is called', () => {
      beforeEach(() => {
        formControl.clearValidations();
      });

      it('should keep the formField as before', () => {
        expect(formControl.formField).toBeUndefined();
      });
    });

    describe('Then validateFieldAddMsgs is called', () => {
      beforeEach(() => {
        formControl.validateFieldAddMsgs(message);
      });

      it('should keep the formField as before', () => {
        expect(formControl.formField).toBeUndefined();
      });
    });

    describe('Then validateField is called', () => {
      beforeEach(() => {
        formControl.validateField(message);
      });

      it('should keep the formField as before', () => {
        expect(formControl.formField).toBeUndefined();
      });
    });

    describe('Then copyValueFromEditedRowToControl is called', () => {
      beforeEach(() => {
        formControl.copyValueFromEditedRowToControl(message);
      });

      it('should keep the formField as before', () => {
        expect(formControl.formField).toBeUndefined();
      });
    });

    describe('Then copyValueFromControlToEditedRow is called', () => {
      beforeEach(() => {
        formControl.copyValueFromControlToEditedRow(message);
      });

      it('should keep the formField as before', () => {
        expect(formControl.formField).toBeUndefined();
      });
    });

    describe('Then getFormField is called', () => {
      beforeEach(() => {
        returnedValue = formControl.getFormField();
      });

      it('should keep the getFormField as before', () => {
        expect(returnedValue).toBeUndefined();
      });
    });

    describe('Then fieldChange is called', () => {
      beforeEach(() => {
        spyOn(formControl, 'copyValueFromControlToEditedRow').and.callThrough();
        returnedValue = formControl.onFieldChange();
      });

      it('should keep the getFormField as before', () => {
        expect(returnedValue).toBeUndefined();
        expect(formControl.copyValueFromControlToEditedRow).not.toHaveBeenCalled();
      });
    });
  });
});
