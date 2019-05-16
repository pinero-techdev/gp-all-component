## Textarea ##
Tag element `<gp-form-textarea-field></gp-form-textarea-field>`.

Textarea shows a multi-language box when in its translationInfo object is setup with the proper keyFields.

Example:
<code>
    formField.fieldMetadata.displayInfo.translationInfo.keyFields = ['EN', 'FR'];
</code>

### Inputs & Outputs ###
<p>@Input() <b>formField</b>: <i>GpFormField</i> Current textarea field info</p>
