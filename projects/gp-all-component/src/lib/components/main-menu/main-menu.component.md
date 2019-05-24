# Main menu #
<p>The tag element is `gp-main-menu`</p>
<p>To show the menu the param `menuItems` should have the items</p>
<p></p>

```html
<gp-main-menu class="layout-container">
    <ng-template let-overview>{{ overview }}</ng-template>
</gp-main-menu>
```

Example usage with content extracted from BSuite
```html
<gp-main-menu class="layout-container">
    <ng-template let-overview let-isExpanded="expanded">
        <bpg-dashboard360 *ngIf="overview === 'dashboard'" [isExpanded]="isExpanded"></bpg-dashboard360>
        <bpg-overview360 *ngIf="overview === 'overview'"></bpg-overview360>
        <bpg-overview-concierge360 *ngIf="overview === 'overview-concierge'"></bpg-overview-concierge360>
        <bpg-overview-reserva-servicios *ngIf="overview === 'overview-reserva-servicios'"></bpg-overview-reserva-servicios>
    </ng-template>
</gp-main-menu>
```


