import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingComponent } from './rating.component';

describe('RatingComponent', () => {
    let component: RatingComponent;
    let fixture: ComponentFixture<RatingComponent>;
    let elementRef: HTMLElement;

    function getStars(): NodeListOf<Element> {
        fixture.detectChanges();
        elementRef = fixture.debugElement.nativeElement;
        return elementRef.querySelectorAll('.material-icons');
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RatingComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RatingComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('stars should be equal as passed input number', () => {
        const starNumber = 3;

        component.stars = starNumber;

        expect(component.starsArray.length).toEqual(starNumber);
    });

    it('DOM nodes should be equal as passed input', () => {
        const starNumber = 3;

        component.stars = starNumber;

        const stars = getStars();

        expect(component.starsArray.length).toEqual(starNumber);
        expect(stars.length).toEqual(starNumber);
    });
});
