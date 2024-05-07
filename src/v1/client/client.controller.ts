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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import Client from 'domain/entity/client/Client';
import { ClientService } from './client.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateClientBody, UpdateClientBody } from './dto/client.dto';
import { Request } from 'express';
import { AuthUserMiddleware } from 'src/middleware/auth.user.middleware';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { rm } from 'fs';

@Controller('client')
@ApiTags('Cliente')
export class ClientController {
  private readonly logger: Logger = new Logger();
  constructor(private readonly clientService: ClientService) {}

  @Get('')
  @UseGuards(new AuthUserMiddleware())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Trazer detalhes do usuário pelo token',
  })
  async findById(@Req() req: Request): Promise<Client> {
    try {
      const id = req.user.id;
      console.log(`${__dirname}../../../uploads`);
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
    summary: 'Criação do usuário',
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

  @Patch()
  @UseGuards(new AuthUserMiddleware())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualizar detalhes do usuário pelo token',
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

      const updateClient = await this.clientService.updateClient(userId, data);

      return updateClient;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(new AuthUserMiddleware())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualizar a imagem do usuário',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image_url: { type: 'file', title: 'image para upload', required: ['true'] },
      },
    },
  })

  @UseInterceptors(
    FileInterceptor('image_url', {
      storage: diskStorage({
        destination: `${__dirname}/../../../uploads`,
        filename(req, file, callback) {
          const type = file.mimetype.replace('image/', '');
          const fileName =
            new Date().getTime() + btoa(file.originalname) + '.' + type;
          callback(null, fileName);
        },
      }),
    }),
  )
  @Post('perfil')
  async updateImageClient(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    if (!file) {
      throw new HttpException('Image nao enviada', HttpStatus.BAD_REQUEST);
    }
    try {
      const idUser = req.user.id
      return await this.clientService.updateImageClient(file, idUser)
    } catch (error) {
      console.log(error);
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    } 
  }
}
