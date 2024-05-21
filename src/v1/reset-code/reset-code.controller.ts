import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post } from '@nestjs/common';
import { ResetCodeService } from './reset-code.service';
import { ResetCodeBody } from './dto/reset-code.dto';
import { ClientService } from '../client/client.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('reset-code')
@ApiTags('Reset Code')
export class ResetCodeController {
  private readonly logger: Logger = new Logger();
  constructor(
    private readonly resetCodeService: ResetCodeService,
    private readonly clientService: ClientService
  ) {}

  @Post()
  async createResetCode(@Body() data: ResetCodeBody): Promise<any> {
    try {
      const emailExists = await this.clientService.findByEmailUser(data.email)

      if (!emailExists) {
        throw new HttpException(
          'Usuário não encontrado',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      let code = this.resetCodeService.generateCode();

      while (await this.resetCodeService.existsCode(code)) {
        code = this.resetCodeService.generateCode(); 
      }

      const resetCode = await this.resetCodeService.createResetCode(emailExists.id, code)

      return {
        code: resetCode
      }
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}