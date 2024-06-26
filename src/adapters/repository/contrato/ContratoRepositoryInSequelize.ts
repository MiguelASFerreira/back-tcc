import { Inject } from "@nestjs/common";
import Contrato from "domain/entity/contrato/Contrato";
import ContratoRespository from "domain/entity/contrato/ContratoRepository";
import { QueryTypes } from "sequelize";
import { Sequelize } from "sequelize-typescript";


export default class ContratoRepositoryInSequelize implements ContratoRespository {
    constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

    async createContrato(data: Contrato): Promise<Contrato> {
        const sql = `
            INSERT INTO contrato (id_servico, id_client, id_empresa, vl_total, vl_desconto, dt_inicio, dt_fim, dt_contrato)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await this.sequelize.query(sql, {
            type: QueryTypes.INSERT,
            replacements: [
                data.id_servico,
                data.id_cliente,
                data.id_empresa,
                data.vl_total,
                data.vl_desconto,
                data.dt_inicio,
                data.dt_fim,
                data.dt_contrato
            ]
        });

        return data;
    }

    async findContratoUser(id: number): Promise<Contrato> {
        const sql = `
            SELECT
                co.id AS id_contrato,
                e.id as id_empresa,
                s.rota_inicio,
                s.rota_fim,
                e.nome,
                COALESCE(co.vl_total, 0) - COALESCE(co.vl_desconto, 0) as total
            FROM contrato co
            INNER JOIN servico s
                ON s.id = co.id_servico
            INNER JOIN empresa e
                ON co.id_empresa = e.id
            INNER JOIN servico_oferta so
                ON s.id = so.id_servico
            WHERE
                co.id_client = ?
            ORDER BY
                e.nome
        `;

        const result: any = await this.sequelize.query(sql, {
            type: QueryTypes.SELECT,
            replacements: [id]
        })

        return result;
    }

    async addDesconto(id_client: number, id_empresa: number, desconto: number): Promise<any> {
        const sql = `
            UPDATE contrato c
            SET c.vl_desconto = ?
            WHERE c.id_client = ?
            AND c.id_empresa = ?
        `;

        await this.sequelize.query(sql, {
            type: QueryTypes.UPDATE,
            replacements: [desconto, id_client, id_empresa]
        })

        return {
            message: 'Desconto aplicado!'
        }
    }
}