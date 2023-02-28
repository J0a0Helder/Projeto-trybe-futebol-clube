import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import auth from '../../Auth/AuthService';
import User from '../../database/models/UsersModel';
import ILogin from '../interfaces/ILogin';
import IServiceLogin from '../interfaces/IServiceLogin';

export default class LoginService implements IServiceLogin {
  protected model: ModelStatic<User> = User;

  async loginUser(data: ILogin): Promise<{
    type?: string, message?: string, token?: string
  }> {
    const user = await this.model.findOne({ where: { email: data.email } });
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      return { type: 'INVALID_FIELDS', message: 'Invalid email or password' };
    }
    const token = sign(
      {
        username: user.username,
      },
      auth.secret, // ref: https://dev.to/vitordelfino/autenticacao-com-jwt-22o7
      {
        expiresIn: auth.expires,
      },
    );
    return { token };
  }
}
