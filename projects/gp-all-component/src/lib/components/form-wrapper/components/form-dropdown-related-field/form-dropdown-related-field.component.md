## Dropdown Related

Tag element `<gp-form-dropdown-related-field></gp-form-dropdown-related-field>`

### Inputs & Outputs

<p>@Input() <b>relatedField</b>: <i>any</i> Info setup when another field element was changed by the user.</p>
<p>@Input() <b>formField</b>: <i>GpFormField</i> Current dropdown field info</p>
<p>@Output() <b>valueChanged</b>: <i>InfoCampoModificado</i> Emit current value when is changed</p>

## Breaking changes: renaming.

<b>DropdownRelatedComponent</b>

<ol>
    <li>
        <p>Variables renaming</p>
        <ul>
            <li>inicializa -> init</li>
            <li>reinicia -> reset</li>
            <li>_relatedFields -> relatedFields</li>
        </ul>
    </li>
</ol>
