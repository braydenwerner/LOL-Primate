import styled from 'styled-components'
import { LinearProgress } from '@material-ui/core'
import { commonColors } from '../../../styles/theme'

export const Winrate = styled.div`
    position: relative;
    bottom: 12px;
    background-color: ${commonColors.red};
    border-radius: 15px;
    font-size: 20px;
    padding: 5px;
    margin-top: 100px;
`
export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    width: 270px;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    min-height: 415px;
`

export const WinLossContainer = styled.div`
    display: flex;
    width: 90%;
    font-size: 15px;
    justify-content: space-around;
    margin: 5px 0px 2px 0px;
`

export const ProgressBar = styled(LinearProgress)`
    width: 62%;
`
export const LPDivContainer = styled.div`
    background-color: ${commonColors.red};
    border-radius: 50px;
    position: relative;
    top: 15px;
    padding: 4px;
`
export const LPDiv = styled.div`
`

export const SummonerTierContainer = styled.div`
    background-color: ${(props) => props.theme.secondary};
    border: 2px solid ${(props) => props.theme.inputBorder};
    border-radius: 105px;
`

export const RankContainer = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    bottom: 15px;
    background-color: ${commonColors.red};
    text-align: center;
    border-radius: 6px;
    width: 25px;
`

export const ProfileIcon = styled.img`
    position: relative;
    margin-top: 20px;
    border-radius: 20px;
`

export const SummonerLevel = styled.div`
    background-color: ${commonColors.red};
    position: relative;
    bottom: 12px;
    font-size: 12px;
    border-radius: 10px;
    padding: 2px;
`

export const noDataText = styled.div`
    font-size: 20px;
    padding: 10px;
`