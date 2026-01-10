import {ComponentFixture, TestBed} from '@angular/core/testing';

import {provideZonelessChangeDetection} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {InOutDisplay} from './in-out-display';

describe('InOutDisplay', () => {
  let component: InOutDisplay;
  let fixture: ComponentFixture<InOutDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InOutDisplay],
      providers: [provideZonelessChangeDetection(), provideAnimations()]
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
