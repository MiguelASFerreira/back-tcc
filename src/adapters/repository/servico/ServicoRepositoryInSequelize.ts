import Servico from "domain/entity/servico/Servico";
import ServicoRepository from "domain/entity/servico/ServicoRepository";
import { QueryTypes } from "sequelize";
import { Sequelize } from "sequelize-typescript";


export default class ServicoRepositoryInSequelize implements ServicoRepository {
    constructor(private readonly sequelize: Sequelize) {}

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
}