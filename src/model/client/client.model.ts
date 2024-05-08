import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'client',
  timestamps: true,
})
export class Client extends Model<Client> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  nome: string;

  @Column({ type: DataType.STRING, allowNull: true })
  image_url?: string;

  @Column({ type: DataType.STRING, allowNull: false })
  cpf: string;

  @Column({ type: DataType.DATE, allowNull: false })
  data_nascimento: Date;

  @Column({ type: DataType.STRING, allowNull: false })
  cep: string;

  @Column({ type: DataType.STRING, allowNull: false })
  n_casa: string;

  @Column({ type: DataType.STRING, allowNull: false })
  bairro: string;

  @Column({ type: DataType.STRING, allowNull: false })
  logradouro: string;

  @Column({ type: DataType.STRING, allowNull: false })
  municipio: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  telefone: number;
}
