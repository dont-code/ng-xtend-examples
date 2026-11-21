import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection} from '@angular/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {TypedDisplay} from './typed-display';
import {registerDefaultPlugin} from 'xt-plugin-default';
import {XtResolverService} from 'xt-components';

describe('TypedDisplay', () => {
  let component: TypedDisplay;
  let fixture: ComponentFixture<TypedDisplay>;
  let resolverService: XtResolverService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypedDisplay],
      providers: [provideZonelessChangeDetection(), provideAnimationsAsync()]
    })
      .compileComponents();

    resolverService=TestBed.inject(XtResolverService);
    registerDefaultPlugin(resolverService);
    fixture = TestBed.createComponent(TypedDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
