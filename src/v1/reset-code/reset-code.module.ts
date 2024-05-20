import { Module } from '@nestjs/common';
import { ResetCodeController } from './reset-code.controller';
import { ResetCodeService } from './reset-code.service';
import { ClientService } from '../client/client.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ResetCodeController],
  providers: [ResetCodeService, ClientService]
})
export class ResetCodeModule {}
