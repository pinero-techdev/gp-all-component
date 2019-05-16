import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'gp-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  starsArray = [1, 2, 3, 4, 5];

  @Input() value: number;
  @Input() iconOn = 'pi-star';
  @Input() iconOff = 'pi-star';
  @Input() styleClassOn = 'gold';
  @Input() styleClassOff = '';
  @Input() styleOn = '';
  @Input() styleOff = '';
  @Input() stars: number;

  ngOnInit(): void {
    this.value = this.stars;
  }

  getRatingClass(i): string {
    return this.value > i
      ? `${this.iconOn} ${this.styleClassOn}`
      : `${this.iconOff} ${this.styleClassOff}`;
  }
}
