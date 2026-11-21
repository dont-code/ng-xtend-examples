import {ComponentFixture, TestBed} from '@angular/core/testing';

import {provideZonelessChangeDetection} from '@angular/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {InOutDisplay} from './in-out-display';
import {registerDefaultPlugin} from 'xt-plugin-default';
import {XtResolverService} from 'xt-components';

describe('InOutDisplay', () => {
  let component: InOutDisplay;
  let fixture: ComponentFixture<InOutDisplay>;
  let resolverService: XtResolverService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InOutDisplay],
      providers: [provideZonelessChangeDetection(), provideAnimationsAsync()]
    })
      .compileComponents();

    resolverService=TestBed.inject(XtResolverService);
    registerDefaultPlugin(resolverService);
    fixture = TestBed.createComponent(InOutDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
