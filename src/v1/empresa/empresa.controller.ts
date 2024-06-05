import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { CreateEmpresaBody, FindAllContrato, UpdateEmpresaBody } from './dto/empresa.dto';
import Empresa from 'domain/entity/empresa/Empresa';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthEmpresaMiddleware } from 'src/middleware/auth.empresa.middleware';

@Controller('empresa')
@ApiTags('Empresa')
export class EmpresaController {
  private readonly logger: Logger = new Logger();
  constructor(private readonly empresaService: EmpresaService) {}

  @Get('')
  @UseGuards(new AuthEmpresaMiddleware())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Trazer detalhes da empresa pelo token'
  })
  async findById(@Req() req: Request): Promise<Empresa> {
    try {
      const id = req.empresa.id;

      const empresaExist = await this.empresaService.findByIdEmpresa(id);

      if (!empresaExist) {
        throw new HttpException(
          'Usuário não encontrado',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return empresaExist;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/contrato')
  @UseGuards(new AuthEmpresaMiddleware())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Trazer todos os contratos da empresa'
  })
  async findContratoEmpresa(@Req() req: Request, @Body() data?: FindAllContrato): Promise<any> {
    try {
      const id = req.empresa.id;
      return await this.empresaService.findContratoEmpresa(id, data.id_servico)
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Criar Empresa'
  })
  async createEmpresa(@Body() data: CreateEmpresaBody) {
    try {
      const emailExists = await this.empresaService.findByEmailEmpresa(
        data.email,
      );

      if (emailExists) {
        throw new HttpException(
          'Email já cadastrado',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return await this.empresaService.createEmpresa(data);
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
  async updateEmpresa(@Body() data: UpdateEmpresaBody, @Req() req: Request): Promise<Empresa> {
    try {
      const userId = req.empresa.id;

      const empresaExist = await this.empresaService.findByIdEmpresa(userId);

      if (!empresaExist) {
        throw new HttpException(
          'Usuário não encontrado',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const updateEmpresa = await this.empresaService.updateEmpresa(userId, data);

      return updateEmpresa;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
