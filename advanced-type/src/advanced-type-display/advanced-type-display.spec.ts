import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedTypeDisplay } from './advanced-type-display';

describe('AdvancedTypeDisplay', () => {
  let component: AdvancedTypeDisplay;
  let fixture: ComponentFixture<AdvancedTypeDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedTypeDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedTypeDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
