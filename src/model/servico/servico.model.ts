import { Table, Column, Model, DataType, Sequelize } from 'sequelize-typescript';

@Table({
  tableName: 'servico',
})
export class Servico extends Model<Servico> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  rota_inicio: string;

  @Column({ type: DataType.STRING, allowNull: false })
  rota_fim: string;

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
