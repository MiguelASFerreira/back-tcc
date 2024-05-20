import { Table, Column, Model, DataType, Sequelize } from 'sequelize-typescript';

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

  @Column({ type: DataType.DOUBLE, allowNull: false })
  telefone1: string;

  @Column({ type: DataType.STRING, allowNull: false })
  cpf: string;
  
  @Column({ 
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    field: 'created_at'
  })
  createdAt: Date;

  @Column({ 
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    field: 'updated_at'
  })
  updatedAt: Date;
}
