import { Config, Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { SessionStore } from '@midwayjs/session';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Session } from '../entity/session.entity';
import { Repository } from 'typeorm';

@Provide()
@Scope(ScopeEnum.Singleton)
export class MemorySessionStore extends SessionStore {
  @Config('session')
  sessionConfig;

  @InjectEntityModel(Session)
  private sessionModel: Repository<Session>;

  async get(key: string) {
    const session = await this.sessionModel.findOneBy({ session_id: key });
    return JSON.parse(session.session_data);
  }

  async set(key: string, value: any) {
    const session = new Session();
    session.session_id = key;
    session.session_data = JSON.stringify(value);
    session.session_expire_time = new Date(new Date().getTime() + this.sessionConfig.maxAge);
    await this.sessionModel.save(session);
  }

  async destroy(key: string) {
    const session = await this.sessionModel.findOneBy({ session_id: key });
    await this.sessionModel.remove([session]);
  }
}
