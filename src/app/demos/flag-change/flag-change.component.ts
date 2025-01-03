import { Component } from '@angular/core';
import { NgOptimizedImage, NgStyle } from '@angular/common';
import { BooleanFeatureFlagDirective } from '@openfeature/angular-sdk';
import { DelayedInMemoryProvider } from '../../test-provider';

const initialConfiguration = {
  isFeatureEnabled: {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
};

export const FLAG_CHANGE_PROVIDER_NAME = 'flag-change-provider';
export const FLAG_CHANGE_PROVIDER = new DelayedInMemoryProvider(
  initialConfiguration,
  2000
);

@Component({
  standalone: true,
  selector: 'app-context-change',
  templateUrl: './flag-change.component.html',
  imports: [NgOptimizedImage, NgStyle, BooleanFeatureFlagDirective],
  styleUrls: ['./flag-change.component.css'],
})
export class FlagChangeComponent {
  protected readonly FLAG_CHANGE_PROVIDER_NAME = FLAG_CHANGE_PROVIDER_NAME;

  private currentFlagVariant =
    initialConfiguration.isFeatureEnabled.defaultVariant;

  async toggleFlag(): Promise<void> {
    this.currentFlagVariant = this.currentFlagVariant === 'on' ? 'off' : 'on'

    await FLAG_CHANGE_PROVIDER.putConfiguration({
      ...initialConfiguration,
      isFeatureEnabled: {
        ...initialConfiguration.isFeatureEnabled,
        defaultVariant: this.currentFlagVariant,
      },
    });
  }
}
