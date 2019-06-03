# Textarea Field

### Features a wrapper for PrimeNg Textarea Component
Defines a multi-line text input control.

## Example

```
 <gp-form-textarea-field></gp-form-textarea-field>
```

Textarea shows a multi-language box when in its translationInfo object is setup with the proper keyFields.

```
    formField.fieldMetadata.displayInfo.translationInfo.keyFields = ['EN', 'FR'];
```

## Inputs 

@Input() **formField**: *GpFormField* Current textarea field info
