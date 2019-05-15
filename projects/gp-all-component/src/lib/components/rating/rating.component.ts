import { Component, Input } from '@angular/core';

@Component({
  selector: 'gp-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  public starsArray = [1, 2, 3, 4, 5];

  @Input()
  set stars(numStars: number) {
    const array = [];
    for (let i = 0; i < numStars; i++) {
      array.push(i);
    }
    this.starsArray = array;
  }
}
