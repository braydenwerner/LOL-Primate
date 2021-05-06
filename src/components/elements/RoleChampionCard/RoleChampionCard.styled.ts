import styled from 'styled-components'

export const RoleChampionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 270px;
    margin: 0px 10px 35px 10px;
    min-height: 200px;
    margin-top: 15px;
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
    position: relative;
    top: 25px;
    justify-content: center;
    width: 270px;
    height: 200px;
`