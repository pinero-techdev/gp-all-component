import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingTesterComponent } from './rating-tester.component';

describe('RatingTesterComponent', () => {
    let component: RatingTesterComponent;
    let fixture: ComponentFixture<RatingTesterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RatingTesterComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RatingTesterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('stars should be equal as passed input number', () => {
        const starNumber = 3;

        component.stars = starNumber;

        expect(component.starsArray.length).toEqual(3);
    });
});
