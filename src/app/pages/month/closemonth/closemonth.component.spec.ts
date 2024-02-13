import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosemonthComponent } from './closemonth.component';

describe('ClosemonthComponent', () => {
  let component: ClosemonthComponent;
  let fixture: ComponentFixture<ClosemonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosemonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClosemonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
