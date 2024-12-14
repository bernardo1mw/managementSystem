import { Global, Module } from '@nestjs/common';
import { sharedProviders } from '../providers/shared/shared.providers';

@Global()
@Module({
  providers: sharedProviders,
  exports: sharedProviders,
})
export class SharedModule {}
