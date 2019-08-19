# Modal Component

### Features a customisable modal component

Menu component allows navigation across several submenu levels. It can be displayed in full format or be shown collapsed on the left side.

## Example

Minimum component usage

```html
<gp-modal
        header="Tester gp-modal titlebar"
        [visible]="visible"
        (onHideEvent)="onHide()">
        <div content>
            ...
        </div>
        <div footer>
            ...
        </div>
    </gp-modal>
```

### Typescript

To use this component you must do the next steps:

First of all, you have to import ModalModule from gp-all-component in your app main module:

```ts
import { ModalModule } from 'gp-all-component';
```

Then, within the modal component consumer class, you have to declare the variable visible and initialize it to false:

```ts
export class <ConsumerComponentName> implements OnInit {
    visible = false;
```

 Finally you need two functions, one that works as modal trigger and sets the variable visible to true, and another that hides the modal by setting it to false. This last function is the one that will be called in the onHideEvent event of the template:

```ts
showDialog() {
    this.visible = true;
}

onHide() {
    this.visible = false;
}
```

### Template

Header: string to add a titlebar/header to the modal.

```html
header="gp-modal titlebar"
```
Visible: boolean that controls the visibility of the modal.

```html
[visible]="visible"
```
OnHideEvent: custom event listener to manage the modal hiding. Needs to call a function that sets visible variable to false.

```html
(onHideEvent)="onHide()"
```
CustomStyle: optional property to apply custom style rules to the modal. Needs to be an object.

```html
[customStyle]="{width: '90vw'}"
```
Content div and Footer div: divs that will host the main content and the footer content.

```html
<div content>
    ...
</div>
<div footer>
    ...
</div>
```

You can have a look to the PrimeNG official docs, specifically Dialog section:

<p><a target="_blank" href="https://www.primefaces.org/primeng-7.1.3/#/dialog">PrimeNG Docs - Dialog</a></p>