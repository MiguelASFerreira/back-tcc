import { Inject } from "@nestjs/common";
import ResetCodeRepository from "domain/entity/resetCode/ResetCodeRepository";
import { Sequelize } from "sequelize-typescript";


export class ResetCodeRepositoryInSequelize implements ResetCodeRepository {
    constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

    async createCode(id_client: number, code: number): Promise<any> {
        const sql = `
            INSERT INTO reset_code (code, id_client)
            VALUES (?, ?)
        `;

        await this.sequelize.query(sql, {
            replacements: [code, id_client]
        })

        return code
    }

    async existCode(code: number): Promise<boolean> {
        const sql = `
            SELECT
                *
            FROM reset_code rc
            WHERE rc.code = ?
        `;

        const [results] = await this.sequelize.query(sql, {
            replacements: [code]
        });

        return results.length > 0;
    }

    async compareCode(code: number): Promise<any> {
        const sql = `
            SELECT
                rc.id,
                rc.id_client,
                rc.code
            FROM reset_code rc
            WHERE rc.code = ?
            ORDER BY rc.created_at DESC
            LIMIT 1
        `;

        const [[result]] = await this.sequelize.query(sql, {
            replacements: [code]
        });

        return result
    }
}