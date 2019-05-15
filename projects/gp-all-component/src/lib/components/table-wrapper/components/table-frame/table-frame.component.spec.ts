import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFrameComponent } from './table-frame.component';
import {
  TableWrapperSharedModules,
  TableWrapperSharedProviders,
} from '../../../../shared/imports/table-wrapper-shared';
import { TableCrudComponent } from '../table-crud/table-crud.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('TableFrameComponent', () => {
  let component: TableFrameComponent;
  let fixture: ComponentFixture<TableFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableFrameComponent, TableCrudComponent],
      imports: [TableWrapperSharedModules, RouterTestingModule, HttpClientTestingModule],
      providers: [
        TableWrapperSharedProviders,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of(),
          },
        },
      ],
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

  it('should viewChild be defined', () => {
    expect(component.viewChild).toBeTruthy();
  });

  describe('On params subscription', () => {
    it('should call viewChild on params change if "tabla" param was provided', () => {
      const testTableName = 'TestName';

      const $closeDialogSpy = spyOn(component.viewChild, 'closeDialog');
      const $cambiaTablaSpy = spyOn(component.viewChild, 'cambiaTabla');

      TestBed.get(ActivatedRoute).params = of({ tabla: testTableName });

      component.ngOnInit();

      expect($closeDialogSpy).toHaveBeenCalled();
      expect($cambiaTablaSpy).toHaveBeenCalled();
    });

    it('should not call viewChild on params change if no "tabla" param was provided', () => {
      const testTableName = 'TestName';

      const $closeDialogSpy = spyOn(component.viewChild, 'closeDialog');
      const $cambiaTablaSpy = spyOn(component.viewChild, 'cambiaTabla');

      TestBed.get(ActivatedRoute).params = of({ noTabla: testTableName });

      component.ngOnInit();

      expect($closeDialogSpy).not.toHaveBeenCalled();
      expect($cambiaTablaSpy).not.toHaveBeenCalled();
    });
  });
});
