# TABLE-EDITABLE

### Features a modified table for data presentation with customized look

## Example

```html
<app-table-editable #tableInvoicesLinesChild
                    *ngIf="invoicesDataTableSelected&&invoicesDataTableSelected.id&&invoiceLinesDataTable"
                    [dataTable]="invoiceLinesDataTable"
                    [customButtons]="invoiceLinesButtons"
                    (onCustomButtonClicEvent)="onInvoiceLinesButtons($event)"
                    (onSaveEvent)="onSaveInvoiceLines($event)"
                    (onRefreshEvent)="getInvoiceLines()"
                    (onRowSelectEvent)="invoiceLinesDataTableSelected=$event"
></app-table-editable>
```

## Component Binding Fields

These are the component input and output bindings

::: warning 
⚠️ Properties with an initialization corresponds with its default value 
::: 

### @Outputs

```typescript
  /**
   * Emits an event on row selection
   */
  @Output() onRowSelectEvent = new EventEmitter<any>();
```

```typescript
  /**
   * Emits an event on a custom button being pressed
   */
  @Output() onCustomButtonClicEvent = new EventEmitter<any>();
```

```typescript
  /**
   * Emits an event on table refresh
   */
  @Output() onRefreshEvent = new EventEmitter<null>();
```

```typescript
  /**
   * Emits an event on saving a row change
   */
  @Output() onSaveEvent = new EventEmitter<any>();
```

```typescript
  /**
   * Emits an event on saving a row change (of a child table)
   */
  @Output() onSaveChildEvent = new EventEmitter<any>();
```

```typescript
  /**
   * Emits an event upon change
   */
  @Output() onCheckChangeEvent = new EventEmitter<any>();
```
@Output() onCheckChangeEvent = new EventEmitter<any>();

### @Inputs
@Input() customButtons: any[] = [];
```typescript
  /**
   * Data table object with all the necessary elements
   */
  @Input() dataTable: any;
```

```typescript
  /**
   * Custom Buttons to present in table
   */
 @Input() customButtons: any[] = [];
```

## Additional information

### CustomBottons

Custom buttons use an [] of buttons each one with id, tooltip and icon. Example:
```typescript
    this.buttonStruct.push({
          id:      'ButtonId',
          tooltip: 'ButtonDisplayedHelp',
          icon:    'ButtonIcon'
        });
```

Table use a specialized objecto present in another project (angular-service, back) caracterized as such:
```java

public class Table {

  @JsonProperty("canAdd")
  private boolean canAdd;

  @JsonProperty("canEdit")
  private boolean canEdit;

  @JsonProperty("canDelete")
  private boolean canDelete;

  @JsonProperty("caption")
  private String caption;

  @JsonProperty("cols")
  private List<Cols> cols = new ArrayList<>();

  @JsonProperty("lovs")
  private List<Lovs> lovs = new ArrayList<>();

  @JsonProperty("rows")
  private Object rows;

  @JsonProperty("dataKey")
  private String dataKey;

  @JsonProperty("width")
  private int width;

  @JsonProperty("expandableRows")
  private boolean expandableRows;

  @JsonProperty("checkBoxSelect")
  private boolean checkBoxSelect;

  @JsonProperty("tableChild")
  private String tableChild;


  @JsonProperty("scrollHeight")
  private int scrollHeight = 210;

  @JsonProperty("toggleColumns")
  private boolean toggleColumns;

  @JsonProperty("filters")
  private boolean filters;

  @JsonProperty("displayRows")
  private int displayRows = 20;

  @JsonProperty("checks")
  private boolean checks;

  @JsonProperty("ocultarConteo")
  private boolean ocultarConteo;
  
}

```
}


