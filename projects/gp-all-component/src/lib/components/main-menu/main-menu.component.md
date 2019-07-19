# Main Menu Component

### Component Binding Fields

  ```typescript
  /**
   * Data entry point
   */
    @Input() menu: MenuItem[];

  ```

  ```typescript
  /**
   * Check for menu open
   */
  @Input() isOpen: boolean;
  ```

  ```typescript
  /**
   * Emmiter for close menu action
   */
  @Output() closeMenu = new EventEmitter<boolean>();
  ```

  ```typescript
  /**
   * Emmiter for sendBreadcrumb action
   */
  @Output() sendBreadcrumb = new EventEmitter<any>();
  ```

## Example

### Bind data through service

You declare the menu in your template like this

```html
<gp-main-menu></gp-main-menu>
```

Then you need to provide a service in the module which is importing the main menu called `MainMenuProviderService` and you override it with your custom implementation.

```ts
providers: [{ provide: MainMenuProviderService, useClass: MainMenuTesterService }]
```

As an example of how to override the service with your own, you can use the following as a reference:

```ts
@Injectable()
export class MainMenuTesterService extends MainMenuProviderService {
    getEstructuraMenu(): any[] {
        return MAIN_MENU_TEMP_MOCK;
    }

    obtenOpcionesActivas(rq: MenuRq = null): Observable<CommonRs> {
        const response: any = new CommonRs();
        response.ok = true;
        response.menu = MAIN_MENU_MOCK;
        return Observable.of(response);
    }
}
```

The `MAIN_MENU_MOCK` would hold up the menu configuration.

### Bind data through custom implementation

You declare the menu in your template like this

```html
<gp-main-menu [menu]="your-menu-data-array"></gp-main-menu>
```

#### Setup the menu

The variable `your-menu-data-array` will hold up a list of elements with the following properties:

`MenuItem`
```ts
  action: string;
  enabled: boolean;
  icon: string; 
  overview: string;
  text: string;
```
**Action**

Path to routerLink. Example: '\login'.

**Enabled**
If the value is true the option is shown, otherwise the option is not part of the template.

**Icon**

The property icon should be equal to any of our current set of icons:

|  |  |  |
|----------|----------|----------|
| ![Assessment](../../resources/images/launcher/ico-overview.svg) | ![Search](../../resources/images/launcher/ico-consulta.svg)  | ![Concierge](../../resources/images/launcher/ico-concierge.svg) 
| assessment | search | concierge
| ![Services](../../resources/images/launcher/ico-servicios.svg) | ![BPMKT](../../resources/images/launcher/ico-bpmkt.svg) | ![Config](../../resources/images/launcher/ico-config.svg) 
| services | bpmkt | config
| ![In House](../../resources/images/launcher/ico-inhouse.svg) | ![Security](../../resources/images/launcher/ico-seguridad.svg) | ![Currency Exchange](../../resources/images/launcher/ico-divisa.svg)
| inhouse | security | currency-exchange
| ![Contacts](../../resources/images/launcher/ico-ods.svg) | ![List](../../resources/images/launcher/ico-listados-2.png) | ![Maintenance](../../resources/images/launcher/ico-mantenimiento-2.png) 
| contacts | list | maintenance |
| ![Functionality](../../resources/images/launcher/ico-funcionalidades-2.png) | ![Maintenance Folder](../../resources/images/launcher/ico-folder-mantenimiento.png) | ![List Folder](../../resources/images/launcher/ico-folder-listado.png) 
| functionality | maintenance-folder | list-folder |
| ![Functionality Folder](../../resources/images/launcher/ico-folder-funcionalidades.png) | ![Folder](../../resources/images/launcher/ico-folder-consulta.png) | ![Graphics Folder](../../resources/images/launcher/ico-folder-graficos.png)
| functionality-folder | search-folder | graphics-folder |

**Id**

Unique string that represents the item. If the value is set to `go_back` then the item has the ability to take the user back when the user clicks on it.

**Overview** 

The behavior of the menu should be simple; the user clicks on an option and the menu links to a route. It's not recommended to have a view inside the menu. Please, keep the menu simple as possible. Although, if you want to show a view inside the menu you can use the property 'overview' to link each item to the view. And the same time, you should add your template inside the menu selector as the sample on top.

If you want more info about how the template outlet works, visit the
<a href="https://angular.io/api/common/NgTemplateOutlet" target="_blank">Documentation about Template Outlet in Angular</a>

**Text**

When the user is over an option a tooltip is shown with this text. 

### Example usage with content (extracted from BSuite Project):

```html
<gp-main-menu>
    <ng-template let-overview let-isExpanded="expanded">
        
        <bpg-dashboard360 *ngIf="overview === 'dashboard'" [isExpanded]="isExpanded"></bpg-dashboard360>

        <bpg-overview360 *ngIf="overview === 'overview'"></bpg-overview360>

        <bpg-overview-concierge360 *ngIf="overview === 'overview-concierge'"></bpg-overview-concierge360>

        <bpg-overview-reserva-servicios *ngIf="overview === 'overview-reserva-servicios'"></bpg-overview-reserva-servicios>
        
    </ng-template>
</gp-main-menu>
```