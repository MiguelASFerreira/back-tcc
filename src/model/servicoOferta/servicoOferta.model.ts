import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  Sequelize,
} from 'sequelize-typescript';
import { Empresa } from '../empresa/empresa.model';
import { Servico } from '../servico/servico.model';

@Table({
  tableName: 'servico_oferta',
})
export class ServicoOferta extends Model<ServicoOferta> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ForeignKey(() => Empresa)
  @Column({ type: DataType.INTEGER, allowNull: false })
  id_empresa: number;

  @BelongsTo(() => Empresa)
  empresa: Empresa;

  @ForeignKey(() => Servico)
  @Column({ type: DataType.INTEGER, allowNull: false })
  id_servico: number;

  @BelongsTo(() => Servico)
  servico: Servico;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  vl_servico: number;

  @Column({
    type: DataType.DATE,
    defaultValue: Sequelize.literal('NOW()'),
    field: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    onUpdate: 'CURRENT_TIMESTAMP',
    field: 'updated_at',
  })
  updatedAt: Date;
}
