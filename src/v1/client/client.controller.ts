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
import Client from 'domain/entity/client/Client';
import { ClientService } from './client.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateClientBody, EsqueciSenhaBody, UpdateClientBody } from './dto/client.dto';
import { Request } from 'express';
import { AuthUserMiddleware } from 'src/middleware/auth.user.middleware';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import * as fs from 'fs';

@Controller('client')
@ApiTags('Cliente')
export class ClientController {
  private readonly logger: Logger = new Logger();
  constructor(private readonly clientService: ClientService) {}

  @Get('')
  @UseGuards(new AuthUserMiddleware())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Trazer detalhes do usuário pelo token'
  })
  async findByIdUser(@Req() req: Request): Promise<Client> {
    try {
      const id = req.user.id;
      
      const userExist = await this.clientService.findByIdUser(id);

      if (!userExist) {
        throw new HttpException(
          'Usuário não encontrado',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return userExist;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Criação do usuário'
  })
  async createClient(@Body() data: CreateClientBody): Promise<Client> {
    try {
      const emailExists = await this.clientService.findByEmailUser(data.email);

      if (emailExists) {
        throw new HttpException(
          'Email já cadastrado',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return await this.clientService.createClient(data);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/reset-password/:code')
  @ApiOperation({
    summary: 'Rota de reset de senha do usuário'
  })
  async esqueciSenha(@Param('code') code: number, @Body() data: EsqueciSenhaBody): Promise<any> {
    try {
      const compareCode = await this.clientService.compareCode(code);

      if (!compareCode) {
        throw new HttpException(
          'Codigo inválido',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      
      const updatePassword = await this.clientService.esqueciSenha(compareCode.id_client, data.novaSenha)

      return {
        code: HttpStatus.OK,
        message: updatePassword
      }
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch()
  @UseGuards(new AuthUserMiddleware())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualizar detalhes do usuário pelo token'
  })
  async updateClient(@Body() data: UpdateClientBody, @Req() req: Request) {
    try {
      const userId = req.user.id;

      const userExist = await this.clientService.findByIdUser(userId);

      if (!userExist) {
        throw new HttpException(
          'Usuário não encontrado',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const updateClient = await this.clientService.updateClient(userId, data)

      return updateClient;

    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/contrato/:id_empresa')
  @UseGuards(new AuthUserMiddleware())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Finalizar contrato com cliente',
  })
  async finalContrato(
    @Param('id_empresa') id_empresa: number,
    @Req() req: Request,
  ): Promise<any> {
    try {
      const userId = req.user.id;

      const userExist = await this.clientService.findByIdUser(userId);

      if (!userExist) {
        throw new HttpException(
          'Usuário não encontrado',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const finalizarContrato = await this.clientService.finalContrato(
        id_empresa,
        userId
      );

      return finalizarContrato;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/upload/image')
  @UseGuards(new AuthUserMiddleware())
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: { type: 'file', title: 'image para upload', required: ['true'] },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/uploads',
        filename(req, file, callback) {
          const type = file.mimetype.replace('image/', '');
          const fileName =
            new Date().getTime() + btoa(file.originalname) + '.' + type;
          callback(null, fileName);
        },
      }),
    }),
  )
  @ApiOperation({
    summary: 'Cadastrar imagem',
  })
  async addImageEmpresa(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ): Promise<any> {
    try {
      const userId = req.user.id;
      const imagePath = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;

      const userExist = await this.clientService.findByIdUser(userId);

      if (!userExist) {
        throw new HttpException('Usuário não encontrada', HttpStatus.NOT_FOUND);
      }

      if (
        userExist &&
        userExist.image_url &&
        typeof userExist.image_url === 'string'
      ) {
        const oldImagePath = join(
          './public/uploads',
          userExist.image_url.split('/uploads/')[1],
        );
        try {
          fs.unlinkSync(oldImagePath);
        } catch (error) {
          this.logger.warn(`Failed to delete old image: ${error.message}`);
        }
      }
      await this.clientService.addImageClient(userId, imagePath);

      return { message: 'Imagem salva com sucesso', path: imagePath };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
