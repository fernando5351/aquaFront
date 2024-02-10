import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAmountComponent } from './create-amount.component';

describe('CreateAmountComponent', () => {
  let component: CreateAmountComponent;
  let fixture: ComponentFixture<CreateAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAmountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
