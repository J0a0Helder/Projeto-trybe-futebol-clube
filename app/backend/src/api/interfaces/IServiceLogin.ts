import ILogin from './ILogin';

export default interface IServiceLogin {
  loginUser(data: ILogin): Promise<{
    type?: string, message?: string, token?: string
  }>
}
