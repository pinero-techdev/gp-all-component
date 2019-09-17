# Form Nullable Checkbox Field Component

## Features a wrapper for PrimeNg TriStateCheckbox Component

### Example component usage:

```html
<gp-nullable-checkbox-field [formField]="formField">
</gp-nullable-checkbox-field>
```

### Component Binding Fields

```typescript
  /**
   * The formField for this component
   */
  @Input() formField: FormField
```