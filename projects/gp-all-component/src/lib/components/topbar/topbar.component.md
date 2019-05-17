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

