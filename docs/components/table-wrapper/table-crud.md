# Table CRUD

### Features an integral solution for data visualization and edition

## Example

```html
<gp-app-table-crud
  tableName="TABLE_BPG_RMK"
  (changes)="onChanges($event)"
  [canEdit]="false"
  [canAdd]="true"
  [canDelete]="true"
>
</gp-app-table-crud>
```

## Component Binding Fields

> ⚠️ Properties with an initialization corresponds with its default value

```typescript
  /**
   * Emits an event on row selection
   */
  @Output() rowSelected: Object
```

```typescript
  /**
   * Emits an event on dialog close action
   */
  @Output() closedDialog: boolean
```

```typescript
  /**
   * Emits an event on row changes
   */
  @Output() changes: boolean
```

```typescript
  /**
   * Editing table name
   */
  @Input() tableName: string
```

```typescript
  /**
   * Filters property
   */
  @Input() filterField: string
```

```typescript
  /**
   * Filters from main table
   */
  @Input() rowSelectedFilters: Filter[]
```

```typescript
  /**
   * Controls creation permission
   */
  @Input() canAdd = true
```

```typescript
  /**
   * Controls modification permission
   */
  @Input() canEdit = true
```

```typescript
  /**
   * Controls deletion permission
   */
  @Input() canDelete = true
```
## Deprecated methods ☢

```
matchFieldType(formField: GpFormField)
```
This method has been deleted, as result of GpFormField's  formFieldType property type change, from string to GpFormFieldType enum type.
```formFieldType: string == null``` 
to
```formFieldType: GpFormFieldType;```


Now, is not necesary to map the formFieldType with TableDisplayTypes, GpFormFieldType, do this stuff: 
``` const fieldType = this.matchFieldType(formField); ```
to
```const fieldType = GpFormFieldType[formField.fieldMetadata.displayInfo.displayType];```

Following methods had been renamed, there might be API implementation conflicts: 

`cambiaTabla` -> `changeTable`

`cambiaTablaDetalle` -> `changeTableDetail`

`actualizaDefinicion` -> `updateDefinition`