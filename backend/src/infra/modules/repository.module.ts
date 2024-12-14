import { Global, Module } from '@nestjs/common';
import { sharedProviders } from '../providers/shared/shared.providers';
import { repositoryProviders } from '../providers/repository/repository.providers';

@Global()
@Module({
  providers: repositoryProviders,
  exports: repositoryProviders,
})
export class RepositoryModule {}
