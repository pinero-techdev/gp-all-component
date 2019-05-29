import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuTesterComponent } from './main-menu-tester.component';

describe('MainMenuTesterComponent', () => {
  let component: MainMenuTesterComponent;
  let fixture: ComponentFixture<MainMenuTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainMenuTesterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
