import { useState, useEffect } from 'react';
import { Summoner } from '../../../pages/ChampSelectPage';

interface SummonerProfileCardProps {
  summoner: Summoner;
}

export const SummonerProfileCard: React.FC<SummonerProfileCardProps> = ({
  summoner,
}) => {
  const [winrate, setWinrate] = useState<number>();

  useEffect(() => {
    if (summoner.wins && summoner.losses) {
      setWinrate(
        Math.round(
          (summoner.wins / (summoner.wins + summoner.losses)) * 10000
        ) / 100
      );
    }
  }, [summoner]);

  return (
    <div>
      {summoner.name}
      <div>tier: {summoner.tier}</div>
      <div>rank: {summoner.rank}</div>
      <div>lp: {summoner.leaguePoints}</div>
      <div>winrate: {winrate}%</div>
      <div>wins: {summoner.wins}</div>
      <div>losess: {summoner.losses}</div>
      <div>Summoner level: {summoner.summonerLevel}</div>
    </div>
  );
};
