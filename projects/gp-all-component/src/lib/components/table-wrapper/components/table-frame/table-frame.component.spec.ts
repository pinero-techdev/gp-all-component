import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFrameComponent } from './table-frame.component';
import {
    TableWrapperCommonModules,
    TableWrapperCommonProviders,
} from '../../common/common.imports';
import { TableCrudComponent } from '../table-crud/table-crud.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TableFrameComponent', () => {
    let component: TableFrameComponent;
    let fixture: ComponentFixture<TableFrameComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TableFrameComponent, TableCrudComponent],
            imports: [TableWrapperCommonModules, RouterTestingModule, HttpClientTestingModule],
            providers: [TableWrapperCommonProviders],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableFrameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
