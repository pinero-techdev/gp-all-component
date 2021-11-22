import { TableEditableCellComponent } from '../table-editable-cell/table-editable-cell.component';
import { SharedModule } from '../../../../../../shared/shared.module';
import { MultiLanguageModule } from '../../../../../multi-language/multi-language.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableEditableComponent } from './table-editable.component';
import { TableWrapperSharedProviders } from '../../../../../../shared/imports/table-wrapper-shared';
import { ButtonModule } from '../../../../../button/button.module';

describe('TableEditableComponent', () => {
  let component: TableEditableComponent;
  let fixture: ComponentFixture<TableEditableComponent>;
  let elementRef: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableEditableComponent, TableEditableCellComponent],
      imports: [SharedModule, ButtonModule, MultiLanguageModule],
      providers: [TableWrapperSharedProviders, TableMetadataService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    elementRef = fixture.nativeElement;
    tableMetadataService = TestBed.get(TableMetadataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Filters', () => {
    let buttonClearFilters: HTMLButtonElement;
    beforeEach(() => {
      spyOn(component, 'clearFilters').and.callThrough();
      buttonClearFilters = elementRef.querySelector('table thead gp-button > button');
    });

    it('should filter', () => {
      buttonClearFilters.click();
      expect(component.clearFilters).toHaveBeenCalled();
      const cleared = component.columns.filter((item) => item.filter === null);
      expect(cleared.length).toEqual(component.columns.length);
    });
  });
});
