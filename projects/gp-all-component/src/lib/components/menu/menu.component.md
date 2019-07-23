# Menu Component

### Features a customisable menu component

Menu component allows navigation across several submenu levels. It can be displayed in full format or be shown collapsed on the left side.

## Example

Minimum component usage

```html
<gp-menu [items]="menuItems" [expanded]="true"></gp-menu>
```

### Typescript

To use this component you must do the next steps:

First of all, you have to import MenuModule from gp-all-component in your app main module:

```ts
import { MenuModule } from 'gp-all-component';
```

Then, you have to import PanelMenuModule from primeNg in the typescript file of the component that is going to consume gp-menu.:

```ts
import { PanelMenuModule } from 'primeng/panelmenu';
```

Within your consumer component of the menu you have to declare the variable that in NgOnInit you will fill with your menu items. In this case it's called menuItems, and it's a PanelMenuModule array:

```ts
export class <ConsumerComponentName> implements OnInit {
    menuItems: PanelMenuModule[];
```

You can create as much depth in the main menu as you choose. Just nest new item objects inside the main menu object:

```ts
ngOnInit(): void {
    this.menuItems = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            routerLink: '/components',
            title: 'Home',
        },
        {
            label: 'Gestión de propiedades',
            icon: 'pi pi-key',
            title: 'Gestión de propiedades',
            items: [
                {
                    label: 'Tipo de propiedades',
                    routerLink: 'navigate_to_tipopropiedades',
                    title: 'Tipo de propiedades',
                },
                {
                    label: 'Tipo de gasto',
                    routerLink: 'navigate_to_tipogasto',
                    title: 'Tipo de gasto',
                },
        ...
    ]
```

To navigate to the selected page it is only necessary to add the property 'routerLink' and the path to the object of the menu item in question.

You can have a look to the PrimeNG official docs, specifically MenuModel and Icons section:

<p><a target="_blank" href="https://www.primefaces.org/primeng-7.1.3/#/menumodel">PrimeNG Docs - MenuModel</a></p>
<p><a target="_blank" href="https://www.primefaces.org/primeng-7.1.3/#/icons">PrimeNG Docs - Icons</a></p>

### Template

Items: Array of Items of type MenuItem. You can create each menu item following the structure defined for MenuModel in PrimeNg. See the link mentioned above. In addition, you can create hierarchical levels of submenus by nesting menu-type objects.

```html
[items]="menuItems"
```
Expanded: boolean that controls the initial state of the menu, either expanded or collapsed.

```html
[expanded]="true"
```
