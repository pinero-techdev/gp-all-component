import { Component, Input } from '@angular/core';

@Component({
  selector: 'gp-form-slider-field',
  templateUrl: './form-slider-field.component.html',
  styleUrls: ['./form-slider-field.component.scss'],
})
export class FormSliderFieldComponent {
  @Input()
  orientation = 'horizontal';

  val: number;
}
