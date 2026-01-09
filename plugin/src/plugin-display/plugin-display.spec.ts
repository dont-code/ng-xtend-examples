import {ComponentFixture, TestBed} from '@angular/core/testing';

import {provideZonelessChangeDetection} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {PluginDisplay} from './plugin-display';

describe('PluginDisplay', () => {
  let component: PluginDisplay;
  let fixture: ComponentFixture<PluginDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PluginDisplay],
      providers: [provideZonelessChangeDetection(), provideAnimations()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PluginDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
