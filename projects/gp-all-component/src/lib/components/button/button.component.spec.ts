import { RouterTestingModule } from '@angular/router/testing';
import { ButtonType, ButtonSeverity } from '../../resources/constants/button.enum';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let $button: HTMLButtonElement;
  let $splitButton: HTMLDivElement;
  const textLabel = 'text label';
  const iconClassName = 'pi pi-save';
  const iconClassSelector = '.pi.pi-save';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent],
      imports: [ButtonModule, SplitButtonModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Basic Type', () => {
    beforeEach(() => {
      component.type = ButtonType.Basic;
      component.label = textLabel;
      fixture.detectChanges();
      $button = fixture.nativeElement.querySelector('button');
    });

    it('should create', () => {
      expect($button).toBeTruthy();
    });

    it('should have a label', () => {
      const $span = $button.querySelector('span');
      expect($span.innerText).toEqual(component.label);
    });

    it('should have a click event', () => {
      component.type = ButtonType.Basic;
      $button = fixture.nativeElement.querySelector('button');
      spyOn(component, 'onClick').and.callThrough();
      $button.click();
      expect(component.onClick).toHaveBeenCalled();
    });
  });

  describe('Only Icon Type', () => {
    beforeEach(() => {
      component.type = ButtonType.Icon;
      component.icon = iconClassName;
      fixture.detectChanges();
      $button = fixture.nativeElement.querySelector('button');
    });

    it('should create', () => {
      expect($button).toBeTruthy();
    });

    it('should be icon type', () => {
      expect($button.classList.contains('p-button-text-empty')).toBeTruthy();
    });

    it('should have an icon', () => {
      const $spanIcon = fixture.nativeElement.querySelector(iconClassSelector);
      expect($spanIcon).toBeTruthy();
    });
  });

  describe('Text and Icon Type', () => {
    beforeEach(() => {
      component.type = ButtonType.TextIcon;
      component.icon = iconClassName;
      component.label = textLabel;
      fixture.detectChanges();
      $button = fixture.nativeElement.querySelector('button');
    });

    it('should create', () => {
      expect($button).toBeTruthy();
    });

    it('should be texticon type', () => {
      expect($button.classList.contains('p-button')).toBeTruthy();
    });

    it('should have an icon', () => {
      const $spanIcon = fixture.nativeElement.querySelector(iconClassSelector);
      expect($spanIcon).toBeTruthy();
    });

    it('should have a label', () => {
      const $span = $button.querySelector(iconClassSelector);
      expect($span.innerHTML).toEqual(component.label);
    });
  });

  describe('Splitbutton Type', () => {
    let $splitButtonMenuButton: HTMLButtonElement;
    const itemId = '1';

    beforeEach(() => {
      component.type = ButtonType.Split;
      component.icon = iconClassName;
      component.label = textLabel;
      component.items = [
        {
          id: itemId,
          label: textLabel,
          icon: iconClassName,
          command: () => {
            this.update('info');
          },
        },
      ];
      fixture.detectChanges();
      $splitButtonMenuButton = fixture.nativeElement.querySelector('.p-splitbutton-menubutton');
      $splitButton = fixture.nativeElement.querySelector('.p-splitbutton');
      component.ngOnInit();
    });

    it('should create', () => {
      expect($splitButton).toBeTruthy();
    });

    it('should be splitbutton type', () => {
      expect($splitButton.classList.contains('p-splitbutton')).toBeTruthy();
    });

    it('should have a label', () => {
      const $spanText = $splitButton.querySelector('.p-button-text');
      expect($spanText.innerHTML).toEqual(component.label);
    });

    it('should have an icon', () => {
      const $spanIcon = fixture.nativeElement.querySelector(iconClassSelector);
      expect($spanIcon).toBeTruthy();
    });

    it('should not have a severity class', () => {
      component.severity = ButtonSeverity.Primary;
      component.ngOnInit();
      fixture.detectChanges();
      expect($splitButton.classList.contains('p-button-danger')).not.toBeTruthy();
      expect($splitButton.classList.contains('p-button-secondary')).not.toBeTruthy();
    });

    it('should have a danger severity class', () => {
      component.severity = ButtonSeverity.Danger;
      component.ngOnInit();
      fixture.detectChanges();
      expect($splitButton.classList.contains('p-button-danger')).toBeTruthy();
    });

    it('should have a secondary severity class', () => {
      component.severity = ButtonSeverity.Secondary;
      component.ngOnInit();
      fixture.detectChanges();
      expect($splitButton.classList.contains('p-button-secondary')).toBeTruthy();
    });

    it('should have at least one item option', () => {
      expect(component.splitItems).toBeTruthy();
    });

    it('every item option should have a label', () => {
      component.splitItems.forEach((item) => {
        expect(item.label).toMatch(component.label);
      });
    });

    it('every item option should have an icon', () => {
      component.splitItems.forEach((item) => {
        expect(item.icon).toMatch(component.icon);
      });
    });

    it('every item option should have a function', () => {
      component.splitItems.forEach((item) => {
        expect(item.command).toBeTruthy();
      });
    });

    it('should have a click event', () => {
      component.type = ButtonType.Split;
      spyOn(component, 'onClick').and.callThrough();
      $splitButtonMenuButton.click();
      expect(component.onClick).toHaveBeenCalled();
    });
  });
});
