import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let $menu: HTMLDivElement;
  let $menuToggleIcon: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuComponent],
      imports: [PanelMenuModule, RouterTestingModule, BrowserAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Status expanded', () => {
    beforeEach(() => {
      component.isExpanded = true;
      fixture.detectChanges();
      $menu = fixture.nativeElement.querySelector('p-panelmenu');
    });

    it('should be expanded', () => {
      expect($menu).toHaveClass('menu-expanded');
    });
  });

  describe('Status collapsed', () => {
    beforeEach(() => {
      component.isExpanded = false;
      fixture.detectChanges();
      $menu = fixture.nativeElement.querySelector('p-panelmenu');
    });

    it('should be collapsed', () => {
      expect($menu).toHaveClass('menu-collapsed');
    });
  });

  describe('Menu with items', () => {
    beforeEach(() => {
      component.items = [
        {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: '/components',
          title: 'Home',
        },
        {
          label: 'Gestión de propiedades',
          icon: 'pi pi-key',
          title: 'Gestión de propiedades',
          items: [
            {
              label: 'Tipo de propiedades',
              url: 'navigate_to_tipopropiedades',
              title: 'Tipo de propiedades',
            },
          ],
        },
      ];
      fixture.detectChanges();
      $menu = fixture.nativeElement.querySelector('p-panelmenu');
    });

    it('should have items', () => {
      expect($menu).not.toBeNull();
    });
  });

  describe('on menu toggle', () => {
    beforeEach(() => {
      $menuToggleIcon = fixture.nativeElement.querySelector('.toggle-icon');
    });

    it('should be toggled', () => {
      expect(component.isExpanded).toBeTruthy();
      spyOn(component, 'toggleMenu').and.callThrough();
      $menuToggleIcon.click();
      expect(component.toggleMenu).toHaveBeenCalled();
      expect(component.isExpanded).not.toBeTruthy();
    });
  });
});
