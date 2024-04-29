import {
  Body,
  Controller,
  Post,
  Req,
  Logger,
  HttpException,
  HttpStatus,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { ServicoOfertaService } from './servico_oferta.service';
import { CreateServicoOfertaBody, FilterServicoOfertaQuery } from './dto/servico_oferta.dto';
import { Request } from 'express';
import {ServicoOferta} from 'domain/entity/servico_oferta/ServicoOferta';
import { AuthEmpresaMiddleware } from 'src/middleware/auth.empresa.middleware';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('servico-oferta')
@ApiTags('Seviço Oferta')
export class ServicoOfertaController {
  private readonly logger: Logger = new Logger();
  constructor(private readonly servicoOfertaService: ServicoOfertaService) {}

  @Get('')
  @ApiOperation({
    summary: 'Filtros de serviço oferta'
  })
  async filterServicoOferta(@Query() query: FilterServicoOfertaQuery) {
    try {
      return await this.servicoOfertaService.filterServicoOferta(query);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('')
  @UseGuards(new AuthEmpresaMiddleware())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Criação do servico oferta'
  })
  async createServicoOferta(
    @Body() data: CreateServicoOfertaBody,
    @Req() req: Request,
  ): Promise<ServicoOferta> {
    try {
        const idEmpresa = req.empresa.id;
        return await this.servicoOfertaService.createServicoOferta(idEmpresa, data)
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
