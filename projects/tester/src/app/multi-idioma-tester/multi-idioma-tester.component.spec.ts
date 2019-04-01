import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiIdiomaTesterComponent } from './multi-idioma-tester.component';
import { GpAllComponentModule } from 'gp-all-component/gp-all-component.module';

describe('MultiIdiomaTesterComponent', () => {
  let component: MultiIdiomaTesterComponent;
  let fixture: ComponentFixture<MultiIdiomaTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiIdiomaTesterComponent ],
      imports: [GpAllComponentModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiIdiomaTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});