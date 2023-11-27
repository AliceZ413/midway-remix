import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/base-entity';

@Entity('users')
@Index(['username'], { unique: true })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  username: string;

  @Column('varchar')
  password: string;

  @Column('simple-array', {
    nullable: true,
  })
  role: string[];
}
