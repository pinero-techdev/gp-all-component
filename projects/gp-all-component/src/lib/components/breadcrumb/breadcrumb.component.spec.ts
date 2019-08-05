import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';

fdescribe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  let $breadcrumb: HTMLDivElement;
  let $breadcrumbHomeIcon: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbComponent],
      imports: [BreadcrumbModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Breadcrumb with items', () => {
    beforeEach(() => {
      component.items = [
        {
          id: '1',
          label: 'Gestión de propiedades',
          routerLink: '',
          icon: 'pi pi-briefcase',
        },
        {
          id: '2',
          label: 'Propiedades',
          routerLink: '',
        },
      ];
      fixture.detectChanges();
      $breadcrumb = fixture.nativeElement.querySelector('p-breadcrumb');
    });

    it('should have items', () => {
      expect($breadcrumb).not.toBeNull();
    });
  });

  describe('Breadcrumb with home icon', () => {
    beforeEach(() => {
      component.home = { id: '1', icon: 'pi pi-home' };
      fixture.detectChanges();
      $breadcrumbHomeIcon = fixture.nativeElement.querySelector('p-breadcrumb .ui-breadcrumb-home');
    });

    it('should have home icon', () => {
      expect($breadcrumbHomeIcon).not.toBeNull();
    });
  });

  describe('Breadcrumb without home icon', () => {
    beforeEach(() => {
      component.home = null;
      fixture.detectChanges();
      $breadcrumbHomeIcon = fixture.nativeElement.querySelector('p-breadcrumb .ui-breadcrumb-home');
    });

    it('should not have home icon', () => {
      expect($breadcrumbHomeIcon).toBeNull();
    });
  });
});
