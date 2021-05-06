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
          <div style={{ fontSize: '20px' }}>{summoner.name}</div>
          <Styled.ProfileIcon width={90} height={90} src={`http://ddragon.leagueoflegends.com/cdn/${dataDragonAPIVersion}/img/profileicon/${summoner.profileIconId}.png`} />
          <Styled.SummonerLevel>{summoner.summonerLevel}</Styled.SummonerLevel>
          <Styled.WinLossContainer>
            <div>W: {summoner.wins}</div>
            <div>L: {summoner.losses}</div>
          </Styled.WinLossContainer>
          <Styled.ProgressBar variant="determinate" value={winrate ? winrate : 50} />
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
          <div style={{ fontSize: '20px', position: 'relative', top: '15px', marginTop: '170px' }}>{summoner.name}</div>
          <Styled.ProfileIcon style={{ marginTop: '40px' }} width={90} height={90} src={`http://ddragon.leagueoflegends.com/cdn/${dataDragonAPIVersion}/img/profileicon/${summoner.profileIconId}.png`} />
          <Styled.SummonerLevel>{summoner.summonerLevel}</Styled.SummonerLevel>
          <Styled.noDataText>No ranked data exists for this season</Styled.noDataText>
          <Styled.SummonerTierContainer style={{ position: 'relative', top: '15px', marginBottom: '95px' }}>
            <Image src={`/images/unranked.png`} alt='unranked-icon' width={'100%'} height={'100%'} />
          </Styled.SummonerTierContainer>
        </>
      )}
    </Styled.ProfileContainer>
  );
};
