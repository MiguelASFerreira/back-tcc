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
  Delete,
  Patch,
  Param
} from '@nestjs/common';
import { ServicoOfertaService } from './servico_oferta.service';
import {
  CreateServicoOfertaBody,
  DeleteServicoOferta,
  FilterServicoOfertaQuery,
  ServicoExists,
  UpdateServicoOferta,
} from './dto/servico_oferta.dto';
import { Request } from 'express';
import { ServicoOferta } from 'domain/entity/servico_oferta/ServicoOferta';
import { AuthEmpresaMiddleware } from 'src/middleware/auth.empresa.middleware';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ServicoService } from '../servico/servico.service';

@Controller('servico-oferta')
@ApiTags('Seviço Oferta')
export class ServicoOfertaController {
  private readonly logger: Logger = new Logger();
  constructor(
    private readonly servicoOfertaService: ServicoOfertaService,
    private readonly servicoService: ServicoService,
  ) {}

  @Get('')
  @ApiOperation({
    summary: 'Filtros de serviço oferta',
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
    summary: 'Criação do servico oferta',
  })
  async createServicoOferta(
    @Body() data: CreateServicoOfertaBody,
    @Req() req: Request,
  ): Promise<ServicoOferta> {
    try {
      const idEmpresa = req.empresa.id;
      const servicoExists: ServicoExists[] = await this.servicoService.servicoEmpresa(idEmpresa);

      const servicoJaCadastrado = servicoExists.some((servico) => {
        return (
          servico.id_servico === data.id_servico &&
          servico.id_empresa === idEmpresa
        );
      });

      if (servicoJaCadastrado) {
        throw new HttpException('Este serviço já está cadastrado para esta empresa', 400);
      } else {
        return await this.servicoOfertaService.createServicoOferta(
          idEmpresa,
          data,
        );
      }
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch('/empresa')
  @UseGuards(new AuthEmpresaMiddleware())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualizar servico oferta',
  })
  async updateServicoOfertaEmpresa(@Req() req: Request, @Body() body: UpdateServicoOferta): Promise<any> {
    try {
      const idEmpresa = req.empresa.id;
      return await this.servicoOfertaService.updateServicoOfertaEmpresa(body.valor, idEmpresa, body.id_servico)
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/empresa/:id_servico')
  @UseGuards(new AuthEmpresaMiddleware())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deletar servico oferta',
  })
  async deleteServicoOfertaEmpresa(@Req() req: Request, @Param('id_servico') id_servico: number): Promise<any> {
    try {
      const idEmpresa = req.empresa.id;
      return await this.servicoOfertaService.deleteServicoOfertaEmpresa(idEmpresa, id_servico)   
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
