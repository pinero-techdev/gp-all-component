import { MessagesService } from './../../../../../../services/core/messages.service';
import { TableMetadataService } from './../../../../../../services/api/table/table-metadata.service';
import { SharedModule } from './../../../../../../shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableEditableRowComponent } from './table-editable-row.component';

describe('TableEditableRowComponent', () => {
  let component: TableEditableRowComponent;
  let fixture: ComponentFixture<TableEditableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableEditableRowComponent, TableEditableRowComponent],
      imports: [SharedModule],
      providers: [TableMetadataService, MessagesService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEditableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
