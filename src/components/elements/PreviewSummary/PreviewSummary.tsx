import { Grid } from '@material-ui/core'

import * as Styled from './PreviewSummary.styled'
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { StyledGridContainer, CenterContainer } from '../../../styles/constantStyles';

export const PreviewSummary: React.FC = () => {
    const notSmallScreen = useMediaQuery('(min-width: 1050px)')
    const gridAdjust = useMediaQuery('(min-width: 945px)')
    const notMobile = useMediaQuery('(min-width: 550px)')

    if (notMobile) {
        return (
            <CenterContainer>
                <Styled.PreviewWrapper notSmallScreen={notSmallScreen} gridAdjust={gridAdjust}>
                    <Styled.PreviewTitle>
                        Quickly obtain statistics from players in your lobby!
                    </Styled.PreviewTitle>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        spacing={3}
                    >
                        <StyledGridContainer item xs style={{ marginBottom: '50px' }}>
                            <Styled.PreviewImage src="/images/rankedpreview.png" layout='fixed' alt='rankedpreview-img' width={428.5} height={260} />
                        </StyledGridContainer>
                        <StyledGridContainer item xs style={{ marginBottom: '50px' }}>
                            <Styled.PreviewImage src="/images/previewchampselectjoin.png" layout='fixed' alt='champselectjoin-img' width={428.5} height={260} />
                        </StyledGridContainer>
                    </Grid>
                </Styled.PreviewWrapper>
            </CenterContainer >
        );
    } else return <></>
}