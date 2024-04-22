import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  private readonly logger: Logger = new Logger();
  constructor(private readonly authService: AuthService) {}

  @Post('/client')
  async signInClient(@Body() data: AuthDTO) {
    try {
      const user = await this.authService.findByEmailUser(data.email);

      if (!user) {
        throw new HttpException(
          'Usuário não encontrado',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new HttpException(
          'Usuário não encontrado',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const SECRET_KEY = process.env.SECRET_KEY;

      if (!SECRET_KEY) {
        throw new Error('Chave secreta não fornecida!');
      }

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        SECRET_KEY,
        {
          algorithm: 'HS256',
          expiresIn: '1h',
        },
      );

      return {
        token: token,
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
