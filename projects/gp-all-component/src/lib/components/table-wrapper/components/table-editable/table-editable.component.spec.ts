import { TableEditableRowComponent } from './components/table-editable-row/table-editable-row.component';
import { SharedModule } from './../../../../shared/shared.module';
import { MultiLanguageModule } from './../../../multi-language/multi-language.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableEditableComponent } from './table-editable.component';
import { TableWrapperSharedProviders } from '../../../../shared/imports/table-wrapper-shared';

describe('TableEditableComponent', () => {
  let component: TableEditableComponent;
  let fixture: ComponentFixture<TableEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableEditableComponent, TableEditableRowComponent],
      imports: [SharedModule, MultiLanguageModule],
      providers: [TableWrapperSharedProviders],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
