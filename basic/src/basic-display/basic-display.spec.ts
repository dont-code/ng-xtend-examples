import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDisplay } from './basic-display';
import {provideZonelessChangeDetection} from '@angular/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {registerDefaultPlugin} from 'xt-plugin-default';
import {XtResolverService} from 'xt-components';

describe('BasicDisplay', () => {
  let component: BasicDisplay;
  let fixture: ComponentFixture<BasicDisplay>;
  let resolverService: XtResolverService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicDisplay],
      providers: [provideZonelessChangeDetection(), provideAnimationsAsync()]
    })
    .compileComponents();

    resolverService=TestBed.inject(XtResolverService);
    registerDefaultPlugin(resolverService);
    fixture = TestBed.createComponent(BasicDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
