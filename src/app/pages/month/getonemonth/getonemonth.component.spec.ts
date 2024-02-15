import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetonemonthComponent } from './getonemonth.component';

describe('GetonemonthComponent', () => {
  let component: GetonemonthComponent;
  let fixture: ComponentFixture<GetonemonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetonemonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetonemonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
