import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypedDisplay } from './typed-display';

describe('TypedDisplay', () => {
  let component: TypedDisplay;
  let fixture: ComponentFixture<TypedDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypedDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypedDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
