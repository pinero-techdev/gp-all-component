# Img Field

### Features an image loader field

The user types an URL in the text input and an image is shown on top of the component

## Example

```html
<gp-form-img-field [formField]="formField">
</gp-form-img-field>
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