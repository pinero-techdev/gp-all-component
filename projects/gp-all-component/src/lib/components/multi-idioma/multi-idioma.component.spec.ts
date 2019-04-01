import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiIdiomaComponent } from './multi-idioma.component';

describe('MultiIdiomaComponent', () => {
  let component: MultiIdiomaComponent;
  let fixture: ComponentFixture<MultiIdiomaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiIdiomaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiIdiomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
