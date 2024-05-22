import { Inject } from "@nestjs/common";
import Veiculo from "domain/entity/veiculo/Veiculo";
import VeiculoRepository from "domain/entity/veiculo/VeiculoRepository";
import { QueryTypes } from "sequelize";
import { Sequelize } from "sequelize-typescript";

export default class VeiculoRepositoryInSequelize implements VeiculoRepository {
    constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

    async createVeiculo(data: Veiculo): Promise<Veiculo> {
        const sql = `
            INSERT INTO veiculo (nome, placa, capacidade, empresa_id, adaptavel) 
            VALUES (?, ?, ?, ?, ?)
        `;

        await this.sequelize.query(sql, {
            type: QueryTypes.INSERT,
            replacements: [
                data.nome,
                data.placa,
                data.capacidade,
                data.empresa_id,
                data.adaptavel
            ]
        })

        return data;
    }

    async veiculosByEmpresa(id_empresa: number): Promise<Veiculo[]> {
        const sql = `
            SELECT
                *
            FROM veiculo v
            WHERE v.empresa_id = ?
        `;

        const results: Veiculo[] = await this.sequelize.query(sql, {
            type: QueryTypes.SELECT,
            replacements: [id_empresa]
        })

        return results
    }

    async updateVeiculo(id: number, id_empresa: number, data: Veiculo): Promise<Veiculo> {
        const replacements = [];
    
        let updateClause = '';

        if (data.nome) {
          updateClause += 'v.nome = ?,';
          replacements.push(data.nome);
        }
        
        if (data.placa) {
          updateClause += 'v.placa = ?,';
          replacements.push(data.placa);
        }

        if (data.capacidade) {
          updateClause += 'v.capacidade = ?,';
          replacements.push(data.capacidade);
        }

        if (data.adaptavel) {
          updateClause += 'v.adaptavel = ?,';
          replacements.push(data.adaptavel);
        }
        
        if (updateClause.length > 0) {
          updateClause = updateClause.slice(0, -1);
        }
    
        const sql = `
            UPDATE veiculo v
            SET 
                ${updateClause}
            WHERE 
                v.id = ?
                AND v.empresa_id = ?
        `;
    
        await this.sequelize.query(sql, {
          type: QueryTypes.UPDATE,
          replacements: [replacements, id, id_empresa],
        });
    
        return data;
      }
}