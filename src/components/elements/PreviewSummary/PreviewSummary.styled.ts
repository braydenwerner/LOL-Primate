import Image from 'next/image'
import styled from 'styled-components'

interface PreviewWrapperProps {
    notSmallScreen: boolean;
    gridAdjust: boolean;
}

export const PreviewWrapper = styled.div<PreviewWrapperProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    opacity: .97;
    background-color: ${props => props.theme.inputBackground};
    border: 3px solid ${props => props.theme.inputBorder};
    border-radius: 10px;
    width: ${(props) => {
        if (!props.gridAdjust) return '500px'

        if (props.notSmallScreen) return '1000px'
        else if (!props.notSmallScreen) return '95%'
    }};
    z-index: 5;
`

export const PreviewTitle = styled.div`
    font-family: Newsreader;
    font-size: 23px;
    font-weight: 500;
    margin: 3px 0px 3px 0px;
    padding: 10px;
`

interface PreviewImageProps {
    layout: string;
}

export const PreviewImage = styled(Image) <PreviewImageProps>`
    border-radius: 10px;
`