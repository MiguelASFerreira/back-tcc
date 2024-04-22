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
}
