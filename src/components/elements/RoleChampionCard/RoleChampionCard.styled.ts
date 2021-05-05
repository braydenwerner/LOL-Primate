import styled from 'styled-components'

export const RoleChampionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #333341;
    width: 270px;
    align-items: center;
    justify-content: center;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    margin: 0px 10px 35px 10px;
    min-height: 200px;
`

export const MainChampRoleContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 10px;
`

export const MatchStatContainer = styled.div`
    display: flex;
`

interface KDAContainerProps {
    color: string;
}

export const KDAContainer = styled.div<KDAContainerProps>`
    display: flex;
    justify-content: center;
    width: 100px;
    background-color: ${props => props.color};
    margin: 3px 0px 3px 0px
`

export const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    background-color: #333341;
    width: 270px;
    height: 100%;
    padding-top: 35px;
`

export const TrimContainer = styled.div`
    
`
