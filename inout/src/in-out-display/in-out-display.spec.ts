import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InOutDisplay } from './in-out-display';

describe('InOutDisplay', () => {
  let component: InOutDisplay;
  let fixture: ComponentFixture<InOutDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InOutDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InOutDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
