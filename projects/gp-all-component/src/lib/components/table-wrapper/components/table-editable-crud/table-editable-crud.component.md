# Table Editable CRUD
Offers a table with an inline edition. Cell and Row editing provides a rapid and user friendly way to manipulate data.

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
