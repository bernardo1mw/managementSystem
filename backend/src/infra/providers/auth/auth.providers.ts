import { SignupCommand } from 'src/app/commands/auth/signup.command';
import { RepositoryProviderEnum } from '../repository/repository.providers';
import UserRepository from 'src/domain/repository/user.repository';
import { Provider } from '@nestjs/common';
import { SigninCommand } from 'src/app/commands/auth/signin.command';
import { TokenManager } from 'src/domain/contracts/token.contract';
import { SharedProviderEnum } from '../shared/shared.providers';
import { VerifyCommand } from 'src/app/commands/auth/verify.command';

export enum AuthProviderEnum {
  LoginCommand = 'LoginCommand',
  SignupCommand = 'SignupCommand',
  VerifyCommand = 'VerifyCommand',
}

const signinCommandProvider = {
  provide: AuthProviderEnum.LoginCommand,
  useFactory: (userRepository: UserRepository, tokenManager: TokenManager) => {
    return new SigninCommand(userRepository, tokenManager);
  },
  inject: [
    RepositoryProviderEnum.UserRepository,
    SharedProviderEnum.TokenManager,
  ],
};

const signupCommandProvider = {
  provide: AuthProviderEnum.SignupCommand,
  useFactory: (userRepository: UserRepository) => {
    return new SignupCommand(userRepository);
  },
  inject: [RepositoryProviderEnum.UserRepository],
};

const verifyCommandProvider = {
  provide: AuthProviderEnum.VerifyCommand,
  useFactory: (userRepository: UserRepository) => {
    return new VerifyCommand(userRepository);
  },
  inject: [RepositoryProviderEnum.UserRepository],
};

export const authProviders: Provider[] = [
  signinCommandProvider,
  signupCommandProvider,
  verifyCommandProvider,
];
