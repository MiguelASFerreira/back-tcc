import { Body, Controller, HttpException, HttpStatus, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResetCodeEmpresaService } from './reset-code-empresa.service';
import { EmpresaService } from '../empresa/empresa.service';
import { MailService } from '../mail/mail.service';
import { ResetCodeEmpresaBody } from './dto/reset-code-empresa';

@Controller('reset-code-empresa')
@ApiTags('Reset Code Empresa')
export class ResetCodeEmpresaController {
    private readonly logger: Logger = new Logger();
    constructor(
        private readonly resetCodeEmpresaService: ResetCodeEmpresaService,
        private readonly empresaService: EmpresaService,
        private readonly mailService: MailService,
      ) {}

      @Post()
  @ApiOperation({
    summary: 'Reset de senha da empresa'
  })
  async createResetCode(@Body() data: ResetCodeEmpresaBody): Promise<any> {
    try {
      const emailExists = await this.empresaService.findByEmailEmpresa(data.email);

      if (!emailExists) {
        throw new HttpException(
          'Empresa não encontrado',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      let code = this.resetCodeEmpresaService.generateCode();

      while (await this.resetCodeEmpresaService.existsCode(code)) {
        code = this.resetCodeEmpresaService.generateCode();
      }

      const resetCode = await this.resetCodeEmpresaService.createResetCode(
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
