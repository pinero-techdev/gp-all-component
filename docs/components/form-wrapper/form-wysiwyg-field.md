# Text Field

### Features a wrapper for PrimeNG TextField Component

## Example

```html
<gp-form-text-field [formField]="formField">
</gp-form-text-field>
```

## Component Binding Fields

```typescript
  /**
   * The formField for this component
   */
  @Input() formField: FormField
```
## Validation

1. Nullability
2. Text Length (Min and Max)
3. Space validation
4. Control space validation
5. Special characters validation