import { SharedModule } from './../../../../../../shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableEditableCellComponent } from './table-editable-cell.component';
import { MultiLanguageModule } from '../../../../../multi-language/multi-language.module';
import { TableWrapperSharedProviders } from '../../../../../../shared/imports/table-wrapper-shared';
import { TableServiceMock } from '../../../../../../services/api/table/table.service.mock';
import { TableService } from '../../../../../../services/api/table/table.service';
import { TableColumnMetadata } from '../../resources/table-column-metadata.model';
import { GpFormFieldType } from '../../../../../form-wrapper/resources/form-field-type.enum';
import { TranslationInfo } from '../../../../../../resources/data/translation-info.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RelatedField } from '../../../../../../resources/data/data-table/filter/related-field.class';
import { TestingErrorCodeMock } from '../../../../../../shared/testing/@mock/utils/testing-mock-constants.class';
import { of } from 'rxjs';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { first } from 'rxjs/operators';

describe('TableEditableCellComponent', () => {
  let component: TableEditableCellComponent;
  let fixture: ComponentFixture<TableEditableCellComponent>;
  let tableService: TableService;
  let metadata;
  const tInfo = new TranslationInfo();
  tInfo.keyFields = ['code', 'description', 'action'];
  const translationInfo: TranslationInfo = tInfo;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableEditableCellComponent, TableEditableCellComponent],
      imports: [BrowserAnimationsModule, SharedModule, MultiLanguageModule],
      providers: [
        TableWrapperSharedProviders,
        { provide: NG_VALUE_ACCESSOR, useExisting: TableEditableCellComponent, multi: true },
        { provide: TableService, useClass: TableServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEditableCellComponent);
    component = fixture.componentInstance;
    tableService = TestBed.get(TableService);
    fixture.detectChanges();
  });

  beforeEach(() => {
    tableService.metadata('tablename').subscribe((item) => {
      metadata = new TableColumnMetadata();
      metadata.name = 'naciCodi';
      metadata.translationInfo = translationInfo;
      metadata.beforeChangeFn = (itemData, value, col) => value;
      component.item = {};
      component.item.naciCodi = '1';
      component.item.code = '3';
      component.item.description = '2';
      component.item.action = '4';
      component.columnMetadata = metadata;
      fixture.detectChanges();
      component.ngAfterViewInit();
    });
  });

  function saveNewValue(value: any, expectedValue: any) {
    const colMetadata = component.columnMetadata;
    component.columnMetadata.beforeChangeFn = null;

    fixture.detectChanges();
    component.stopEditing.pipe(first()).subscribe((data) => {
      expect(data.value).toEqual(expectedValue);
      expect(component.item[colMetadata.name]).toEqual(expectedValue);
    });

    component.startStop(expectedValue);

    expect(component.onModelChange).toHaveBeenCalled();
    expect(component.stopEditing.emit).toHaveBeenCalled();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add translations values', () => {
    expect(component.translationKeys.length).toEqual(3);
  });

  describe('Type dropdown', () => {
    beforeEach(() => {
      spyOn(component, 'getOptions').and.callThrough();
      spyOn(component, 'setOptions').and.callThrough();
      spyOn(component, 'isEditable').and.callThrough();
      spyOn(component, 'onModelChange').and.callThrough();
      spyOn(component.stopEditing, 'emit').and.callThrough();

      metadata.type = GpFormFieldType.DROPDOWN;
      metadata.optionsLabels = ['description'];
      metadata.options = [{ description: 'value 1' }];
      component.columnMetadata = metadata;
      fixture.detectChanges();
      component.ngAfterViewInit();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(component.getOptions).toHaveBeenCalled();
      expect(component.setOptions).toHaveBeenCalled();
    });

    it('should call isEditable', () => {
      expect(component.isEditable).toHaveBeenCalled();
    });

    it('should call isEditable with custom validate function', () => {
      component.columnMetadata.validateFn = () => true;
      component.columnMetadata.editableFn = () => true;
      fixture.detectChanges();
      component.ngAfterViewInit();
      expect(component.isEditable).toHaveBeenCalled();
    });

    it('should save the new value through before change fn', () => {
      saveNewValue('D', 'D');
    });

    it('should save the new value', () => {
      component.columnMetadata.beforeChangeFn = null;
      saveNewValue('D', 'D');
    });
  });

  describe('Type dropdown related', () => {
    beforeEach(() => {
      spyOn(component, 'getRelatedOptions').and.callThrough();
      spyOn(component, 'getOptions').and.callThrough();
      spyOn(component, 'setOptions').and.callThrough();
      spyOn(component, 'isEditable').and.callThrough();

      const relatedFields: RelatedField[] = [
        {
          field: 'file',
          fieldExternal: 'file-external',
          fieldDescription: 'none',
          value: { text: 'test' },
        },
        {
          field: 'name',
          fieldExternal: 'name-2',
          fieldDescription: 'none name',
          value: {},
        },
      ];

      metadata.type = GpFormFieldType.DROPDOWN_RELATED;
      metadata.optionsLabels = ['description'];
      metadata.options = [{ description: 'value 1' }];
      metadata.referencedTable = 'Table';
      metadata.relatedFields = relatedFields;
      component.columnMetadata = metadata;
      fixture.detectChanges();
      component.ngAfterViewInit();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(component.getOptions).toHaveBeenCalled();
      expect(component.setOptions).toHaveBeenCalled();
      expect(component.getRelatedOptions).toHaveBeenCalled();
    });
  });

  describe('Table List Service returns an 500 error', () => {
    beforeEach(() => {
      metadata.referencedTable = TestingErrorCodeMock.ERROR_500;
      metadata.type = GpFormFieldType.DROPDOWN_RELATED;
      component.columnMetadata = metadata;
      fixture.detectChanges();
      component.ngAfterViewInit();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Table List Service returns a generic error', () => {
    beforeEach(() => {
      spyOn(component, 'setCustomOptions').and.callThrough();
      metadata.referencedTable = TestingErrorCodeMock.ERROR_404;
      metadata.type = GpFormFieldType.DROPDOWN_RELATED;
      component.columnMetadata = metadata;
    });

    it('should call setCustomOptions', () => {
      component.columnMetadata.setOptionsFn = () => {
        return of([]);
      };
      fixture.detectChanges();
      component.ngAfterViewInit();
      expect(component).toBeTruthy();
      expect(component.setCustomOptions).toHaveBeenCalled();
    });

    it('should show a message', () => {
      component.columnMetadata.setOptionsFn = null;
      fixture.detectChanges();
      component.ngAfterViewInit();
      expect(component).toBeTruthy();
      expect(component.setCustomOptions).not.toHaveBeenCalled();
    });
  });

  describe('Type checkbox', () => {
    beforeEach(() => {
      spyOn(component, 'startStop').and.callThrough();
      spyOn(component, 'onModelChange').and.callThrough();
      spyOn(component.stopEditing, 'emit').and.callThrough();

      metadata.type = GpFormFieldType.CHECKBOX;
      component.columnMetadata = metadata;
      component.isFilter = false;
      fixture.detectChanges();
      component.ngAfterViewInit();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(component.startStop).not.toHaveBeenCalled();
    });

    it('should call isCheckboxChecked with flag checkedvalue', () => {
      spyOn(component, 'isCheckboxChecked').and.callThrough();
      spyOn(component, 'onCheckboxChange').and.callThrough();
      component.columnMetadata.checkedValue = '-';
      const $checkbox: HTMLElement = fixture.nativeElement.querySelector('input[type="checkbox"]');
      expect($checkbox).toBeTruthy();
      $checkbox.setAttribute('checked', 'checked');
      fixture.detectChanges();
      expect(component.isCheckboxChecked).toHaveBeenCalled();
      expect(component.value).toEqual('1');
    });

    it('should call onCheckboxChange', () => {
      component.onCheckboxChange('3');
      fixture.detectChanges();
      expect(component.startStop).toHaveBeenCalledWith('3');
    });

    it('should call onCheckboxChange with no value', () => {
      component.columnMetadata.uncheckedValue = 'A';
      component.onCheckboxChange(null);
      fixture.detectChanges();
      expect(component.startStop).toHaveBeenCalledWith(component.columnMetadata.uncheckedValue);
    });

    it('should call isCheckboxChecked', () => {
      spyOn(component, 'isCheckboxChecked').and.callThrough();
      const $checkbox: HTMLElement = fixture.nativeElement.querySelector('input[type="checkbox"]');
      expect($checkbox).toBeTruthy();
      $checkbox.setAttribute('checked', 'checked');
      fixture.detectChanges();
      expect(component.isCheckboxChecked).toHaveBeenCalled();
      expect(component.value).toEqual('1');
    });

    it('should call starStop method', () => {
      metadata.uncheckedValue = true;
      component.value = null;
      fixture.detectChanges();
      component.ngAfterViewInit();
      expect(component.startStop).toHaveBeenCalled();
      expect(component.onModelChange).toHaveBeenCalled();
    });

    it('should trigger stopEditing event', () => {
      metadata.uncheckedValue = true;
      metadata.beforeChangeFn = null;
      component.value = null;
      fixture.detectChanges();
      component.ngAfterViewInit();
      expect(component.startStop).toHaveBeenCalled();
      expect(component.onModelChange).toHaveBeenCalled();
      expect(component.stopEditing.emit).toHaveBeenCalled();
    });

    it('should save the new value', () => {
      saveNewValue('true', true);
      saveNewValue('si', true);
      saveNewValue('NO', true);
      saveNewValue('N', false);
      saveNewValue('S', true);
      saveNewValue('false', false);
      saveNewValue(true, true);
      saveNewValue(false, false);
    });
  });

  describe('Type file', () => {
    let $file: HTMLInputElement;
    let $uploadFileButton: HTMLButtonElement;
    let $deleteFileButton: HTMLButtonElement;

    beforeEach(() => {
      spyOn(component, 'openFileModal').and.callThrough();
      spyOn(component, 'isEditable').and.callThrough();
      spyOn(component, 'deleteFile').and.callThrough();
      spyOn(component, 'startStop').and.callThrough();
      spyOn(component, 'onStartEditing').and.callThrough();
      spyOn(component, 'hasFile').and.returnValue(true);

      metadata.type = GpFormFieldType.FILE;
      component.columnMetadata = metadata;
      fixture.detectChanges();
      $uploadFileButton = fixture.nativeElement.querySelector('button');
      $deleteFileButton = fixture.nativeElement.querySelector('button:last-child');
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect($uploadFileButton).toBeTruthy();
      expect($deleteFileButton).toBeTruthy();
      expect(component.isEditable).toHaveBeenCalled();
    });

    it('should open the modal when the user clicks on upload file', () => {
      $uploadFileButton.click();
      fixture.detectChanges();
      expect(component.openFileModal).toHaveBeenCalled();
      expect(component.temporalFile).toBeTruthy();
      expect(component.fileModalVisible).toBeTruthy();
    });

    it('should save the file successfully', () => {
      $uploadFileButton.click();
      fixture.detectChanges();
      $file = fixture.nativeElement.querySelector('input[type="file"]');
      expect($file).toBeTruthy();
      const file = new File([''], 'path/to/file.png');
      const newEventFileInput = document.createEvent('Event');
      Object.defineProperty(newEventFileInput, 'target', {
        writable: false,
        value: { files: [file] },
      });
      component.readFile(newEventFileInput);
      expect(component.temporalFile).toBeTruthy();
      const $save: HTMLButtonElement = fixture.nativeElement.querySelector(
        'button.ui-button-success'
      );
      expect($save).toBeTruthy();
      $save.click();

      expect(component.startStop).toHaveBeenCalled();
      expect(component.onStartEditing).toHaveBeenCalled();
    });

    it('should cancel to upload the file', () => {
      $uploadFileButton.click();
      fixture.detectChanges();
      const $cancelButton: HTMLButtonElement = fixture.nativeElement.querySelector(
        'button.ui-button-danger'
      );
      $cancelButton.click();
      fixture.detectChanges();
      expect(component.fileModalVisible).toBeFalsy();
    });

    it('should delete the file', () => {
      $deleteFileButton.click();
      fixture.detectChanges();
      expect(component.openFileModal).not.toHaveBeenCalled();
    });

    it('should delete the file with no value', () => {
      component.value = null;
      fixture.detectChanges();
      $deleteFileButton.click();
      fixture.detectChanges();
      expect(component.openFileModal).not.toHaveBeenCalled();
    });
  });

  describe('Type img', () => {
    let $button: HTMLButtonElement;

    beforeEach(() => {
      spyOn(component, 'openImgModal').and.callThrough();
      metadata.type = GpFormFieldType.IMG;
      component.columnMetadata = metadata;
      component.isFilter = false;
      fixture.detectChanges();
      component.ngAfterViewInit();
      $button = fixture.nativeElement.querySelector('button');
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should open the modal', () => {
      $button.click();
      expect(component.openImgModal).toHaveBeenCalled();
    });
    it('should open the modal with no value', () => {
      component.value = null;
      $button.click();
      expect(component.openImgModal).toHaveBeenCalled();
    });
  });

  describe('Type WYSIWYG', () => {
    let $button: HTMLButtonElement;
    beforeEach(() => {
      spyOn(component, 'openWYSIWYGModal').and.callThrough();
      metadata.type = GpFormFieldType.WYSIWYG;
      component.columnMetadata = metadata;
      component.isFilter = false;
      fixture.detectChanges();
      component.ngAfterViewInit();
      $button = fixture.nativeElement.querySelector('button');
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should open the modal', () => {
      $button.click();
      expect(component.openWYSIWYGModal).toHaveBeenCalled();
    });
    it('should open the modal with no value', () => {
      component.value = null;
      $button.click();
      expect(component.openWYSIWYGModal).toHaveBeenCalled();
    });
  });

  describe('Type switch', () => {
    beforeEach(() => {
      spyOn(component, 'startStop').and.callThrough();
      spyOn(component, 'onModelChange').and.callThrough();
      metadata.type = GpFormFieldType.SWITCH;
      component.columnMetadata = metadata;
      component.isFilter = false;
      fixture.detectChanges();
      component.ngAfterViewInit();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Type textarea', () => {
    let $button: HTMLButtonElement;
    beforeEach(() => {
      spyOn(component, 'openTextareaModal').and.callThrough();
      metadata.type = GpFormFieldType.TEXT_AREA;
      component.columnMetadata = metadata;
      component.isFilter = false;
      fixture.detectChanges();
      component.ngAfterViewInit();
      $button = fixture.nativeElement.querySelector('button');
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should open the modal', () => {
      $button.click();
      expect(component.openTextareaModal).toHaveBeenCalled();
    });

    it('should open the modal with no value', () => {
      component.value = null;
      $button.click();
      expect(component.openTextareaModal).toHaveBeenCalled();
    });
  });
});
