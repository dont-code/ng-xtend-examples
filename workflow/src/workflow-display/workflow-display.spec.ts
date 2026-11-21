import {provideZonelessChangeDetection} from '@angular/core';
import {provideHttpClient} from '@angular/common/http';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {XtResolverService} from 'xt-components';
import {registerDefaultPlugin} from 'xt-plugin-default';
import {StoreTestBed} from 'xt-store';
import {registerBookCardsWorkflow} from '../custom-workflow/register';
import {WorkflowDisplay} from './workflow-display';

describe('WorkflowDisplay', () => {
  let fixture: ComponentFixture<WorkflowDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowDisplay],
      providers: [
        provideZonelessChangeDetection(),
        provideAnimationsAsync(),
        provideHttpClient()
      ]
    }).compileComponents();

    const resolver = TestBed.inject(XtResolverService);
    registerDefaultPlugin(resolver);
    registerBookCardsWorkflow(resolver);
    resolver.registerTypes({
      'Example Book': {
        bookName: 'string',
        author: 'string',
        read: 'boolean'
      }
    });
    StoreTestBed.ensureMemoryProviderOnly();

    fixture = TestBed.createComponent(WorkflowDisplay);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the statically registered workflow', () => {
    expect(fixture.nativeElement.querySelector('wfw-book-cards')).toBeTruthy();
  });
});
