import { useEffect, useState } from 'react';

import { getAPIVersion } from '../../../util/convertChampId';
import { Image } from './RoleChampionCard.styled';
import {
  Champion,
  Lane,
} from '../../../pages/ChampSelectPage';

interface RoleChampionCardProps {
  mostCommonChampions: Champion;
  mostCommonLanes: Lane;
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
}) => {
  //  put dict of champ:freq into a list of champs in descending order
  const [mostCommonChampsArr, setMostCommonChampsArr] = useState<MostCommonChampArr[]>([]);
  const [mostCommonLanesArr, setMostCommonLanesArr] = useState<MostCommonLaneArr[]>([]);

  const dataDragonAPIVersion = getAPIVersion();

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

  return (
    <div>
      <div style={{ marginTop: '20px' }}>Most played:</div>
      {mostCommonChampsArr &&
        mostCommonChampsArr.splice(0, 5).map((champion: MostCommonChampArr, i: number) => {
          return (
            <div key={i}>
              <div>
                {champion[0]}: {champion[1]}
              </div>
              <Image
                src={`http://ddragon.leagueoflegends.com/cdn/${dataDragonAPIVersion}/img/champion/${champion[0]}.png`}
              />
            </div>
          );
        })}

      <div style={{ marginTop: '20px' }}>Role:</div>
      {mostCommonLanesArr &&
        mostCommonLanesArr.map((lane: MostCommonLaneArr
          , i: number) => {
          return (
            <div key={i}>
              {lane[0]}: {lane[1]}
            </div>
          );
        })}
    </div>
  );
};
