# Table Component
The table is an abstracted component of the PrimeNG table and therefore, offers us behaviour and functionality similar to what we have in the documentation of that library. [Here is](https://www.primefaces.org/primeng/#/table) the description of the component that PrimeNG has implemented. We highly recommend investing time in this component to get to understand the table's behaviour.

Next, let's see the configuration possibilities offered by the table:

## @Input

Decorator that provides us with an entry point to configure a property in the component.
> To make use of this we need to know beforehand how the Input decorators work in Angular.

+ **Data**: a fundamental part of the table. We need data to fill in a table, without the input data the rows will not be shown and a default message will be shown instead. These data must match their attributes to the columns expected in the model explained below. That is, both the model and the data must match. 


Example:
```js
    [
    	 {
            id: 1,
            name: 'Delhi',
            releaseDate: '12-03-2017',
            total: 12312,
        },
        {
            id: 2,
            name: 'Dubai',
            releaseDate: '12-03-2019',
            total: 4534534534,
        },
        {
            id: 3,
            name: 'Kuwait',
            releaseDate: '12-03-2020',
            total: 0,
        },
    ]
```

+ **Model**: second fundamental part of our table if we opt for the simple option. In case you are using metadata, it would not be necessary to pass the model, because the metadata would act as the model. Therefore, in the basic table we need data and model and for the advanced table, data and metadata. 

Following the example above, the model would be:
```js
const myModel = new TableModel().assign({
    	columns: [
    	  'id',
    	  'name',
   	   'releaseDate',
   	   'total'
  	  ]
	})
 ```

[Go here](#model) to find more information.

+ **Pagination**. This option comes by default in the advanced table (with metadata). If we want to add pagination to the basic or simple table, we have to add in the template and our HTML as follows.

In our model would be:
```js
const myModel = new TableModel().assign({
    	columns: [
    	  'id',
    	  'name',
   	   'releaseDate',
   	   'total'
  	  ],
	pagination: true,
    	native: {
       	rowsPerPageOptions: [5, 10, 20],
    		paginatorPosition: 'bottom', // 'bottom' | 'both' | 'top'
	    	dataKey: 'id',
	      defaultSortKey: 'name',
	      defaultSortOrder: -1 // Sort order to use when an unsorted column gets sorted by user interaction.
	}
})
 ```

We add this input in our HTML:

```js
<gp-table [data]="myData" [model]="myModel" [pagination]="simplePagination"></gp-table>
```

So, simplePagination is:

```js
    const simplePagination = {
        rows: 3, // Number of rows to display per page.
        totalRecords: 3, // Number of total records, defaults to length of value when not defined.
    } as PaginationOptions;
```

We recommend reading the [PrimeNG documentation](https://www.primefaces.org/primeng/#/paginator) about pagination.

+ **Loading**. The loader will help us not to show an empty table or that does not show anything while the data or the model are being loaded since many times we depend on a service and its response delay. Depends the attribute's value, we show or hide the loader.

```js
	<gp-table 
	[data]="myData" 
	[model]="myModel" 
	[pagination]="simplePagination"
	[loading]="true"></gp-table>
```

+ **Empty message**. Many times we can find that the table does not find data or there are still no records of this model and the table shows a default message: "ITEMS WAS NOT FOUND" . 

If we want to customize the message we should:

```js
	<gp-table 
	[data]="myData" 
	[model]="myModel" 
	[pagination]="simplePagination"
	[loading]="false"
	[emptyMessage]="'Mi mensaje'"></gp-table>
```
 

+ **Selected**. If we need to preselect one or more rows of the table. Following the PrimeNG documentation for multiple is an array and in case of 'single' selection is an object. Then we should put:
```js
<gp-table [data]="myData" [model]="myModel" [(selected)]="selectionRows"></gp-table>
```

Having:
```js
const selectedRows = [{
      id: 1,
      name: 'Delhi',
      releaseDate: '12-03-2017',
      total: 12312,
}];
```


+ **Metadata**. Introduction of the Piñero Group's own metadata. The metadata model is "FieldMetadata" and is defined in this same project in the path: "./projects/gp-all-component/src/lib/resources/data/data/datatable/meta-data/meta-datafield.model.ts".


## @Output
Decorator that we use to listen to any event generated within the component.
> To make use of this we need to know beforehand how the Output decorators work and how the EventEmitter is implemented in Angular.

+ **filter**. Event that is emitted when the user filters by column.
+ **page**. Event that is emitted when the page is changed.
+ **rowSelect**. Event that is emitted when selecting a row.
+ **rowUnselect**. Event that is emitted when deselecting a row.
+ **saveRow**. Event that is emitted when saving changes in an edited row.
+ **deleteRow**. Event that is emitted when clicking on delete row.

Example:
```js
<gp-table [data]="myData" [model]="myModel"
		 (filter)="onFilterEvent($event)"></gp-table>
```

## Sections of the table
This section will explain how to customize our table.

> To make use of this we need to know beforehand how the ng-template components and the embedded views of Angular work and also what they are and what use have the elements that make up an HTML table. 

Using an embedded template we can instantiate views for certain parts of the table in which we need a little customization.

As we said before, the table is based on the table component of PrimeNG, in the [documentation] (https://www.primefaces.org/primeng/#/table/sections) we can see the sections of which it is composed. In our table is a little different but the strategy and placement of the sections are the same, taken by order of appearance:


### Caption
The section above the table. This element takes shape when the table is avoidable, so it should not be customized as it will contain the button that enables/disables editing:
```js
<gp-table [data]="myData" [model]="myModel">
	<ng-template #caption>
   		/// My caption here
	</ng-template>
</gp-table>
```

#### Header
We can customize the column headers in this section:
```js
<gp-table [data]="myData" [model]="myModel">
	<ng-template #header>
		// My header here
		<tr>
		     <th>My col 1</th>
    		     <th>My col 2</th>
    		     <th>My col 3</th>
    		</tr>
	</ng-template>
</gp-table>
```

#### Footer
Located at the bottom of the table:
```js
<gp-table [data]="myData" [model]="myModel">
	<ng-template #footer>
   		/// My footer here
	</ng-template>
</gp-table>
```

## Table variants
The table offers two options: 
+ Simple and configurable.
+ Advanced, using metadata.

### Simple or Basic Table
When the table does not have the metadata property it is configured as a simple table, in which everything explained in the previous sections is configurable.

Configuration for a basic table, it would be:
```js
<gp-table [data]="myData" [model]="myModel"></gp-table>
```

With these two inputs, we will be able to visualize a basic table, if we don't have data it will show a default message indicating that there is no data.

### Advanced Table
The advanced table expects the metadata defined by Grupo Piñero as input. It will come from the services in a direct way, there is no need to modify it. 

As for the model of this table, it will not be necessary to pass to the component nothing, since internally it is created its own model, defined with pagination, sortable, editable, without filters and not selectable.

If you want to add modify these values, you will have to pass a model with these properties and the required value. Only the following properties can be modified: "selectable", "filterable" and "sortable".

Example:
```js
const myModel = new TableModel().assign({
	sortable: true,
	filterable: true,
	selectable: 'checkbox',
})
 ```

## Model
We can pass the following properties to the table model.

+ **Selectable**. To make the table to show the row selection with a checkbox:

```js
const myModel = new TableModel().assign({
    	columns: [ ... ],
    	selectable: 'checkbox' // 'checkbox' | 'single' by default
});
```

+ **Editable**. To make editable the rows.

```js
const myModel = new TableModel().assign({
    	columns: [ ... ],
    	editable: true
});
```

+ **Filterable**. To show one filter per column.

```js
const myModel = new TableModel().assign({
    	columns: [ ... ],
    	filterable: true
});
```