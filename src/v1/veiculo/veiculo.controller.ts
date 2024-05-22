import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VeiculoService } from './veiculo.service';
import { AuthEmpresaMiddleware } from 'src/middleware/auth.empresa.middleware';
import { Request } from 'express';
import { CreateVeiculoBody, UpdateVeiculoBody } from './dto/veiculo.dto';
import Veiculo from 'domain/entity/veiculo/Veiculo';
import { EmpresaService } from '../empresa/empresa.service';

@Controller('veiculo')
@ApiTags('Veiculo')
export class VeiculoController {
    private readonly logger: Logger = new Logger();
    constructor(private readonly veiculoService: VeiculoService,
        private readonly empresaService: EmpresaService
    ) {}

    @Get()
    @UseGuards(new AuthEmpresaMiddleware)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Listagem veículos da empresa'
    })
    async veiculoByEmpresa(@Req() req: Request): Promise<Veiculo[]> {
        try {
            const id = req.empresa.id

            return await this.veiculoService.veiculosByEmpresa(id);
        } catch (error) {
            this.logger.error(error.message);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    @UseGuards(new AuthEmpresaMiddleware)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Cadastro de Veiculos'
    })
    async createVeiculo(@Req() req: Request, @Body() data: CreateVeiculoBody): Promise<Veiculo> {
        try {
            const id = req.empresa.id

            const empresaExist = await this.empresaService.findByIdEmpresa(id);

            if (!empresaExist) {
                throw new HttpException(
                  'Usuário não encontrado',
                  HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }

            return await this.veiculoService.createVeiculo(id, {
                nome: data.nome,
                placa: data.placa,
                capacidade: data.capacidade,
                adaptavel: data.adaptavel
            })
        } catch (error) {
            this.logger.error(error.message);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

  @Patch('')
  @UseGuards(new AuthEmpresaMiddleware())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualizar detalhes da empresa pelo token'
  })
  async updateEmpresa(@Param('id') id: number, @Body() data: UpdateVeiculoBody, @Req() req: Request): Promise<Veiculo> {
    try {
      const userId = req.empresa.id;

      const empresaExist = await this.empresaService.findByIdEmpresa(userId);

      if (!empresaExist) {
        throw new HttpException(
          'Usuário não encontrado',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const updateVeiculoByEmpresa = await this.veiculoService.updateVeiculo(id, empresaExist.id, data)

      return updateVeiculoByEmpresa;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
