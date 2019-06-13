import { TableEditableRowComponent } from './components/table-editable-row/table-editable-row.component';
import { MessagesService } from './../../../../services/core/messages.service';
import { TableMetadataService } from './../../../../services/api/table/table-metadata.service';
import { SharedModule } from './../../../../shared/shared.module';
import { MultiLanguageModule } from './../../../multi-language/multi-language.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableEditableComponent } from './table-editable.component';
import { ConfirmationService } from 'primeng/api';

describe('TableEditableComponent', () => {
  let component: TableEditableComponent;
  let fixture: ComponentFixture<TableEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableEditableComponent, TableEditableRowComponent],
      imports: [SharedModule, MultiLanguageModule],
      providers: [TableMetadataService, MessagesService, ConfirmationService],
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
