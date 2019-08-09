# Form Slider Component

### Features a customisable slider component

A slider is a graphical control element with which a user may set a
value by moving an indicator, usually horizontally. In some cases user may also click on a point on the slider to change the setting. It is different from a scrollbar in that it is not continuous but used to adjust a value without changing the format of the display or the other information on the screen.

## Example

Minimum component usage:

```html
<gp-form-slider-field></gp-form-slider-field>
```

### Typescript

Since slider component is part of form module, all you need to do is to import FormWrapperModule from gp-all-component in your app main module:

```ts
import { FormWrapperModule } from 'gp-all-component';
```

### Template

All of the following properties are optional. You can get a basic slider without any of them.

Min and max are only compatible with step and rangeValues wether the
lower value of the range coincides with min and the higher value of the range coincides with max. In this case also the difference between min and max must be a multiple of steps.

```html
<gp-form-slider-field
    showInput="true"
    label="slider label"
    [step]="25"
    rangeValues="20,80"
    [min]="20"
    [max]="80"
    orientation="vertical">
</gp-form-slider-field>
```

showInput: set it to true if you want the slider show            the current value near itself. showInput has a double functionality , on the one hand it serves to visualize the selected value through
the slider, and on the other hand it acts as an input to move the
slider through the writing of a value.

```html
showInput="true"
```
label: write a text so that the slider has a label on top of it.

```html
label="slider label"
```
step: Step factor to increment/decrement the value.

```html
[step]="25"
```
rangeValues: when speficed, allows two boundary values to be picked.

```html
rangeValues="20,80"
```
min: mininum boundary value. Default value is 0.

```html
[min]="20"
```
max: maximum boundary value. Default value is 100.

```html
[max]="80"
```
orientation: orientation of the slider, valid values are horizontal and vertical, although the default orientation is horizontal.

```html
orientation="vertical"
```

You can have a look to the PrimeNG official docs, specifically Slider section:

<p><a target="_blank" href="https://www.primefaces.org/primeng-7.1.3/#/slider">PrimeNG Docs - Icons</a></p>
