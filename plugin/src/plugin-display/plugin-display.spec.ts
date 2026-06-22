import {ComponentFixture, TestBed} from '@angular/core/testing';

import {provideZonelessChangeDetection} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {PluginDisplay} from './plugin-display';
import {registerDefaultPlugin} from 'xt-plugin-default';
import {XtResolverService} from 'xt-components';

describe('PluginDisplay', () => {
  let component: PluginDisplay;
  let fixture: ComponentFixture<PluginDisplay>;
  let resolverService: XtResolverService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PluginDisplay],
      providers: [provideZonelessChangeDetection(), provideAnimations()]
    })
      .compileComponents();

    resolverService=TestBed.inject(XtResolverService);
    registerDefaultPlugin(resolverService);
    fixture = TestBed.createComponent(PluginDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
