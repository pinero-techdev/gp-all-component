# Multi-Select

### Features input multi-selection for your forms

## Example

```html
<gp-multi-select
    selectionLabel="Opciones seleccionadas"
    [options]="selectionOptions"
    [disabled]="true"
    (onChange)="onSelect($event)"
    defaultLabel="Elige una opción"
    [tabindex]="0"
>
</gp-multi-select>
```

## Example multi-select options

```typescript
selectionOptions: SelectItem[] = [
    {
        label: 'Test 1',
        value: 'D34FG',
        icon: 'fa-file',
    },
    {
        label: 'Test 2',
        value: 'D43FA',
        icon: 'fa-file',
    },
];
```

## Type definitions

`SelectItem`

```typescript
    label?: string;
    value: any;
    styleClass?: string;
    icon?: string;
    title?: string;
    disabled?: boolean;
```

## Component Binding Fields

> ⚠️ Properties with an initialization corresponds with its default value

```typescript
@Input() selectionLabel: string = 'Opciones seleccionadas'
```

```typescript
@Input() options: SelectItem[]
```

```typescript
@Input() disabled: boolean = false
```

```typescript
@Input() defaultLabel: string = 'Elige una opción'
```

```typescript
@Input() appendTo: any
```

```typescript
@Input() style: Object
```

```typescript
@Input() styleClass: Object
```

```typescript
@Input() filter: boolean = true
```

```typescript
@Input() scrollHeight: string = '200px'
```

```typescript
@Input() overlayVisible: boolean = false
```

```typescript
@Input() tabindex: number
```

```typescript
@Output() onChange: EventEmitter<any>
```
