import { RoleChampionCard, SummonerProfileCard } from '../../elements/index'
import { Grid } from '@material-ui/core'

interface SummonerStatsProps {
  summonerData: any
  mostCommonLanes: any
  mostCommonChampions: any
}

export const SummonerStats: React.FC<SummonerStatsProps> = ({
  summonerData,
  mostCommonLanes,
  mostCommonChampions
}) => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      style={{ marginTop: '20px' }}
    >
      {Object.keys(summonerData).map((summonerObjKey: string, i: number) => {
        return (
          <Grid className="summoner-data-container" item xs={2} key={i}>
            <SummonerProfileCard
              summonerData={summonerData}
              summonerObjKey={summonerObjKey}
            />
            <RoleChampionCard
              mostCommonChampions={
                mostCommonChampions[summonerData[summonerObjKey].accountId]
              }
              mostCommonLanes={
                mostCommonLanes[summonerData[summonerObjKey].accountId]
              }
            />
          </Grid>
        )
      })}
    </Grid>
  )
}
