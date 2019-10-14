import { TableBuilder } from './table.builder';
import { TableModel } from './models/table.model';
import { CoreTableModel } from './models/core-table.model';
import { TemplateRef } from '@angular/core';
import { TableColumn } from './models/table-column.model';

xdescribe('TableBuilder', () => {
  let builder: TableBuilder;
  let model: CoreTableModel;

  beforeEach(() => {
    builder = new TableBuilder();
    model = builder.createModel(new TableModel());
  });

  it('should be defined and create core table model', () => {
    expect(builder).toBeTruthy();
  });

  it('should return native options', () => {
    const nativeOptions = builder.getNative(model);
    expect(nativeOptions).toEqual(model.native);
  });

  it('should return title', () => {
    const title = builder.getTitle(model);
    expect(title).toEqual(model.title);
  });

  describe('on enableCaptionRow', () => {
    it('should return true if title exists', () => {
      model.title = 'TEST';
      const enableCaptionRow = builder.enableCaptionRow(model);
      expect(enableCaptionRow).toBeTruthy();
    });
    it('should return true if caption content exists', () => {
      const enableCaptionRow = builder.enableCaptionRow(model, {} as TemplateRef<any>);
      expect(enableCaptionRow).toBeTruthy();
    });
    it('should return false if no title exist nor caption content', () => {
      const enableCaptionRow = builder.enableCaptionRow(model);
      expect(enableCaptionRow).toBeFalsy();
    });
  });

  describe('on enableFilterRow', () => {
    it('should return true if table is globally filterable and not any column denies that', () => {
      model.filterable = true;
      const filterable = builder.enableFilterRow(model);
      expect(filterable).toBeTruthy();
    });
    it('should return true if table is not globally filterable but at least one column is', () => {
      model.columns.push(new TableColumn().assign({ filterable: true }));
      const filterable = builder.enableFilterRow(model);
      expect(filterable).toBeTruthy();
    });
    it('should return false if either table is not filterable and no column is filterable', () => {
      const enableCaptionRow = builder.enableCaptionRow(model);
      expect(enableCaptionRow).toBeFalsy();
    });
  });

  it('should return global filter', () => {
    const globalFilter = builder.hasGlobalFilter(model);
    expect(globalFilter).toBeFalsy();
  });

  describe('on isFilterable', () => {
    it('should return global filterable if not column is passed', () => {
      model.filterable = true;
      const filterable = builder.isFilterable(model);
      expect(filterable).toBeTruthy();
    });
    it('should return true if passed column do not specify filterable property', () => {
      const column = new TableColumn().assign({ field: 'name' });
      model.columns.push(column);
      model.filterable = true;
      const filterable = builder.isFilterable(model, column);
      expect(filterable).toBeTruthy();
    });
    it(`should return true if global filter is disabled but passed column do 
        specify filterable to true`, () => {
      const column = new TableColumn().assign({ field: 'name', filterable: true });
      model.columns.push(column);
      const filterable = builder.isFilterable(model, column);
      expect(filterable).toBeTruthy();
    });
    it(`should return false if global filter is disabled and passed column do not 
        specify filterable to true`, () => {
      const column = new TableColumn().assign({ field: 'name' });
      model.columns.push(column);
      const filterable = builder.isFilterable(model, column);
      expect(filterable).toBeFalsy();
    });
  });

  describe('on isSortable', () => {
    it('should return global sortable if not column is passed', () => {
      model.sortable = true;
      const sortable = builder.isSortable(model);
      expect(sortable).toBeTruthy();
    });
    it('should return true if passed column do not specify sortable property', () => {
      const column = new TableColumn().assign({ field: 'name' });
      model.columns.push(column);
      model.sortable = true;
      const sortable = builder.isSortable(model, column);
      expect(sortable).toBeTruthy();
    });
    it(`should return true if global sortable is disabled but passed column do 
        specify sortable to true`, () => {
      const column = new TableColumn().assign({ field: 'name', sortable: true });
      model.columns.push(column);
      const sortable = builder.isSortable(model, column);
      expect(sortable).toBeTruthy();
    });
    it(`should return false if global sortable is disabled and passed column do not 
        specify sortable to true`, () => {
      const column = new TableColumn().assign({ field: 'name' });
      model.columns.push(column);
      const sortable = builder.isSortable(model, column);
      expect(sortable).toBeFalsy();
    });
  });

  it('should return editable', () => {
    const isEditable = builder.isEditable(model);
    expect(isEditable).toBeFalsy();
  });

  it('should return lazy', () => {
    const isLazy = builder.getLazy(model);
    expect(isLazy).toBeTruthy();
  });

  it('should return paginator', () => {
    const paginator = builder.getPaginator(model);
    expect(paginator).toBeFalsy();
  });

  it('should return boolean if selection mode equals the passed one', () => {
    model.selectable = 'radius';
    const isSelectionMode = builder.isSelectionMode(model, 'radius');
    expect(isSelectionMode).toBeTruthy();
  });

  describe('on getSelectionMode', () => {
    it('should return if no model passed', () => {
      const selectionMode = builder.getSelectionMode(null);
      expect(selectionMode).not.toBeDefined();
    });
    it('should return single if radius was passed in model', () => {
      model.selectable = 'radius';
      const selectionMode = builder.getSelectionMode(model);
      expect(selectionMode).toEqual('single');
    });
    it('should return multiple if checkbox was passed in model', () => {
      model.selectable = 'checkbox';
      const selectionMode = builder.getSelectionMode(model);
      expect(selectionMode).toEqual('multiple');
    });
    it('should return model selection if is not any previous option', () => {
      model.selectable = 'single';
      const selectionMode = builder.getSelectionMode(model);
      expect(selectionMode).toBeDefined();
    });
  });

  it('should return columns', () => {
    const columns = builder.getColumns(model);
    expect(columns).toEqual(model.columns);
  });

  it('should return column for passed index position', () => {
    // TODO
  });

  it('should check if column for passed index position is a custom column', () => {
    // TODO
  });

  it('should return custom column for passed index position', () => {
    // TODO
  });

  it('should check if column for passed index position is an editable column', () => {
    // TODO
  });

  it('should return editable column for passed index position', () => {
    // TODO
  });
});
