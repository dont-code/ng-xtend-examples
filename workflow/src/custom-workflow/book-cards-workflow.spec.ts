import {provideZonelessChangeDetection} from '@angular/core';
import {provideHttpClient} from '@angular/common/http';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {XtResolverService} from 'xt-components';
import {registerDefaultPlugin} from 'xt-plugin-default';
import {StoreTestBed} from 'xt-store';
import {BookCardsWorkflow} from './book-cards-workflow';
import {BOOK_CARDS_WORKFLOW} from './register';

describe('BookCardsWorkflow', () => {
  let fixture: ComponentFixture<BookCardsWorkflow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCardsWorkflow],
      providers: [
        provideZonelessChangeDetection(),
        provideAnimationsAsync(),
        provideHttpClient()
      ]
    }).compileComponents();

    const resolver = TestBed.inject(XtResolverService);
    registerDefaultPlugin(resolver);
    resolver.registerTypes({
      'Example Book': {
        bookName: 'string',
        author: 'string',
        read: 'boolean'
      }
    });
    StoreTestBed.ensureMemoryProviderOnly();

    fixture = TestBed.createComponent(BookCardsWorkflow);
    fixture.componentRef.setInput('config', {
      entity: 'Example Book',
      workflow: BOOK_CARDS_WORKFLOW
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display the workflow toolbar', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('input[type="search"]')).toBeTruthy();
  });
});
