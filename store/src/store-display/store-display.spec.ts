import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDisplay } from './store-display';

describe('StoreDisplay', () => {
  let component: StoreDisplay;
  let fixture: ComponentFixture<StoreDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
