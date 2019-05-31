## Form Dropdown Related Field

## Example component usage:
```
<gp-form-dropdown-related-field></gp-form-dropdown-related-field>
```

### Inputs & Outputs

@Input() **relatedField**: *any* Info setup when another field element was changed by the user.


@Input() **formField**: *GpFormField* Current dropdown field info.


@Output() **valueChanged**: *InfoCampoModificado* Emit current value when is changed.

## Breaking changes: renaming.

**Variables renaming**
+ inicializa -> init
+ reinicia -> reset
+ _relatedFields -> relatedFields