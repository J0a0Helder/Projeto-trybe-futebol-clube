import IMatches from './IMatches';

export default interface IServiceMatches {
  getAll(inProgress: string | undefined): Promise<IMatches[]>
}
