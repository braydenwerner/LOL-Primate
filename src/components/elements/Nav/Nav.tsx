import Image from 'next/image'
import { AppBar, Toolbar } from '@material-ui/core'

import { NavIcon } from './Nav.styled'

export const Nav: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <NavIcon edge="start" color="inherit" aria-label="menu" onClick={() => window.location.reload()}>
                    <Image src='/images/lolprimatenav.png' width={211.67} height={35.8} alt='lolprimate-title-img' />
                </NavIcon>
            </Toolbar>
        </AppBar>
    );
}