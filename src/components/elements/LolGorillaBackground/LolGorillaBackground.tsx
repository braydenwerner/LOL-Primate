import Image from 'next/image'
import styled from 'styled-components'

export const LolGorillaBackground = () => {
    return (
        <BackgroundImageContainer>
            <BackgroundImage
                width={982.5}
                height={1335}
                src='/images/lolgorilla.png'
                alt='lol-gorilla-background'
            />
        </BackgroundImageContainer>
    )
}

const BackgroundImageContainer = styled.div`
    position: absolute;
    top: 0px;
    display: flex;
    width: 100%;
    justify-content: center;
    z-index: -1;
    min-width: 700px;
`

const BackgroundImage = styled(Image)`
`
