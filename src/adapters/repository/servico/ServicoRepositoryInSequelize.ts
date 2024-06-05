import { Inject } from "@nestjs/common";
import Servico from "domain/entity/servico/Servico";
import ServicoRepository from "domain/entity/servico/ServicoRepository";
import { QueryTypes } from "sequelize";
import { Sequelize } from "sequelize-typescript";


export default class ServicoRepositoryInSequelize implements ServicoRepository {
    constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

    async createServico(data: Servico): Promise<Servico> {
        const sql = `
            INSERT INTO servico (rota_inicio, rota_fim)
            VALUES (?, ?);
        `;

        await this.sequelize.query(sql, {
            type: QueryTypes.INSERT,
            replacements: [
                data.rota_inicio,
                data.rota_fim
            ]
        })

        return data;
    }

    async allServicos(): Promise<Servico> {
        const sql = `
            SELECT
                s.id,
                CONCAT(s.rota_inicio, ' - ', s.rota_fim) as rota
            FROM
            servico s
        `;

        const result: any = await this.sequelize.query(sql, {
            type: QueryTypes.SELECT
        })

        return result;
    }
    
    async servicoEmpresa(id_empresa: number): Promise<any> {
        const sql = `
            SELECT
                s.id as id_servico,
                so.id as id_servicoOferta,
                so.id_empresa,
                s.rota_inicio,
                s.rota_fim,
                so.vl_servico
            FROM servico s
            INNER JOIN servico_oferta so ON s.id = so.id_servico
            WHERE so.id_empresa = ?    
        `;

        const result: any = await this.sequelize.query(sql, {
            type: QueryTypes.SELECT,
            replacements: [id_empresa]
        })

        return result
    }
}