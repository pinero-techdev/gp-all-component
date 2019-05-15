import { Component, Input } from '@angular/core';

@Component({
  selector: 'gp-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  public starsArray = [1, 2, 3, 4, 5];

  @Input() stars;
}
