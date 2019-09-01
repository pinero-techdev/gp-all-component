import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowComponent } from './row.component';
import { TableModule } from 'primeng/table';
import { TableBuilder } from '../table.builder';
import { MemoPipeModule } from '../../../../../pipes/memo-pipe/memo.pipe.module';

describe('RowComponent', () => {
  let component: RowComponent;
  let fixture: ComponentFixture<RowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RowComponent],
      imports: [TableModule, MemoPipeModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowComponent);
    component = fixture.componentInstance;
    component.builder = new TableBuilder();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should editing to true', () => {
    spyOn(component.editing, 'emit').and.callThrough();
    component.startEdition();
    expect(component.editing.emit).toHaveBeenCalled();
    expect(component.isEditing).toBeTruthy();
  });

  it('should save', () => {
    spyOn(component.save, 'emit').and.callThrough();
    component.persistEdition();
    expect(component.save.emit).toHaveBeenCalled();
    expect(component.isEditing).toBeTruthy();
  });
});
