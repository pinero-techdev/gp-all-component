import { Directive, ElementRef, Input } from '@angular/core';
import { Table } from 'primeng/table';
import { OnChange } from 'property-watch-decorator';

@Directive({
  selector: '[gpSelectRow]',
})
export class SelectRowDirective {
  @Input() table: Table;
  @Input() @OnChange('onSelected') selected: boolean;

  constructor(private el: ElementRef) {}

  onSelected() {
    const $checkbox = this.el.nativeElement.querySelector('.ui-chkbox-box');
    if ($checkbox) {
      const $icon = $checkbox.querySelector('.ui-chkbox-icon');
      if (this.selected) {
        $checkbox.classList.add('ui-state-active');
        $icon.classList.add('pi', 'pi-check');
      } else {
        $checkbox.classList.remove('ui-state-active');
        $icon.classList.remove('pi', 'pi-check');
      }
    }
  }
}
