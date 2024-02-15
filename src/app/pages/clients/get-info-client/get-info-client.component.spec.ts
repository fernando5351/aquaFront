import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetInfoClientComponent } from './get-info-client.component';

describe('GetInfoClientComponent', () => {
  let component: GetInfoClientComponent;
  let fixture: ComponentFixture<GetInfoClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetInfoClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetInfoClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
