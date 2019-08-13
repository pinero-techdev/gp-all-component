# Table Editable CRUD
Offers a table with an inline edition. Cell and Row editing provides a rapid and user friendly way to manipulate data.

`TableEditableCrudComponent` is a layer; it has below a `TableEditableComponent` and this table is compounded by rows and cells. The cells are made by  `TableEditableCellComponent`.


### Example

```html
<gp-table-editable-crud
  tableName="tableName"
  (startEditingField)="onStartEditingField($event)"
  (stopEditingField)="onStopEditingField($event)"
  (stopEdition)="onStopEdition($event)">
</gp-table-editable-crud>
```

## Component Binding Fields

These are the component input and output bindings.

### @Outputs

```typescript
  @Output() selectedDataChange = new EventEmitter<any[]>();
  @Output() deletedItem = new EventEmitter<any>();
  @Output() createdItem = new EventEmitter<any>();
  @Output() setTableConfig = new EventEmitter<DataChangeEvent<TableConfig>>();
  @Output() setTableColumns = new EventEmitter<DataChangeEvent<TableColumnMetadata[]>>();
  @Output() startEditingField = new EventEmitter<TableFieldEvent>();
  @Output() stopEditingField = new EventEmitter<TableFieldEvent>();
  @Output() startEdition = new EventEmitter<TableRowEvent>();
  @Output() stopEdition = new EventEmitter<TableRowEvent>();
  @Output() cancelEdition = new EventEmitter<TableRowEvent>();
```

### @Inputs
```typescript
/**
* Get the selected row
*/
@Input() selectedData(): any[];
```

```typescript
/**
* The table that is going to list.
*/
@Input() tableName(): string;
```

```typescript
/**
* Context params
* $implicit, index, columns
*/
@Input() rowTemplate: TemplateRef<any>;
```

```typescript
/**
* Context params
* $implicit, index, columns
*/
@Input() formTemplate: TemplateRef<any>;
```

```typescript
/**
* Context params
* $implicit, index
*/
@Input() actionsTemplate: TemplateRef<any>;
```

## Data
The service should return a list of ListRs:

``` typescript
class ListRs {
    data: any[];
    metadata: DataTableMetaData;
}
```

Metadata property is:
``` typescript
class DataTableMetaData {
    fields: DataTableMetaDataField[];
    tableLabel: string;
}
```

Where the fields is an array of object that they has a fieldType and a fieldName as others useful properties to define the behavior of the cell.

Every cell has a edit mode. The edit mode is actived when the user clicks on Edit button located in the actions cell. 

The cell is turned from a literal to the `TableEditableCellComponent`. 
This component has the possibility to show an:
1. Input Text.
2. Input Number.
3. Textarea.
4. An image by a live url.
5. A file uploader.
6. Input Checkbox.
7. Switch.
8. A dropdown.
9. A dropdown related.

Anyway, everything related to data is coming from the server depending of the tableName that is filled as input.
