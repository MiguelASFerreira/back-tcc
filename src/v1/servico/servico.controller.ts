import { Body, Controller, Post, Logger, HttpException, HttpStatus } from '@nestjs/common';
import Servico from 'domain/entity/servico/Servico';
import { ServicoService } from './servico.service';
import { CreateServicoBody } from './dto/servico.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('servico')
@ApiTags('Serviço')
export class ServicoController {
    private readonly logger: Logger = new Logger();
  constructor(private readonly servicoService: ServicoService) {}

  @Post()
  async createServico(@Body() data: CreateServicoBody): Promise<Servico> {
    try {
        return await this.servicoService.createServico(data);
    } catch (error) {
        this.logger.error(error.message);
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
