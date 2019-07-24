import { TableEditableCellComponent } from '../table-editable-cell/table-editable-cell.component';
import { SharedModule } from '../../../../../../shared/shared.module';
import { MultiLanguageModule } from '../../../../../multi-language/multi-language.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableEditableComponent } from './table-editable.component';
import { TableWrapperSharedProviders } from '../../../../../../shared/imports/table-wrapper-shared';
import { FieldMetadataMock } from '../../../../../../shared/testing/@mock/types/list-rs.type.mock';
import { TableMetadataService } from '../../../../../../services/api/table/table-metadata.service';

xdescribe('TableEditableComponent', () => {
  let component: TableEditableComponent;
  let fixture: ComponentFixture<TableEditableComponent>;
  let elementRef: HTMLElement;
  let tableMetadataService: TableMetadataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableEditableComponent, TableEditableCellComponent],
      imports: [SharedModule, MultiLanguageModule],
      providers: [TableWrapperSharedProviders, TableMetadataService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    elementRef = fixture.nativeElement;
    tableMetadataService = TestBed.get(TableMetadataService);
    component.columns = tableMetadataService.getTableColumnsFromMetadata(FieldMetadataMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Filters', () => {
    beforeEach(() => {
      spyOn(component, 'clearFilters').and.callThrough();
    });

    it('should filter', () => {
      const buttonClearFilters: HTMLButtonElement = elementRef.querySelector('table thead button');
      buttonClearFilters.click();
      expect(component.clearFilters).toHaveBeenCalled();
      const noCleared = component.columns.filter((item) => !item.filter);
      expect(noCleared.length).toEqual(0);
    });

    it('should clear filters', () => {
      console.info(component.columns.length);
      component.changeFilter(component.columns[0], '1');
      console.info(component.columns.length);
      const buttonClearFilters: HTMLButtonElement = elementRef.querySelector('table thead button');
      buttonClearFilters.click();
      expect(component.clearFilters).toHaveBeenCalled();
      const noCleared = component.columns.filter((item) => !item.filter);
      expect(noCleared.length).toEqual(0);
    });
  });
});
