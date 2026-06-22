import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedTypeDisplay } from './advanced-type-display';
import {provideZonelessChangeDetection} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {registerDefaultPlugin} from 'xt-plugin-default';
import {XtResolverService} from 'xt-components';
import {StoreTestBed} from 'xt-store';

describe('AdvancedTypeDisplay', () => {
  let component: AdvancedTypeDisplay;
  let fixture: ComponentFixture<AdvancedTypeDisplay>;
  let resolverService: XtResolverService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedTypeDisplay],
      providers: [provideZonelessChangeDetection(), provideAnimations()]
    })
    .compileComponents();

    resolverService=TestBed.inject(XtResolverService);
    registerDefaultPlugin(resolverService);
    StoreTestBed.ensureMemoryProviderOnly();
    fixture = TestBed.createComponent(AdvancedTypeDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
