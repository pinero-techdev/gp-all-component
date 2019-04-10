import { Component, Input } from '@angular/core';

@Component({
    selector: 'gp-rating',
    templateUrl: './gp-rating.component.html',
})
export class GpRatingComponent {
    public starsArray = [1, 2, 3, 4, 5];

    @Input() public value = 0;
    @Input() public iconOn = 'grade';
    @Input() public iconOff = 'grade';
    @Input() public styleClassOn = 'goldColor';
    @Input() public styleClassOff = '';
    @Input() styleOn = '';
    @Input() styleOff = '';

    @Input()
    set stars(numStars: number) {
        const array = [];
        for (let i = 0; i < numStars; i++) {
            array.push(i);
        }
        this.starsArray = array;
    }
}
