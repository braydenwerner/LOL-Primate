import { useState, useEffect } from 'react';
import Image from 'next/image'

import { Summoner } from '../../../pages/ChampSelectPage';
import { getAPIVersion } from '../../../util/convertChampId'
import * as Styled from './SummonerProfileCard.styled'

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

  const dataDragonAPIVersion = getAPIVersion();

  return (
    <Styled.ProfileContainer>
      {summoner.tier ? (
        <>
          <Styled.Winrate>WR: {winrate}%</Styled.Winrate>
          <div>{summoner.name}</div>
          <Styled.ProfileIcon width={90} height={90} src={`http://ddragon.leagueoflegends.com/cdn/${dataDragonAPIVersion}/img/profileicon/${summoner.profileIconId}.png`} />
          <Styled.SummonerLevel>{summoner.summonerLevel}</Styled.SummonerLevel>
          <Styled.WinLossContainer>
            <div style={{ color: 'GREEN' }}>W: {summoner.wins}</div>
            <div style={{ color: 'RED' }}>L: {summoner.losses}</div>
          </Styled.WinLossContainer>
          <Styled.ProgressBar variant="determinate" value={winrate} />
          <Styled.LPDivContainer>
            <Styled.LPDiv>{summoner.leaguePoints} lp</Styled.LPDiv>
          </Styled.LPDivContainer>
          <Styled.SummonerTierContainer>
            <Image src={`/images/${(summoner.tier)?.toLowerCase()}.png`} alt={`${summoner.tier}-icon`} width={130} height={150} />
          </Styled.SummonerTierContainer>
          <Styled.RankContainer>
            <div>{summoner.rank}</div>
          </Styled.RankContainer>
        </>
      ) : (
        <>
          <div>{summoner.name}</div>
          <Styled.ProfileIcon width={90} height={90} src={`http://ddragon.leagueoflegends.com/cdn/${dataDragonAPIVersion}/img/profileicon/${summoner.profileIconId}.png`} />
          <Styled.SummonerLevel>{summoner.summonerLevel}</Styled.SummonerLevel>
          <div>No ranked data exists for this season</div>
        </>
      )}
    </Styled.ProfileContainer>
  );
};
