import { Inject } from "@nestjs/common";
import ResetCodeUserRepository from "domain/entity/resetCodeUser/ResetCodeUserRepository";
import { Sequelize } from "sequelize-typescript";


export class ResetCodeUserRepositoryInSequelize implements ResetCodeUserRepository {
    constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

    async createCodeUser(id_client: number, code: number): Promise<any> {
        const sql = `
            INSERT INTO reset_code_user (code, id_client)
            VALUES (?, ?)
        `;

        await this.sequelize.query(sql, {
            replacements: [code, id_client]
        })

        return code
    }

    async existCodeUser(code: number): Promise<boolean> {
        const sql = `
            SELECT
                *
            FROM reset_code_user rc
            WHERE rc.code = ?
        `;

        const [results] = await this.sequelize.query(sql, {
            replacements: [code]
        });

        return results.length > 0;
    }

    async compareCodeUser(code: number): Promise<any> {
        const sql = `
            SELECT
                rc.id,
                rc.id_client,
                rc.code
            FROM reset_code_user rc
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