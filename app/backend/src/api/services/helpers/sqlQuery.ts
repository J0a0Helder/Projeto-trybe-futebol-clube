const queryHome = `SELECT 
T.team_name as name,
  COUNT(T.id) AS totalGames,
  ((SUM(CASE WHEN M.home_team_goals > M.away_team_goals then 1 else 0 end) * 3) 
  + 
  (SUM(CASE WHEN M.home_team_goals = M.away_team_goals then 1 else 0 end)) * 1) 
  AS totalPoints,
  SUM(CASE WHEN M.home_team_goals > M.away_team_goals then 1 else 0 end) 
  AS totalVictories,
  SUM(CASE WHEN M.home_team_goals = M.away_team_goals then 1 else 0 end) 
  AS totalDraws,
  SUM(CASE WHEN M.home_team_goals < M.away_team_goals then 1 else 0 end) 
  AS totalLosses,
  SUM(home_team_goals) AS goalsFavor,
  SUM(away_team_goals) AS goalsOwn,
  (SUM(home_team_goals) - SUM(away_team_goals)) AS goalsBalance,
  ROUND(
  (
  (
  (
  (
  (SUM(CASE WHEN M.home_team_goals > M.away_team_goals then 1 else 0 end) * 3) 
  + 
  (SUM(CASE WHEN M.home_team_goals = M.away_team_goals then 1 else 0 end)) * 1) / (COUNT(T.id) * 3
  )
  ) * 100
  )
  ), 2
  ) 
  AS efficiency
FROM
  matches AS M
INNER JOIN
  teams AS T
ON M.home_team_id = T.id
WHERE M.in_progress = false
group by team_name
order BY totalPoints desc, goalsBalance desc, goalsFavor desc, goalsOwn desc`;

const queryAway = `SELECT 
T.team_name as name,
  COUNT(T.id) AS totalGames,
  ((SUM(CASE WHEN M.away_team_goals > M.home_team_goals then 1 else 0 end) * 3) 
  + 
  (SUM(CASE WHEN M.away_team_goals = M.home_team_goals then 1 else 0 end)) * 1) 
  AS totalPoints,
  SUM(CASE WHEN M.away_team_goals > M.home_team_goals then 1 else 0 end) 
  AS totalVictories,
  SUM(CASE WHEN M.away_team_goals = M.home_team_goals then 1 else 0 end) 
  AS totalDraws,
  SUM(CASE WHEN M.away_team_goals < M.home_team_goals then 1 else 0 end) 
  AS totalLosses,
  SUM(away_team_goals) AS goalsFavor,
  SUM(home_team_goals) AS goalsOwn,
  (SUM(away_team_goals) - SUM(home_team_goals)) AS goalsBalance,
  ROUND(
  (
  (
  (
  (
  (SUM(CASE WHEN M.away_team_goals > M.home_team_goals then 1 else 0 end) * 3) 
  + 
  (SUM(CASE WHEN M.away_team_goals = M.home_team_goals then 1 else 0 end)) * 1) / (COUNT(T.id) * 3
  )
  ) * 100
  )
  ), 2
  ) 
  AS efficiency
FROM
  matches AS M
INNER JOIN
  teams AS T
ON M.away_team_id = T.id
WHERE M.in_progress = false
group by team_name
order BY totalPoints desc, goalsBalance desc, goalsFavor desc, goalsOwn desc`;

export { queryHome, queryAway };
