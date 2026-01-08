import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDisplay } from './basic-display';
import {provideZonelessChangeDetection} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';

describe('BasicDisplay', () => {
  let component: BasicDisplay;
  let fixture: ComponentFixture<BasicDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicDisplay],
      providers: [provideZonelessChangeDetection(), provideAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
