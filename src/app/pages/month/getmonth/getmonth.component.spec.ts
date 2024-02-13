import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetmonthComponent } from './getmonth.component';

describe('GetmonthComponent', () => {
  let component: GetmonthComponent;
  let fixture: ComponentFixture<GetmonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetmonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetmonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
