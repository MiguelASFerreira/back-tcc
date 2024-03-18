import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Client extends Model<Client> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.STRING })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  nome: string;

  @Column({ type: DataType.STRING, allowNull: false })
  cpf: string;

  @Column({ type: DataType.DATE, allowNull: false })
  data_nascimento: Date;

  @Column({ type: DataType.STRING, allowNull: false })
  instituicao: string;

  @Column({ type: DataType.STRING, allowNull: false })
  nivelDeEnsino: string;

  @Column({ type: DataType.STRING, allowNull: false })
  cep: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  n_casa: number;

  @Column({ type: DataType.STRING, allowNull: false })
  bairro: string;

  @Column({ type: DataType.STRING, allowNull: false })
  municipio: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  telefone: number;
}
