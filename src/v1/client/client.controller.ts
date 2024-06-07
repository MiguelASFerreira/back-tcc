import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import Client from 'domain/entity/client/Client';
import { ClientService } from './client.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateClientBody, EsqueciSenhaBody, UpdateClientBody } from './dto/client.dto';
import { Request } from 'express';
import { AuthUserMiddleware } from 'src/middleware/auth.user.middleware';

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
}
