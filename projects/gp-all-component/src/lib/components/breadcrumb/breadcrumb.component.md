# Breadcrumb Component

### Features a customisable breadcrumb component

Breadcrumb component is a graphical control element frequently used as a navigational aid in user interfaces and on web pages. It allows users to keep track and maintain awareness of their locations within programs, documents, or websites.

## Example

Minimum component usage

```html
<gp-breadcrumb [items]="items"></gp-breadcrumb>
```
It is only necessary to add the property home to the component in case you want that the first element of the breadcrumb is the icon that takes you to the home:

```html
<gp-breadcrumb [items]="items" [home]="home"></gp-breadcrumb>
```

### Typescript

To use this component you must do the next steps:

First of all, you have to import BreadcrumbModule from gp-all-component in your app main module:

```ts
import { BreadcrumbModule } from 'gp-all-component';
```

Then, you have to import MenuItem from gp-all-component in the typescript file of the component that is going to consume gp-menu:

```ts
import { GpMenuItem } from 'gp-all-component';
```

Within your consumer component of the menu you have to declare the variable that in NgOnInit you will fill with your breadcrumb items. In this case it's called items, and it's a GpMenuItems array:

```ts
export class <ConsumerComponentName> implements OnInit {
    items: GpMenuItem[];
```

You can create as much depth in the main menu as you choose. Just nest new item objects inside the main menu object:

```ts
ngOnInit(): void {
    this.items = [
         {
            id: '1',
            label: 'Gestión de propiedades',
            routerLink: '',
            icon:'pi pi-briefcase'
        },
        {
            id: '2',
            label: 'Propiedades',
            routerLink: ''
        },
        ...
    ]
```

To navigate to the selected page it is only necessary to add the property 'routerLink' and the path to the object of the menu item in question.

Gp-breadcrumb can be customized to show a Home icon as a first element. To do that you just need to declare a type GpMenuItem 'home' variable and assign (into ngOnInit) it to an object containing id, and property key 'icon' and value 'pi pi-home'.

```ts
this.home = { id: '1', icon: 'pi pi-home' };
```

Each breadcrumb element can also be accompanied by an icon. To do that you just need to insert a new property in its items object definition. This property should have 'icon' as key, and a class icon name such as 'pi pi-briefcase' for this breadcrumb example. And example of this can be seen in the items definition code above.

You can have a look to the PrimeNG official docs, breadcrumb section:

<p><a target="_blank" href="https://www.primefaces.org/primeng-7.1.3/#/breadcrumb">PrimeNG Docs - Breadcrumb</a></p>

### Template

Items: Array of Items of type GpMenuItem. You can create each breadcrumb item following the structure defined for MenuModel in PrimeNg. See the link mentioned above. In addition, you can create hierarchical levels of submenus by nesting menu-type objects.

```html
[items]="items"
```
home: Optional property to indicate that the first element of the breadcrumb must be the home icon.

```html
[home]="home"
```
