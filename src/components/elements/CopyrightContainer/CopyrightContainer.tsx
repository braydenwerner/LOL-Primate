import styled from 'styled-components'

export const CopyrightContainer = () => {

    return (
        <CopyrightWrapper>
            <CopyrightText>
                © 2012-2021
                LOL Gorilla
                LOL Gorilla isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing
                League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
            </CopyrightText>
        </CopyrightWrapper>
    )
}

const CopyrightWrapper = styled.div`
    position: relative;
    borderTop: 1px solid #E7E7E,
    textAlign: center,
    padding: 20px,
    left: 0,
    bottom: 0;
`

const CopyrightText = styled.div`
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 10px;
`
