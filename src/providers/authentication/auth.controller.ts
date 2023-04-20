import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'johndoe@teste.com'
        },
        password: {
          type: 'string',
          example: '123456'
        }
      }
    }
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginData: LoginDto) {
    return this.authService.signIn(loginData.email, loginData.password);
  }
}