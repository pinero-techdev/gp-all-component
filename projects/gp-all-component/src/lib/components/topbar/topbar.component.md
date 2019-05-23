# TopBar #

## Features information about logged user and the option to logout. ##

## Component usage: ##

`app.component.html`

```
<gp-topbar></gp-topbar>

```

### Component binding props ###

> ⚠️ Properties with an initialization corresponds with its default value

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


### Check elements dependent on the logic of the consuming application, for example Bsuite  ###

> ⚠️ Add temporarily at the end of ngOnInit

```typescript
GlobalService.setLogged(true);
```
> ⚠️ Remove ngIf condition at "breadcrumb-wrapper" div to render the breadcrumb and replace temporarily whole "topbar-toolbar" div

```html
<div class="topbar-toolbar">
    <div class="breadcrumb-wrapper">
        <span class="topbar-toolbar-main">
            <a>Inicio</a>
        </span>
        <span>
            <i class="topbar-toolbar-icon pi pi-angle-right"></i>
            <a class="topbar-toolbar-action topbar-toolbar-active"> Reservas</a>
        </span>
    </div>
</div>
```

> ⚠️ And replace get fullName function logic by

```typescript
return GlobalService.getSESSION() ? GlobalService.getSESSION().fullName : 'Patterson Test';
```