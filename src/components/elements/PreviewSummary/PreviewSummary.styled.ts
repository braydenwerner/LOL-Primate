import Image from 'next/image'
import styled from 'styled-components'

interface PreviewWrapper {
    notSmallScreen: boolean;
    gridAdjust: boolean;
}

export const PreviewWrapper = styled.div<PreviewWrapper>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: ${props => props.theme.inputBackground};
    border: 3px solid ${props => props.theme.inputBorder};
    border-radius: 10px;
    width: ${(props) => {
        if (!props.gridAdjust) return '500px'

        if (props.notSmallScreen) return '1000px'
        else if (!props.notSmallScreen) return '95%'
    }};
    z - index: 5;
`

export const PreviewTitle = styled.div`
    font-family: Varela;
    font-size: 23px;
    font-weight: 500;
    margin: 3px 0px 3px 0px;
    padding: 10px;
`

interface PreviewImage {
    layout: string;
}

export const PreviewImage = styled(Image) <PreviewImage>`
    border-radius: 10px;
`