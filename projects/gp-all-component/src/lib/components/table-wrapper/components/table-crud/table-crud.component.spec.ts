import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
    TableWrapperSharedModules,
    TableWrapperSharedProviders,
} from '../../../../shared/imports/table-wrapper-shared';
import { TableCrudComponent } from './table-crud.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TableFrameComponent } from '../table-frame/table-frame.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TableCrudComponent', () => {
    let component: TableCrudComponent;
    let fixture: ComponentFixture<TableCrudComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TableCrudComponent, TableFrameComponent],
            imports: [TableWrapperSharedModules, RouterTestingModule, HttpClientTestingModule],
            providers: [TableWrapperSharedProviders],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableCrudComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
