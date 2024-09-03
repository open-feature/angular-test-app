import { EvaluationContext, InMemoryProvider } from '@openfeature/angular-sdk';

export class DelayedInMemoryProvider extends InMemoryProvider {
  constructor(
    flagConfiguration: ConstructorParameters<typeof InMemoryProvider>[0],
    private delay: number
  ) {
    super(flagConfiguration);
  }

  // artificially delay our init (delaying PROVIDER_READY event)
  async initialize(context?: EvaluationContext | undefined): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, this.delay));
  }

  // artificially delay our init (delaying PROVIDER_READY event)
  async onContextChange(context?: EvaluationContext | undefined): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, this.delay));
  }
}
