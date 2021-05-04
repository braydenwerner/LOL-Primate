import { useEffect, useState } from 'react';

import { getAPIVersion } from '../../../util/convertChampId';
import {
  Champion,
  Lane,
  SpecificMatch,
  SpecificMatchArr
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

  const dataDragonAPIVersion = getAPIVersion();

  return (
    <>
      <Styled.RoleChampionContainer>
        <Styled.MainChampRoleContainer>
          {mostCommonChampions &&
            mostCommonChampsArr[0] && (
              <>
                <img
                  width={50}
                  height={50}
                  src={`http://ddragon.leagueoflegends.com/cdn/${dataDragonAPIVersion}/img/champion/${mostCommonChampsArr[0][0]}.png`}
                />
              </>
            )}
          {mostCommonLanesArr &&
            mostCommonLanesArr[0] && (
              <div>{mostCommonLanesArr[0][0]}</div>
            )}
        </Styled.MainChampRoleContainer>
        {specificMatchArr && specificMatchArr.map((match: SpecificMatch, i: number) => {
          <Styled.MatchStatContainer key={i}>
            <div>{match.kills}</div>
            <div>{match.deaths}</div>
            <div>{match.assists}</div>
          </Styled.MatchStatContainer>
        })}
      </Styled.RoleChampionContainer>
    </>
  )
};
