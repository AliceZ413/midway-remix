import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('sessions')
@Index(['session_id'])
export class Session {
  @PrimaryColumn({
    type: 'varchar',
  })
  session_id: string;

  @Column({
    type: 'mediumtext',
  })
  session_data: string;

  @Column({
    type: 'datetime',
  })
  session_expire_time: Date;
}
