import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'empresa',
  timestamps: true,
})
export class Empresa extends Model<Empresa> {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  nome: string;

  @Column({ type: DataType.STRING, allowNull: false })
  dono: string;

  @Column({ type: DataType.STRING, allowNull: true })
  image_url: string;

  @Column({ type: DataType.STRING, allowNull: false })
  telefone1: string;

  @Column({ type: DataType.STRING, allowNull: false })
  telefone2: string;
}
