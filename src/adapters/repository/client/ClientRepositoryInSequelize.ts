import Client from 'domain/entity/client/Client';
import ClientRepository from 'domain/entity/client/ClientRepository';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

export default class ClientRepositoryInSequelize implements ClientRepository {
  constructor(private readonly sequelize: Sequelize) {}

  async createClient(data: Client): Promise<Client> {
    const hashPassword = await bcrypt.hash(data.password, 10);

    const sql = `
    INSERT INTO cliente (email, password, nome, cpf, data_nascimento, cep, n_casa, bairro, municipio, telefone) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);    
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
      FROM cliente c 
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
        * 
      FROM cliente c 
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

    if (updateClause.length > 0) {
        updateClause = updateClause.slice(0, -1);
    }

    const sql = `
        UPDATE cliente c
        SET 
            ${updateClause}
        WHERE 
            c.id = ?
    `;
    
    await this.sequelize.query(sql, {
        type: QueryTypes.UPDATE,
        replacements: [replacements, id_client]
    });

    return data;
  }

  async updateImageClient(file: string, id_client: number): Promise<any> {
    const sql = `
      UPDATE cliente
      SET image_url = ?
      WHERE id = ?
    `;
    
    await this.sequelize.query(sql,{
      replacements: [file, id_client]
    })

    return true;
  }
}
