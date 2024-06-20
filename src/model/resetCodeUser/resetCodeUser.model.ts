import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { Client } from '../client/client.model';

@Table({
  tableName: 'reset_code_user',
})
export class ResetCodeUser extends Model<ResetCodeUser> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    unique: true,
  })
  code: number;

  @ForeignKey(() => Client)
  @Column({ type: DataType.INTEGER, allowNull: false })
  id_client: number;

  @BelongsTo(() => Client)
  client: Client;

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
