import { ItemChangeEvent } from './../../resources/table-events.interface';
import { TableServiceMock } from './../../../../../../services/api/table/table.service.mock';
import { TableWrapperModule } from './../../../../table-wrapper.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableEditableCrudComponent } from './table-editable-crud.component';
import { TableService } from './../../../../../../services/api/table/table.service';

xdescribe('TableEditableCrudComponent', () => {
  let component: TableEditableCrudComponent;
  let fixture: ComponentFixture<TableEditableCrudComponent>;
  const tableName = 'DemoTable';
  // let tableService: TableService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TableWrapperModule],
      providers: [
        {
          provide: TableService,
          useClass: TableServiceMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEditableCrudComponent);
    component = fixture.componentInstance;
    component.tableName = tableName;
    // tableService = TestBed.get(TableService);
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(component, 'loadTable').and.callThrough();
    component.tableName = tableName;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.loadTable).toHaveBeenCalled();
  });

  it('should return table name', () => {
    expect(component.tableName).toEqual(tableName);
  });

  it('should return the selected data', () => {
    component.selectedDataChange.subscribe((output) => {
      expect(output).toEqual(component.selectedData);
    });
    component.selectedData = [1];
    fixture.detectChanges();
    expect(component.selectedData.length).toEqual(1);
  });

  it('should return an empty selected data', () => {
    component.selectedData = undefined;
    component.selectedDataChange.subscribe((output) => {
      expect(output).toEqual(component.selectedData);
    });
    fixture.detectChanges();
    expect(component.selectedData.length).toEqual(0);
  });

  it('should load the table', () => {
    spyOn(component, 'loadTable').and.callThrough();
    component.tableName = tableName;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.loadTable).toHaveBeenCalled();
    expect(component.data).not.toBeNull();
    expect(component.columns).not.toBeNull();
  });

  it('should get one row', () => {
    spyOn(component, 'loadTable').and.callThrough();
    fixture.detectChanges();
    const event: ItemChangeEvent = {
      original: '',
      modified: null,
      success: () => {
        //
      },
    };
    component.getOne(event);
    expect(component).toBeTruthy();
    expect(component.loadTable).toHaveBeenCalled();
    expect(component.data).not.toBeNull();
    expect(component.columns).not.toBeNull();
  });
});
