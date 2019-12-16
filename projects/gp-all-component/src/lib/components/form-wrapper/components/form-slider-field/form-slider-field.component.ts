import { Component, Input, OnInit } from '@angular/core';
import { Orientation } from '../../../../resources/constants/slider.enum';

@Component({
  selector: 'gp-form-slider-field',
  templateUrl: './form-slider-field.component.html',
  styleUrls: ['./form-slider-field.component.scss'],
})
export class FormSliderFieldComponent implements OnInit {
  @Input()
  label = '';

  @Input()
  showInput = false;

  @Input()
  orientation = Orientation.Horizontal;

  @Input()
  step = 1;

  @Input()
  rangeValues: string;

  @Input()
  range: boolean;

  @Input()
  min = 0;

  @Input()
  max = 100;

  val: number | number[];
  showLabel = false;
  verticalOrientation = Orientation.Vertical;

  ngOnInit() {
    this.showLabel = this.label === '' || this.label === null ? false : true;
    if (this.rangeValues) {
      this.range = true;
      this.val = this.rangeValues.split(',').map(Number);
    } else if (this.min) {
      this.val = this.min;
    } else {
      this.val = 0;
    }
  }
}
