import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ContratoService } from './contrato.service';
import { CreateContratoBody } from './dto/contrato.dto';
import Contrato from 'domain/entity/contrato/Contrato';
import { Request } from 'express';
import { AuthUserMiddleware } from 'src/middleware/auth.user.middleware';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('contrato')
@ApiTags('Contrato')
export class ContratoController {
  private readonly logger: Logger = new Logger();
  constructor(private readonly contratoService: ContratoService) {}

  @Get()
  @UseGuards(new AuthUserMiddleware())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Trazer todos os contratos do usuário'
  })
  async findContratoUser(@Req() req: Request): Promise<Contrato> {
    try {
      const userId = req.user.id;
      return await this.contratoService.findContratoUser(userId);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @UseGuards(new AuthUserMiddleware())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Criação do contrato'
  })
  async createContrato(
    @Req() req: Request,
    @Body() data: CreateContratoBody,
  ): Promise<Contrato> {
    try {
      const userId = req.user.id;
      return await this.contratoService.createContrato(userId, data);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
