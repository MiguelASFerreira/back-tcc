import { Body, Controller, Post, Logger, HttpException, HttpStatus, Get, Req, UseGuards } from '@nestjs/common';
import Servico from 'domain/entity/servico/Servico';
import { ServicoService } from './servico.service';
import { CreateServicoBody } from './dto/servico.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthEmpresaMiddleware } from 'src/middleware/auth.empresa.middleware';

@Controller('servico')
@ApiTags('Serviço')
export class ServicoController {
  private readonly logger: Logger = new Logger();
  constructor(private readonly servicoService: ServicoService) {}

  @Get()
  @ApiOperation({
    summary: 'Traz todos os serviços'
  })
  async allServico(): Promise<Servico> {
    try {
      return await this.servicoService.allServico()
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/empresa')
  @UseGuards(new AuthEmpresaMiddleware)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Traz todos os serviços que empresa tem vinculo'
  })
  async servicoEmpresa(@Req() req: Request): Promise<any> {
    try {
      const id = req.empresa.id
      return await this.servicoService.servicoEmpresa(id)
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Criação do serviço'
  })
  async createServico(@Body() data: CreateServicoBody): Promise<Servico> {
    try {
        return await this.servicoService.createServico(data);
    } catch (error) {
        this.logger.error(error.message);
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
