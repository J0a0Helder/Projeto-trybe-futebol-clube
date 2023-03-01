import IMatches from './IMatches';

export default interface IServiceMatches {
  getAll(inProgress: string | undefined): Promise<IMatches[]>
  finishById(id:number, token:string): Promise<{
    type?: string, message?: string
  } | string>
}
