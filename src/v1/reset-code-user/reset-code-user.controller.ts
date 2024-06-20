import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { ResetCodeUserService } from './reset-code-user.service';
import { ResetCodeUserBody } from './dto/reset-code-user.dto';
import { ClientService } from '../client/client.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MailService } from '../mail/mail.service';

@Controller('reset-code-user')
@ApiTags('Reset Code User')
export class ResetCodeUserController {
  private readonly logger: Logger = new Logger();
  constructor(
    private readonly resetCodeUserService: ResetCodeUserService,
    private readonly clientService: ClientService,
    private readonly mailService: MailService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Reset de senha do usuário'
  })
  async createResetCode(@Body() data: ResetCodeUserBody): Promise<any> {
    try {
      const emailExists = await this.clientService.findByEmailUser(data.email);

      if (!emailExists) {
        throw new HttpException(
          'Usuário não encontrado',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      let code = this.resetCodeUserService.generateCode();

      while (await this.resetCodeUserService.existsCode(code)) {
        code = this.resetCodeUserService.generateCode();
      }

      const resetCode = await this.resetCodeUserService.createResetCode(
        emailExists.id,
        code,
      );

      return await this.mailService.sendEmailResetCodeMailTrap({
        from: {
          name: 'TransNex',
          email: 'miguel@transnex.online',
        },
        recipients: [{ email: emailExists.email }],
        template_uuid: 'b4d22fd9-8164-4bd1-b11e-7fbe5c47ba49',
        template_variables: {
          user_email: `${emailExists.email}`,
          code: `${resetCode}`,
        },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
