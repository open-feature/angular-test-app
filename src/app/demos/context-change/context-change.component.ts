// src/app/demos/context-change/context-change.component.ts
import { Component } from '@angular/core';
import { OpenFeature } from '@openfeature/web-sdk';
import { NgOptimizedImage, NgStyle } from '@angular/common';
import { BooleanFeatureFlagDirective } from '@openfeature/angular-sdk';

export const CONTEXT_CHANGE_PROVIDER_NAME = 'context-change-provider';
export const CONTEXT_CHANGE_CONTEXT_KEY = 'silly';

@Component({
  standalone: true,
  selector: 'app-context-change',
  templateUrl: './context-change.component.html',
  imports: [NgOptimizedImage, NgStyle, BooleanFeatureFlagDirective],
  styleUrls: ['./context-change.component.css'],
})
export class ContextChangeComponent {
  toggleContext(): void {
    const currentContext = OpenFeature.getContext(CONTEXT_CHANGE_PROVIDER_NAME);
    OpenFeature.setContext(CONTEXT_CHANGE_PROVIDER_NAME, {
      [CONTEXT_CHANGE_CONTEXT_KEY]: !currentContext[CONTEXT_CHANGE_CONTEXT_KEY],
    }).then();
  }

  protected readonly CONTEXT_CHANGE_PROVIDER_NAME = CONTEXT_CHANGE_PROVIDER_NAME;
}
