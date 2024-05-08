import { Table, Column, Model, DataType, BelongsTo, ForeignKey, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Empresa } from '../empresa/empresa.model';
import { Servico } from '../servico/servico.model';
import { Client } from '../client/client.model';

@Table({
  tableName: 'contrato',
})
export class Contrato extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ForeignKey(() => Servico)
  @Column({ type: DataType.INTEGER, allowNull: false })
  id_servico: number;

  @BelongsTo(() => Servico)
  servico: Servico;

  @ForeignKey(() => Client)
  @Column({ type: DataType.INTEGER, allowNull: false })
  id_client: number;

  @BelongsTo(() => Client)
  client: Client;

  @ForeignKey(() => Empresa)
  @Column({ type: DataType.INTEGER, allowNull: false })
  id_empresa: number;

  @BelongsTo(() => Empresa)
  empresa: Empresa;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  vl_desconto: number;

  @Column({ type: DataType.DATE, allowNull: false })
  dt_contrato: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  dt_inicio: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  dt_fim: Date;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: Date;
}
