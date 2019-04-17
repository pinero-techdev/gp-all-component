import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFrameTesterComponent } from './table-frame-tester.component';

describe('TableFrameTesterComponent', () => {
    let component: TableFrameTesterComponent;
    let fixture: ComponentFixture<TableFrameTesterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TableFrameTesterComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableFrameTesterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
