import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GpAllComponentModule } from 'gp-all-component/gp-all-component.module';
import { MenuTesterComponent } from './menu-tester.component';

describe('MenuTesterComponent', () => {
  let component: MenuTesterComponent;
  let fixture: ComponentFixture<MenuTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuTesterComponent ],
      imports: [GpAllComponentModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
