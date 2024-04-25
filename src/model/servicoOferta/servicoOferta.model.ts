import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'servico_oferta',
  timestamps: true,
})
export class ServicoOferta extends Model<ServicoOferta> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.NUMBER,
  })
  id: number;

  @Column({ type: DataType.NUMBER, allowNull: false })
  id_empresa: number;

  @Column({ type: DataType.NUMBER, allowNull: false })
  id_servico: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false})
  vl_servico: number;
}
