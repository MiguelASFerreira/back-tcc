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
import Client from 'domain/entity/client/Client';
import { ClientService } from './client.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateClientBody } from './dto/client.dto';
import { Request } from 'express';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Controller('client')
@ApiTags('Cliente')
export class ClientController {
  private readonly logger: Logger = new Logger();
  constructor(private readonly clientService: ClientService) {}

  @Get('')
  @UseGuards(new AuthMiddleware())
  @ApiBearerAuth()
  async findById(@Req() req: Request): Promise<Client> {
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
  async createClient(@Body() data: CreateClientBody): Promise<Client> {
    try {
      return await this.clientService.createClient(data);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
