# Loading Indicator

### Features a spinner icon

You can use this component when you want to show a loading animation in your application

## Example

```html
<gp-loading-indicator></gp-loading-indicator>
```

## Component Binding

## @Inputs

```ts
/**
 * Add a custom message while active
 */
@Input() msg = LocaleES.RETRIEVING_DATA;
```

```ts
/**
 * Set custom width for component
 */
@Input() w = '40px';
```

```ts
/**
 * Set custom height for component
 */
@Input() h = '40px';
```