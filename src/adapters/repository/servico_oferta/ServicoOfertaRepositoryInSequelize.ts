import {
  QueryServicoOferta,
  ServicoOferta,
} from 'domain/entity/servico_oferta/ServicoOferta';
import ServicoOfertaRepository from 'domain/entity/servico_oferta/ServicoOfertaRepository';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

export default class ServicoOfertaRepositoryInSequelize
  implements ServicoOfertaRepository
{
  constructor(private readonly sequelize: Sequelize) {}

  async createServicoOferta(data: ServicoOferta): Promise<ServicoOferta> {
    const sql = `
            INSERT INTO servico_oferta (id_empresa, id_servico, vl_servico)
            VALUES (?, ?, ?);
        `;

    await this.sequelize.query(sql, {
      type: QueryTypes.INSERT,
      replacements: [data.id_empresa, data.id_servico, data.vl_servico],
    });

    return data;
  }

  async filterServicoOferta(query: QueryServicoOferta): Promise<QueryServicoOferta> {
    let whereClauses = [];
    
    if (query.id_empresa) {
      whereClauses.push('e.id = ?');
    }
    
    if (query.rota_inicio) {
      whereClauses.push('s.rota_inicio LIKE ?');
    }
    
    if (query.rota_fim) {
      whereClauses.push('s.rota_fim LIKE ?');
    }
    
    const whereClause = whereClauses.length > 0 ? 'WHERE ' + whereClauses.join(' AND ') : '';
    
    const sql = `
      SELECT
        so.id AS id_servicoOferta,
        e.id AS id_empresa,
        e.nome AS "nomeEmpresa",
        s.id AS id_servico,
        s.rota_inicio,
        s.rota_fim
      FROM 
        servico_oferta so
      INNER JOIN 
        empresa e ON e.id = so.id_empresa
      INNER JOIN 
        servico s ON s.id = so.id_servico
      ${whereClause}
    `;
    
    const replacements = [];
  
    if (query.id_empresa) {
      replacements.push(query.id_empresa);
    }
    
    if (query.rota_inicio) {
      replacements.push(`%${query.rota_inicio}%`);
    }
    
    if (query.rota_fim) {
      replacements.push(`%${query.rota_fim}%`);
    }
    
    const result: any = await this.sequelize.query(sql, {
      type: QueryTypes.SELECT,
      replacements
    });
    console.log(result);
    return result;
  }
  
}