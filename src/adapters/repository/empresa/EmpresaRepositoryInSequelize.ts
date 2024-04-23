import Empresa from 'domain/entity/empresa/Empresa';
import EmpresaRepository from 'domain/entity/empresa/EmpresaRepository';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

export default class EmpresaRepositroyInSequelize implements EmpresaRepository {
  constructor(private readonly sequelize: Sequelize) {}

  async createEmpresa(data: Empresa): Promise<Empresa> {
    const hashPassword = await bcrypt.hash(data.password, 10);

    const sql = `
    INSERT INTO empresa (email, password, nome, dono, image_url, telefone1, telefone2)
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
        data.telefone2,
      ],
    });

    return data;
  }

  async findByIdUser(id: number): Promise<Empresa> {
    const sql = `
      SELECT 
        * 
      FROM empresa e 
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
}
