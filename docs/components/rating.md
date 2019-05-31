# Rating

### Features a customisable rating component

You can use this component whenever you need to show some kind of rating for any element

## Example

Minimum component usage

```html
<gp-rating value="3"></gp-rating>
```

You can pass a custom number of positions

```html
<gp-rating value="7" positions="10"></gp-rating>
```
You can pass a custom icon for on/off status

```html
<gp-rating 
    value="5" 
    iconOn="pi-key" 
    iconOff="pi-key">
</gp-rating>
```

## Component Binding Fields

::: warning
⚠️ Properties with an initialization corresponds with its default value
:::

### @Input

```ts
    /**
     * Total number of rating icons to generate
     */
    @Input() value: number;

    /**
     * Total of positions to generate
     */
    @Input() positions = 5;

    /**
     * Class of the icon in on status
     */
    @Input() iconOn = 'pi-star';

    /**
     * Class of the icon in off status
     */
    @Input() iconOff = 'pi-star';

    /**
     * Class to style the icon in on status
     */
    @Input() styleClassOn = 'gold';

    /**
     * Class to style the icon in off status
     */
    @Input() styleClassOff = '';

    /**
     * General class for on status
     */
    @Input() styleOn = '';

    /**
     * General class for off status
     */
    @Input() styleOff = '';
```
