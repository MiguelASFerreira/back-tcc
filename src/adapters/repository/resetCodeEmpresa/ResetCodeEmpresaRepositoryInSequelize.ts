import { Inject } from "@nestjs/common";
import ResetCodeEmpresaRepository from "domain/entity/resetCodeEmpresa/ResetCodeEmpresaRepository";
import { Sequelize } from "sequelize-typescript";


export class ResetCodeEmpresaRepositoryInSequelize implements ResetCodeEmpresaRepository {
    constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

    async createCodeEmpresa(id_empresa: number, code: number): Promise<any> {
        const sql = `
            INSERT INTO reset_code_empresa (code, id_empresa)
            VALUES (?, ?)
        `;

        await this.sequelize.query(sql, {
            replacements: [code, id_empresa]
        })

        return code
    }

    async existCodeEmpresa(code: number): Promise<boolean> {
        const sql = `
            SELECT
                *
            FROM reset_code_empresa re
            WHERE re.code = ?
        `;

        const [results] = await this.sequelize.query(sql, {
            replacements: [code]
        });

        return results.length > 0;
    }

    async compareCodeEmpresa(code: number): Promise<any> {
        const sql = `
            SELECT
                re.id,
                re.id_empresa,
                re.code
            FROM reset_code_empresa re
            WHERE re.code = ?
            ORDER BY re.created_at DESC
            LIMIT 1
        `;

        const [[result]] = await this.sequelize.query(sql, {
            replacements: [code]
        });

        return result
    }
}