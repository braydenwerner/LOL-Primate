import styled from 'styled-components'

interface SummonerStatsContainerProps {
    image: string;
}

export const SummonerStatsContainer = styled.div<SummonerStatsContainerProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 270px;
    height: 760px;
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-size: 300px 760px;
    background-position: center;
    margin: 10px 10px 10px 10px;
    z-index: 5;
`