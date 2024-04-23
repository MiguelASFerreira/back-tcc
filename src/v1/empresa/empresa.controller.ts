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
import { EmpresaService } from './empresa.service';
import { CreateEmpresaBody } from './dto/empresa.dto';
import Empresa from 'domain/entity/empresa/Empresa';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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

  @Post()
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
}
