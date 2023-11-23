import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../common/BaseEntity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    nullable: true,
    unique: true,
  })
  username: string;

  @Column('varchar', {
    nullable: true,
  })
  password: string;

  @Column('array', {
    nullable: true,
    default: ['user'],
  })
  role: Array<string>;
}
