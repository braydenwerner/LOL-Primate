import styled from 'styled-components'
import { LinearProgress } from '@material-ui/core'

export const ProfileIcon = styled.img`
    border-radius: 20px;
`

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #333341;
    width: 90%;
    max-width: 300px;
    min-width: 200px;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
`

export const WinLossContainer = styled.div`
    display: flex;
    width: 90%;
    font-size: 15px;
    justify-content: space-around;
    margin: 5px 0px 2px 0px;
`

export const ProgressBar = styled(LinearProgress)`
    width: 55%;
`

export const LPDiv = styled.div`
    position: relative;
    top: 15px;
`

export const RankContainer = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    bottom: 15px;
    background-color: #C6493A;
    text-align: center;
    border-radius: 6px;
    width: 25px;
`

export const SummonerLevel = styled.div`
    background-color: #C6493A;
    position: relative;
    bottom: 12px;
    font-size: 12px;
    border-radius: 10px;
    padding: 2px;
`