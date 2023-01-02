# Top Bar 

### Features information about logged user and the option to logout.

## Example

```html
<gp-topbar></gp-topbar>
```

## Component binding props

::: warning
⚠️ Properties with an initialization corresponds with its default value
:::

```typescript
@Input() homeUrl: string;
```

```typescript
@Input() logoUrl: string;
```

```typescript
@Input() title: string;
```
```typescript
@Input() isOpen: boolean = false;
```
```typescript
@Input() newStatusBreadcrumb: any;
```


## Application Cases

Check elements dependent on the logic of the consuming application, for example Bsuite

> ⚠️ Remove ngIf condition at "breadcrumb-wrapper" div to render the breadcrumb and replace temporarily whole "topbar-toolbar" div

```html
<div class="topbar-toolbar">
    <div class="breadcrumb-wrapper">
        <span class="topbar-toolbar-main">
            <a>Inicio</a>
        </span>
        <span>
            <i class="topbar-toolbar-icon fa fa-angle-right"></i>
            <a class="topbar-toolbar-action topbar-toolbar-active"> Reservas</a>
        </span>
    </div>
</div>
```