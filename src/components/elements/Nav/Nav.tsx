import Image from 'next/image'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

import { NavIcon } from './Nav.styled'

export const Nav: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <NavIcon edge="start" color="inherit" aria-label="menu" >
                    <Image src='/images/logo.png' alt='LOL-Dodge-Logo' width={50} height={50} />
                </NavIcon>
                <Typography variant="h6" >
                    LOL Dodge
                </Typography>
            </Toolbar>
        </AppBar>
    );
}