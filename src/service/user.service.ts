import { Provide } from '@midwayjs/core';
import { IUserOptions } from '../interface';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  private userModel: Repository<User>;

  async createUser() {
    const user = new User();
    user.username = 'asdasdasd';
    user.password = '1231232132';
    const result = await this.userModel.save(user);
    return result;
  }

  async getUser(options: IUserOptions) {
    const user = await this.userModel.findOne({
      where: {
        username: options.username,
        deleted: false,
      },
    });
    return user;
  }
}
