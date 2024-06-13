import Client from 'domain/entity/client/Client';
import ClientRepository from 'domain/entity/client/ClientRepository';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { Inject } from '@nestjs/common';

export default class ClientRepositoryInSequelize implements ClientRepository {
  constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

  async createClient(data: Client): Promise<Client> {
    const hashPassword = await bcrypt.hash(data.password, 10);

    const sql = `
    INSERT INTO client (email, password, nome, cpf, data_nascimento, cep, n_casa, bairro, logradouro,  municipio, telefone) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);    
    `;

    await this.sequelize.query(sql, {
      type: QueryTypes.INSERT,
      replacements: [
        data.email,
        hashPassword,
        data.nome,
        data.cpf,
        data.data_nascimento,
        data.cep,
        data.n_casa,
        data.bairro,
        data.logradouro,
        data.municipio,
        data.telefone,
      ],
    });

    return data;
  }

  async findByEmailUser(email: string): Promise<Client> {
    const sql = `
      SELECT 
        * 
      FROM client c 
      WHERE c.email = ?
    `;

    const [result]: any = await this.sequelize.query(sql, {
      type: QueryTypes.SELECT,
      replacements: [email],
    });

    return result;
  }

  async findByIdUser(id: number): Promise<Client> {
    const sql = `
      SELECT
          c.*,
          e.nome as  nomeEmpresa,
          e.dono as donoEmpresa,
          e.email as emailEmpresa,
          e.telefone1 as  telefoneEmpresa
      FROM client c
      INNER JOIN contrato ct on c.id = ct.id_client
      INNER JOIN empresa e on ct.id_empresa = e.id
      WHERE c.id = ?
    `;

    const [result]: any = await this.sequelize.query(sql, {
      type: QueryTypes.SELECT,
      replacements: [id],
    });

    return result;
  }

  async updateClient(id_client: number, data: Client): Promise<Client> {
    const replacements = [];

    let updateClause = '';
    if (data.email) {
      updateClause += 'email = ?,';
      replacements.push(data.email);
    }
    if (data.telefone) {
      updateClause += 'telefone = ?,';
      replacements.push(data.telefone);
    }
    if (data.municipio) {
      updateClause += 'municipio = ?,';
      replacements.push(data.municipio);
    }
    if (data.bairro) {
      updateClause += 'bairro = ?,';
      replacements.push(data.bairro);
    }
    if (data.n_casa) {
      updateClause += 'n_casa = ?,';
      replacements.push(data.n_casa);
    }
    if (data.cep) {
      updateClause += 'cep = ?,';
      replacements.push(data.cep);
    }
    if (data.cpf) {
      updateClause += 'cpf = ?,';
      replacements.push(data.cpf);
    }
    if (data.data_nascimento) {
      updateClause += 'data_nascimento = ?,';
      replacements.push(data.data_nascimento);
    }
    if (data.nome) {
      updateClause += 'nome = ?,';
      replacements.push(data.nome);
    }
    if (data.password) {
      const hashPassword = await bcrypt.hash(data.password, 10);
      updateClause += 'password = ?,';
      replacements.push(hashPassword);
    }
    if (data.logradouro) {
      updateClause += 'logradouro = ?,';
      replacements.push(data.logradouro);
    }

    if (updateClause.length > 0) {
      updateClause = updateClause.slice(0, -1);
    }

    const sql = `
        UPDATE client c
        SET 
            ${updateClause}
        WHERE 
            c.id = ?
    `;

    await this.sequelize.query(sql, {
      type: QueryTypes.UPDATE,
      replacements: [...replacements, id_client],
    });

    return data;
  }

  async esqueciSenha(id_client: number, senha: string): Promise<any> {
    const hashPassword = await bcrypt.hash(senha, 10);
    const sql = `
        UPDATE client c
        SET 
            password = ?
        WHERE 
            c.id = ?
    `;

    await this.sequelize.query(sql, {
      replacements: [hashPassword, id_client]
    })

    return 'Senha atualizada';
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
}
