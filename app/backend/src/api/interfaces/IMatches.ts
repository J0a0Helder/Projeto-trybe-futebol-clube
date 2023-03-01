interface Team {
  id?: number;
  teamName: string;
}
export default interface IMatches {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam: Team;
  awayTeam: Team;
}
