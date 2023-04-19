import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.getByEmail(email);
    if(!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return {
      access_token: await this.jwtService.signAsync({ sub: user._id }),
    };
  }
}
