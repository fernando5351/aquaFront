import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAmountComponent } from './get-amount.component';

describe('GetAmountComponent', () => {
  let component: GetAmountComponent;
  let fixture: ComponentFixture<GetAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAmountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
