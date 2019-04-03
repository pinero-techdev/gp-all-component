import { SharedModule } from './../../shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicComponent } from './dynamic.component';

describe('DynamicComponent', () => {
    let component: DynamicComponent;
    let fixture: ComponentFixture<DynamicComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DynamicComponent],
            imports: [SharedModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
