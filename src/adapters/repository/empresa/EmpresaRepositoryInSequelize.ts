import Empresa from 'domain/entity/empresa/Empresa';
import EmpresaRepository from 'domain/entity/empresa/EmpresaRepository';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { Inject } from '@nestjs/common';

export default class EmpresaRepositroyInSequelize implements EmpresaRepository {
  constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

  async createEmpresa(data: Empresa): Promise<Empresa> {
    const hashPassword = await bcrypt.hash(data.password, 10);

    const sql = `
    INSERT INTO empresa (email, password, nome, dono, image_url, telefone1, cpf)
    VALUES (?, ?, ?, ?, ?, ?, ?);    
    `;

    await this.sequelize.query(sql, {
      type: QueryTypes.INSERT,
      replacements: [
        data.email,
        hashPassword,
        data.nome,
        data.dono,
        data.image_url,
        data.telefone1,
        data.cpf,
      ],
    });

    return data;
  }

  async findByIdEmpresa(id: number): Promise<Empresa> {
    const sql = `
        SELECT
            e.id,
            e.email,
            e.nome,
            e.dono,
            e.image_url,
            e.telefone1,
            e.cpf,
            SUM(v.capacidade) AS 'CAPACIDADE_MAXIMA',
            COUNT(v.id) AS 'QUANTIDADE_VEICULOS',
            e.created_at,
            e.updated_at
        FROM empresa e
        LEFT JOIN veiculo v on e.id = v.empresa_id
        WHERE e.id = ?
    `;

    const [result]: any = await this.sequelize.query(sql, {
      type: QueryTypes.SELECT,
      replacements: [id],
    });

    return result;
  }

  async findByEmailEmpresa(email: string): Promise<Empresa> {
    const sql = `
      SELECT 
        * 
      FROM empresa e 
      WHERE e.email = ?
    `;

    const [result]: any = await this.sequelize.query(sql, {
      type: QueryTypes.SELECT,
      replacements: [email],
    });

    return result;
  }

  async updateEmpresa(id_empresa: number, data: Empresa): Promise<Empresa> {
    const replacements = [];

    let updateClause = '';
    if (data.email) {
      updateClause += 'email = ?,';
      replacements.push(data.email);
    }
    if (data.nome) {
      updateClause += 'nome = ?,';
      replacements.push(data.nome);
    }
    if (data.dono) {
      updateClause += 'dono = ?,';
      replacements.push(data.dono);
    }
    if (data.image_url) {
      updateClause += 'image_url = ?,';
      replacements.push(data.image_url);
    }
    if (data.telefone1) {
      updateClause += 'telefone1 = ?,';
      replacements.push(data.telefone1);
    }
    if (data.cpf) {
      updateClause += 'cpf = ?,';
      replacements.push(data.cpf);
    }
    if (data.password) {
      const hashPassword = await bcrypt.hash(data.password, 10);
      updateClause += 'password = ?,';
      replacements.push(hashPassword);
    }

    if (updateClause.length > 0) {
      updateClause = updateClause.slice(0, -1);
    }

    const sql = `
        UPDATE empresa e
        SET 
            ${updateClause}
        WHERE 
            e.id = ?
    `;

    await this.sequelize.query(sql, {
      type: QueryTypes.UPDATE,
      replacements: [...replacements, id_empresa],
    });

    return data;
  }

  async findContratoEmpresa(
    id_empresa: number,
    id_servico?: number,
  ): Promise<any> {
    const paramServico = id_servico ? `AND c.id_servico = ?` : ``;
    const sql = `
      SELECT
          c.id,
          cl.id as id_client,
          cl.nome,
          cl.email,
          cl.telefone,
          c.dt_contrato,
          c.vl_total,
          c.vl_desconto,
          (COALESCE(c.vl_total, 0) - COALESCE(c.vl_desconto, 0)) AS vl_total_desconto,
          CONCAT(s.rota_inicio, ' - ', s.rota_fim) as 'rota'
      FROM contrato c
      JOIN client cl on c.id_client = cl.id
      JOIN servico s on c.id_servico = s.id
      WHERE
          c.id_empresa = ?
          ${paramServico}
    `;

    const result: any = await this.sequelize.query(sql, {
      type: QueryTypes.SELECT,
      replacements: [id_empresa, id_servico],
    });

    return result;
  }

  async finalContract(id_empresa: number, id_client: number): Promise<any> {
    const sqlContrato = `
        SELECT
            *
        FROM contrato c
          WHERE c.id_client = ?
          AND c.id_empresa = ?
    `

    const [resultContrato]: any = await this.sequelize.query(sqlContrato, {
      type: QueryTypes.SELECT,
      replacements: [id_client, id_empresa]
    })

    if (!resultContrato) {
      throw new Error('Contrato inexistente!')
    }

    const sql = `
        DELETE
            FROM
                contrato c
        WHERE c.id_client = ?
        AND c.id_empresa = ?
    `

    await this.sequelize.query(sql, {
      type: QueryTypes.DELETE,
      replacements: [id_client, id_empresa]
    })

    return {
      message: 'Deletado com sucesso'
    }
  }

  async esqueciSenha(id_empresa: number, senha: string): Promise<any> {
    const hashPassword = await bcrypt.hash(senha, 10);
    const sql = `
        UPDATE empresa e
        SET 
            password = ?
        WHERE 
            e.id = ?
    `;

    await this.sequelize.query(sql, {
      replacements: [hashPassword, id_empresa]
    })

    return 'Senha atualizada';
  }

  async addImageEmpresa(id: number, path: string): Promise<any> {
    const sql = `
        UPDATE empresa e
        SET 
           e.image_url = ?
        WHERE 
            e.id = ?
    `;

    const [result]: any = await this.sequelize.query(sql, {
      type: QueryTypes.UPDATE,
      replacements: [path, id]
    })

    return result
  }
}
