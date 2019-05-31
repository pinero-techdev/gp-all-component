## Dropdown Related

Tag element `<gp-form-dropdown-related-field></gp-form-dropdown-related-field>`

### Inputs & Outputs

<p>@Input() <b>relatedField</b>: <i>any</i> Info setup when another field element was changed by the user.</p>
<p>@Input() <b>formField</b>: <i>GpFormField</i> Current dropdown field info</p>
<p>@Output() <b>valueChanged</b>: <i>InfoCampoModificado</i> Emit current value when is changed</p>

## Upgrade 1.1.0 -> 1.1.2

<b>DropdownRelatedComponent</b>

#### Variables renaming
+inicializa -> init
+reinicia -> reset
+_relatedFields -> relatedFields