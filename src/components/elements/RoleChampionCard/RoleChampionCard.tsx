import { useEffect, useState } from 'react';

import { getAPIVersion } from '../../../util/convertChampId';
import { Image } from './RoleChampionCard.styled';
import {
  MostCommonChampions,
  MostCommonLanes,
} from '../../../pages/ChampSelectPage';

interface RoleChampionCardProps {
  mostCommonChampions: MostCommonChampions;
  mostCommonLanes: MostCommonLanes;
}

interface MostCommonChampArr {}

interface MostCommonLanesArr {}

export const RoleChampionCard: React.FC<RoleChampionCardProps> = ({
  mostCommonChampions,
  mostCommonLanes,
}) => {
  //  put dict of champ:freq into a list of champs in descending order
  const [mostCommonChampsArr, setMostCommonChampsArr] = useState<any>();
  const [mostCommonLanesArr, setMostCommonLanesArr] = useState<any>();

  const dataDragonAPIVersion = getAPIVersion();

  useEffect(() => {
    const tempMostCommonChampArr: any = [];
    const tempMostCommonLanesArr: any = [];

    if (mostCommonChampions && Object.keys(mostCommonChampions).length > 0) {
      for (const champ in mostCommonChampions) {
        tempMostCommonChampArr.push([champ, mostCommonChampions[champ]]);
      }
      tempMostCommonChampArr.sort((a: any, b: any) => b[1] - a[1]);

      for (const lane in mostCommonLanes) {
        tempMostCommonLanesArr.push([lane, mostCommonLanes[lane]]);
      }
      tempMostCommonLanesArr.sort((a: any, b: any) => b[1] - a[1]);

      setMostCommonChampsArr(tempMostCommonChampArr);
      setMostCommonLanesArr(tempMostCommonLanesArr);
    }
  }, [mostCommonChampions, mostCommonLanes]);

  return (
    <div>
      <div style={{ marginTop: '20px' }}>Most played:</div>
      {mostCommonChampsArr &&
        mostCommonChampsArr.splice(0, 5).map((champion: any, i: number) => {
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
        mostCommonLanesArr.map((lane: any, i: number) => {
          return (
            <div key={i}>
              {lane[0]}: {lane[1]}
            </div>
          );
        })}
    </div>
  );
};
