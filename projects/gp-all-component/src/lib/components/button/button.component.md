# Button Component

### Features a customisable button component

You can use this component whenever you need to show some kind of button

## Example

Minimum component usage

```html
    <gp-button [label]="'Save'" (onClickEvent)="fooFunction(params)"></gp-button>
```

### Typescript

To use this component you must do the next steps:

Import ButtonComponent at your consumer component typescript file:

```ts
import { ButtonComponent } from 'gp-all-component';
```

Extend your consumer component class with ButtonComponent

```ts
export class ButtonTesterComponent extends ButtonComponent {}
```

Call super(); inside your consumer component constructor

### Template

Label (write the label inside simple quotes)

```html
[label]="'Save'"
```

Type (write the button type inside simple quotes). There are four possible values: basic (this one doesn`t need to be specified), only icon, text and icon, and splitbutton.

```html
[type]="'icon'"
```
or
```html
[type]="'textIcon'"
```
or
```html
[type]="'splitButton'"
```

Severity (write the button severity inside simple quotes). There are five possible values: primary (this one doesn`t need to be specified), danger, secondary, ghost, dangerGhost.

```html
[severity]="'danger'"
```
or
```html
[severity]="'secondary'"
```
or
```html
[severity]="'ghost'"
```
or
```html
[severity]="'dangerGhost'"
```

Icon (write the button icon inside simple quotes).
```html
[icon]="'fa fa-save'"
```

Width (write the button width inside simple quotes). There are two possible values: default (this one doesn`t need to be specified), and buttonLarge.

```html
[width]="'buttonLarge'"
```

Disabled (DO NOT write the disabled value inside simple quotes). There are two possible values: true and false. Write this parameter just in case of true value.

```html
[disabled]="true"
```

Items. This parameter must contains an array with the different items that the splitbutton will display when clicked.

```html
[items]="splitbuttonItems"
```

SplitButton must be constructed as follows:

```ts
splitbuttonItems: any = [
    {
        label: 'Update',
        icon: 'fa fa-refresh',
        command: () => {
            // function to call
        },
    },
    {
        label: 'Delete',
        icon: 'fa fa-times',
        command: () => {
            // function to call
        },
    },
];
```

And finally onClickEvent. This should call the click function you have defined for it on your typescript file.

```html
(onClickEvent)="fooFunction(params)"
```