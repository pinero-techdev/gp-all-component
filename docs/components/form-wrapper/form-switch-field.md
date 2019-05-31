# Form Switch Field

### Features a wrapper for text field component

## Example

```html
<gp-form-switch-field [formField]="formField">
</gp-form-switch-field>
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