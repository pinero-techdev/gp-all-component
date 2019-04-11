import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/primeng';
import { take } from 'rxjs/operators';

import { MultiSelectTesterComponent } from './multi-select-tester.component';

describe('MultiSelectTesterComponent', () => {
    let component: MultiSelectTesterComponent;
    let fixture: ComponentFixture<MultiSelectTesterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MultiSelectTesterComponent],
            imports: [MultiSelectModule, FormsModule, ReactiveFormsModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MultiSelectTesterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should write value', () => {
        const value = 'test';

        component.writeValue(value);
        expect(component.valor).toEqual(value);
    });

    describe('on register on change', () => {
        it('it should set default value', () => {
            const defaultValue = component.defaultLabel;

            component.registerOnChange(() => null);

            expect(component.multi.valuesAsString).toEqual(defaultValue);
        });

        it('it should set selected value', () => {
            const selected = 'test';
            const value = [1];

            component.selectionLabel = selected;
            component.multi.value = value;

            component.registerOnChange(() => null);

            component.multi.updateLabel();

            expect(component.multi.valuesAsString).toEqual(
                value.length.toString() + ' ' + selected
            );
        });
    });

    describe('emit passed value', () => {
        it('should fail if passed value is the same as the new one', () => {
            const newValue = 'new-test';
            const oldValue = 'old-test';

            component.changed.pipe(take(1)).subscribe((value) => expect(value).toBeUndefined());

            component.writeValue(newValue);
            component.valor = newValue;
        });

        it('should pass if passed value is not the same as the new one', () => {
            const newValue = 'new-test';
            const oldValue = 'old-test';

            component.changed.pipe(take(1)).subscribe((value) => expect(value).toEqual(newValue));

            component.writeValue(oldValue);
            component.valor = newValue;
        });
    });
});
