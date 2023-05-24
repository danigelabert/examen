import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlocsdanigelabertComponent } from './llocsdanigelabert.component';

describe('LlocsdanigelabertComponent', () => {
  let component: LlocsdanigelabertComponent;
  let fixture: ComponentFixture<LlocsdanigelabertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LlocsdanigelabertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LlocsdanigelabertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
