import { Component, Input, OnInit } from '@angular/core';

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
  orientation = 'horizontal';

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

  val: any;
  showLabel = false;

  ngOnInit() {
    this.showLabel = this.label === '' ? false : true;
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
