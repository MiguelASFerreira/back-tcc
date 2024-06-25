import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './v1/client/client.module';
import { AuthModule } from './v1/auth/auth.module';
import { EmpresaModule } from './v1/empresa/empresa.module';
import { ServicoModule } from './v1/servico/servico.module';
import { ServicoOfertaModule } from './v1/servico_oferta/servico_oferta.module';
import { ContratoModule } from './v1/contrato/contrato.module';
import { ResetCodeUserModule } from './v1/reset-code-user/reset-code-user.module';
import { DatabaseModule } from './database/database.module';
import { VeiculoModule } from './v1/veiculo/veiculo.module';
import { MailModule } from './v1/mail/mail.module';
import { ResetCodeEmpresaModule } from './v1/reset-code-empresa/reset-code-empresa.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ClientModule,
    AuthModule,
    EmpresaModule,
    ServicoModule,
    ServicoOfertaModule,
    ContratoModule,
    ResetCodeUserModule,
    VeiculoModule,
    MailModule,
    ResetCodeEmpresaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
