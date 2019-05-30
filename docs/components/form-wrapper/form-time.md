# Form Time Field Component

## Features a wrapper for time field component

### Example component usage:

```html
<gp-form-time-field [formField]="formField"> </gp-form-time-field>
```

### Component Binding Fields

```typescript
  /**
   * The formField for this component
   */
  @Input() formField: FormField
```

### Validation

1. Nullability
2. Text Length (Min and Max)
3. Valid Time
