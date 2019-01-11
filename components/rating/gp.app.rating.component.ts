import { Component, Input } from '@angular/core';

//TODO: Vicente Prats 13/04/2018 En cuanto haya tiempo hacer que la clase implemente ControlValueAccesor, para poder seleccionar valoraciones mediante click

@Component({
  selector: 'gp-app-rating',
  templateUrl: './gp.app.rating.component.html'
})
export class GpAppRatingComponent {
  @Input()
  set stars(numStars: number) {
    let array = [];
    for (let i = 0; i < numStars; i++) {
      array.push(i);
    }
    this.starsArray = array;
  }

  public starsArray: number[] = [1, 2, 3, 4, 5];

  @Input()
  public value: number = 0;
  @Input()
  public iconOn: string = 'grade';
  @Input()
  public iconOff: string = 'grade';
  @Input()
  public styleClassOn: string = 'goldColor';
  @Input()
  public styleClassOff: string = '';
  @Input()
  styleOn: string = '';
  @Input()
  styleOff: string = '';
}
