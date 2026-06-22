import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDisplay } from './store-display';
import {provideZonelessChangeDetection} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {registerDefaultPlugin} from 'xt-plugin-default';
import {XtResolverService} from 'xt-components';
import {StoreTestBed} from 'xt-store';

describe('StoreDisplay', () => {
  let component: StoreDisplay;
  let fixture: ComponentFixture<StoreDisplay>;
  let resolverService: XtResolverService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreDisplay],
      providers: [provideZonelessChangeDetection(), provideAnimations()]
    })
    .compileComponents();

    resolverService=TestBed.inject(XtResolverService);
    registerDefaultPlugin(resolverService);
    StoreTestBed.ensureMemoryProviderOnly();
    fixture = TestBed.createComponent(StoreDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
