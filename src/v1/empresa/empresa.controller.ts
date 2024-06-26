import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import {
  CreateEmpresaBody,
  EsqueciSenhaBody,
  FindAllContrato,
  UpdateEmpresaBody,
  UploadImageEmpresa,
} from './dto/empresa.dto';
import Empresa from 'domain/entity/empresa/Empresa';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthEmpresaMiddleware } from 'src/middleware/auth.empresa.middleware';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('empresa')
@ApiTags('Empresa')
export class EmpresaController {
  private readonly logger: Logger = new Logger();
  constructor(
    private readonly empresaService: EmpresaService) {}

  @Get('')
  @UseGuards(new AuthEmpresaMiddleware())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Trazer detalhes da empresa pelo token',
  })
  async findByIdEmpresa(@Req() req: Request): Promise<Empresa> {
    try {
      const id = req.empresa.id;

      const empresaExist = await this.empresaService.findByIdEmpresa(id);

      if (!empresaExist) {
        throw new HttpException(
          'Empresa não encontrada',
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
    summary: 'Trazer todos os contratos da empresa',
  })
  async findContratoEmpresa(
    @Req() req: Request,
    @Body() data?: FindAllContrato,
  ): Promise<any> {
    try {
      const id = req.empresa.id;
      return await this.empresaService.findContratoEmpresa(id, data.id_servico);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Criar Empresa',
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

  @Post('/reset-password/:code')
  @ApiOperation({
    summary: 'Rota de reset de senha da empresa',
  })
  async esqueciSenha(
    @Param('code') code: number,
    @Body() data: EsqueciSenhaBody,
  ): Promise<any> {
    try {
      const compareCode = await this.empresaService.compareCode(code);

      if (!compareCode) {
        throw new HttpException(
          'Codigo inválido',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const updatePassword = await this.empresaService.esqueciSenha(
        compareCode.id_empresa,
        data.novaSenha,
      );

      return {
        code: HttpStatus.OK,
        message: updatePassword,
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch('')
  @UseGuards(new AuthEmpresaMiddleware())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualizar detalhes da empresa pelo token',
  })
  async updateEmpresa(
    @Body() data: UpdateEmpresaBody,
    @Req() req: Request,
  ): Promise<Empresa> {
    try {
      const userId = req.empresa.id;

      const empresaExist = await this.empresaService.findByIdEmpresa(userId);

      if (!empresaExist) {
        throw new HttpException(
          'Empresa não encontrada',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const updateEmpresa = await this.empresaService.updateEmpresa(
        userId,
        data,
      );

      return updateEmpresa;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/contrato/:id_client')
  @UseGuards(new AuthEmpresaMiddleware())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Finalizar contrato com cliente',
  })
  async finalContrato(
    @Param('id_client') id_client: number,
    @Req() req: Request,
  ): Promise<any> {
    try {
      const id = req.empresa.id;

      const empresaExist = await this.empresaService.findByIdEmpresa(id);

      if (!empresaExist) {
        throw new HttpException(
          'Empresa não encontrada',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const finalizarContrato = await this.empresaService.finalContrato(
        id,
        id_client,
      );

      return finalizarContrato;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/upload/image')
  @UseGuards(new AuthEmpresaMiddleware())
  @ApiOperation({ summary: 'Cadastrar imagem' })
  async addImageEmpresa(
    @Body() body: UploadImageEmpresa,
    @Req() req: Request,
  ): Promise<any> {
    try {
      const id = req.empresa.id;
      const empresaExist = await this.empresaService.findByIdEmpresa(id);

      if (!empresaExist) {
        throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);
      }

      await this.empresaService.addImageEmpresa(id, body.image_url);

      return { message: 'Imagem salva com sucesso', path: body.image_url };
    } catch (error) {
      console.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
