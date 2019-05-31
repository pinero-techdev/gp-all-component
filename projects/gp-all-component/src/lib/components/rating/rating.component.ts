import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'gp-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  /**
   * Total number of rating icons to generate
   */
  @Input() value: number;

  /**
   * Total of positions to generate
   */
  @Input() positions = 5;

  /**
   * Class of the icon in on status
   */
  @Input() iconOn = 'pi-star';

  /**
   * Class of the icon in off status
   */
  @Input() iconOff = 'pi-star';

  /**
   * Class to style the icon in on status
   */
  @Input() styleClassOn = 'gold';

  /**
   * Class to style the icon in off status
   */
  @Input() styleClassOff = '';

  /**
   * General class for on status
   */
  @Input() styleOn = '';

  /**
   * General class for off status
   */
  @Input() styleOff = '';

  /**
   * Total rating positions to fill
   */
  positionsList = [];

  ngOnInit() {
    this.positionsList = this.getPositions(this.positions);
  }

  /**
   * Returns the class for the position given
   * @param i The current position
   */
  getRatingClass(i: number): string {
    return this.value > i
      ? `${this.iconOn} ${this.styleClassOn}`
      : `${this.iconOff} ${this.styleClassOff}`;
  }

  /**
   * Returns an array for the total of positons given
   * @param total The total of positions to generate
   */
  private getPositions(total: number): number[] {
    const positions = [];

    for (let i = 1; i <= total; i++) {
      positions.push(i);
    }

    return positions;
  }
}
