import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { encrypt } from '../utils/pwd-helper';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  private userModel: Repository<User>;

  async createUser() {
    const user = new User();
    user.username = 'admin';
    user.password = encrypt('12345');
    const result = await this.userModel.save(user);
    return result;
  }

  async getUser(options: { username: string }) {
    const user = await this.userModel.findOne({
      where: {
        username: options.username,
        deleted: false,
      },
    });
    return user;
  }
}
