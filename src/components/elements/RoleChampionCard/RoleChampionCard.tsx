import { useEffect, useState } from 'react';
import { RotateSpinner } from 'react-spinners-kit'
import { Grid } from '@material-ui/core'
import Image from 'next/image'

import { StyledGridContainer } from '../../../styles/constantStyles'
import { getAPIVersion } from '../../../util/convertChampId';
import {
  Champion,
  Lane,
  SpecificMatch,
  SpecificMatchArr,
} from '../../../pages/ChampSelectPage';
import * as Styled from './RoleChampionCard.styled';

interface RoleChampionCardProps {
  mostCommonChampions: Champion;
  mostCommonLanes: Lane;
  specificMatchArr: SpecificMatchArr;
}

interface MostCommonChampArr {
  [0]: string,
  [1]: number
}

interface MostCommonLaneArr {
  [0]: string,
  [1]: number
}

export const RoleChampionCard: React.FC<RoleChampionCardProps> = ({
  mostCommonChampions,
  mostCommonLanes,
  specificMatchArr,
}) => {
  //  put dict of champ:freq into a list of champs in descending order
  const [mostCommonChampsArr, setMostCommonChampsArr] = useState<MostCommonChampArr[]>([]);
  const [mostCommonLanesArr, setMostCommonLanesArr] = useState<MostCommonLaneArr[]>([]);
  const [loadingMatchData, setLoadingMatchData] = useState<boolean>(true)

  useEffect(() => {
    const tempMostCommonChampArr: MostCommonChampArr[] = [];
    const tempMostCommonLanesArr: MostCommonLaneArr[] = [];

    if (mostCommonChampions && Object.keys(mostCommonChampions).length > 0) {
      for (const champ in mostCommonChampions) {
        tempMostCommonChampArr.push([champ, mostCommonChampions[champ]]);
      }
      tempMostCommonChampArr.sort((a: MostCommonChampArr, b: MostCommonChampArr) => b[1] - a[1]);

      for (const lane in mostCommonLanes) {
        tempMostCommonLanesArr.push([lane, mostCommonLanes[lane]]);
      }
      tempMostCommonLanesArr.sort((a: MostCommonLaneArr, b: MostCommonLaneArr) => b[1] - a[1]);

      setMostCommonChampsArr(tempMostCommonChampArr);
      setMostCommonLanesArr(tempMostCommonLanesArr);
    }
  }, [mostCommonChampions, mostCommonLanes]);

  useEffect(() => {
    specificMatchArr instanceof Array ? setLoadingMatchData(false) : setLoadingMatchData(true)
  }, [specificMatchArr])

  const dataDragonAPIVersion = getAPIVersion();

  if (!loadingMatchData) {
    return (
      <Styled.RoleChampionWrapper>
        <Styled.MainChampRoleContainer>
          {mostCommonChampions &&
            mostCommonChampsArr[0] && (
              <>
                <img
                  width={40}
                  height={40}
                  src={`http://ddragon.leagueoflegends.com/cdn/${dataDragonAPIVersion}/img/champion/${mostCommonChampsArr[0][0]}.png`}
                />
              </>
            )}
          {mostCommonLanesArr &&
            mostCommonLanesArr[0] && (
              <Image src={`/images/${mostCommonLanesArr[0][0]}.png`} alt={`${mostCommonLanesArr[0][0]}-icon`} width={40} height={40} />
            )}
        </Styled.MainChampRoleContainer>
        <Grid
          container
          direction="row"
          justify="center"
        >
          {specificMatchArr instanceof Array && specificMatchArr.map((match: SpecificMatch, i: number) => {
            return (
              <StyledGridContainer
                item
                xs
                key={i}
              >
                <Styled.MatchStatContainer key={i} >
                  <img
                    width={25}
                    height={25}
                    src={`http://ddragon.leagueoflegends.com/cdn/${dataDragonAPIVersion}/img/champion/${match.champion}.png`}
                  />
                  <Styled.KDAContainer color={match.win ? '#4766E5' : '#E25151'}>
                    <div>{match.kills}/{match.deaths}/{match.assists}</div>
                  </Styled.KDAContainer>
                </Styled.MatchStatContainer>
              </StyledGridContainer>
            )
          })}
        </Grid>
        <Styled.TrimContainer>
          <Image src={`/images/platinumtrim.png`} alt={`${mostCommonLanesArr[0][0]}-icon`} width={'100%'} height={'100%'} />
        </Styled.TrimContainer>
      </Styled.RoleChampionWrapper>
    )
  } else {
    return (
      <Styled.MainChampRoleContainer>
        <Styled.LoadingContainer>
          <RotateSpinner size={100} />
        </Styled.LoadingContainer>
      </Styled.MainChampRoleContainer>
    )
  }
};
