import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDisplay } from './dynamic-display';
import {provideZonelessChangeDetection} from '@angular/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {registerDefaultPlugin} from 'xt-plugin-default';
import {XtResolverService} from 'xt-components';
import {StoreTestBed} from 'xt-store';

describe('DynamicDisplay', () => {
  let component: DynamicDisplay;
  let fixture: ComponentFixture<DynamicDisplay>;
  let resolverService: XtResolverService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicDisplay],
      providers: [provideZonelessChangeDetection(), provideAnimationsAsync()]
    })
    .compileComponents();

    resolverService=TestBed.inject(XtResolverService);
    registerDefaultPlugin(resolverService);
    StoreTestBed.ensureMemoryProviderOnly();
    fixture = TestBed.createComponent(DynamicDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
