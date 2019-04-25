# Table CRUD

## Features an integral solution for data visualization and edition

### Example component usage:

`app.component.html`

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

### Component Binding Fields

> ⚠️ Properties with an initialization corresponds with its default value

```typescript
  /**
   * Emits an event on row selection
   */
  @Output() rowSelected
```

```typescript
  /**
   * Emits an event on dialog close action
   */
  @Output() closedDialog
```

```typescript
  /**
   * Emits an event on row changes
   */
  @Output() changes
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
