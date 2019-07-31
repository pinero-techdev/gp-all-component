# Tab group Component

### Features a customisable tab group component

Tabgroup component allows us to quickly change what you are viewing without changing the window used in a program or menu.

## Example

Minimum component usage

```html
<gp-tabgroup>
    <ng-template gpTab tabTitle="Tab1 name">
        <div class="tab-panel">
            <h3>Tab1 title</h3>
            <p>Tab1 panel content.</p>
        </div>
    </ng-template>
    <ng-template gpTab tabTitle="Tab2 name">
        <div class="tab-panel">
            <h3>Tab2 title</h3>
            <p>Tab2 panel content.</p>
        </div>
    </ng-template>
</gp-tabgroup>
```

### Typescript

To use this component you must do the next steps:

First of all, you have to import MenuModule from gp-all-component in your app main module:

```ts
import { TabGroupModule } from 'gp-all-component';
...

@NgModule({
    ...
    imports: [
        ...
        TabGroupModule
        ...
    ],
    ...
})
```

Then we need using our wrapper tag component gp-tabgroup. It's in this tag where we must configure if we want our tabgroup to have vertical or horizontal orientation. By default the orientation is horizontal, but if we want it to be vertical just add the property orientation="left".

Finally, inside our gp-tabgroup we will be able to create as many content tabs as we want, always adding gpTab property to every tab template, and following this structure:

```html
<gp-tabgroup orientation="left">
    <ng-template gpTab tabTitle="Tab1 name">
        ...
    </ng-template>
    ...
</gp-tabgroup>
```