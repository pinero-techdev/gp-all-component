# Main Menu

### Component Binding Fields

  ```typescript
  /**
   * Check for menu open
   */
  @Input() isOpen: boolean;
  ```

  ```typescript
  /**
   * Check for new status launcher
   */
  @Input() newStatusLauncher: any;
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

### Example component usage:

Sample minimum usage:

```html
<gp-main-menu> </gp-main-menu>
```

Example usage with content (extracted from BSuite):
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