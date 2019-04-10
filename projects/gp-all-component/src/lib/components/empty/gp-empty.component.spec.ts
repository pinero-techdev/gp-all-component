import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpEmptyComponent } from './gp-empty.component';

describe('GpEmptyComponent', () => {
    let component: GpEmptyComponent;
    let fixture: ComponentFixture<GpEmptyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GpEmptyComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GpEmptyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
