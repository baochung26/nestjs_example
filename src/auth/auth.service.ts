import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials';
import { UserRepository } from './user-repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const username = await this.userRepository.login(authCredentialsDto);
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}