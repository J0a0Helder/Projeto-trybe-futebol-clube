import ILeader from '../ILeader/ILeader';

export default interface IServiceLeaderB {
  getHomePerformance(): Promise<ILeader[]>
  getAwayPerformance(): Promise<ILeader[]>
}
