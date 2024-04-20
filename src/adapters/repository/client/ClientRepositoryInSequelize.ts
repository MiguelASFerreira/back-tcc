import Client from 'domain/entity/client/Client';
import ClientRepository from 'domain/entity/client/ClientRepository';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

export default class ClientRepositoryInSequelize implements ClientRepository {
  constructor(private readonly sequelize: Sequelize) {}

  async createClient(data: Client): Promise<Client> {
    const sql = `
    INSERT INTO cliente (email, password, nome, cpf, data_nascimento, cep, n_casa, bairro, municipio, telefone) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);    
    `;

    await this.sequelize.query(sql, {
      type: QueryTypes.INSERT,
      replacements: [
        data.email,
        data.password,
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

  async findByEmail(email: string): Promise<Client> {
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

    console.log(result);
    return result;
  }
}
