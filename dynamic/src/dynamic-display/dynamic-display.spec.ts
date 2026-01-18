import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDisplay } from './dynamic-display';
import {provideZonelessChangeDetection} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';

describe('DynamicDisplay', () => {
  let component: DynamicDisplay;
  let fixture: ComponentFixture<DynamicDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicDisplay],
      providers: [provideZonelessChangeDetection(), provideAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
