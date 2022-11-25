import { HighlightDirective } from './highlight.directive';
import { ElementRef } from '@angular/core';
import { inject } from '@angular/core/testing';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    inject([ElementRef], (elementRef: ElementRef) => {
      const directive = new HighlightDirective(elementRef);
      expect(directive).toBeTruthy();
    });
  });
});
