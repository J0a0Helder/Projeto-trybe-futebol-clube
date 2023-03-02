import ILogin from '../ILogin/ILogin';

export default interface IServiceLogin {
  loginUser(data: ILogin): Promise<{
    type?: string, message?: string, token?: string
  }>

  findUser(token: string): Promise<{
    type?: string, message?: string, role?: string
  }>
}
