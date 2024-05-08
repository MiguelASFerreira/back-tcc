import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'empresa',
})
export class Empresa extends Model<Empresa> {
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

  @Column({ type: DataType.STRING, allowNull: false })
  dono: string;

  @Column({ type: DataType.STRING, allowNull: true })
  image_url: string;

  @Column({ type: DataType.STRING, allowNull: false })
  telefone1: string;

  @Column({ type: DataType.STRING, allowNull: false })
  telefone2: string;
  
  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: Date;
}
