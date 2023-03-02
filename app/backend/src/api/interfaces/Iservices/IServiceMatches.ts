import IMatcheNew from '../IMatches/IMatcheNew';
import IMatches from '../IMatches/IMatches';
import IMatcheUpdate from '../IMatches/IMatcheUpdate';

export default interface IServiceMatches {
  getAll(inProgress:string | undefined): Promise<IMatches[]>
  finishById(id:number): Promise<{ message: string }>
  updateById(id:IMatcheUpdate): Promise<{ message: string }>
  insertNew(data: IMatcheNew): Promise<IMatcheNew | { status: number, message: string }>
}
