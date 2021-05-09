import Image from 'next/image'
import { AppBar, Toolbar } from '@material-ui/core'

import { NavIcon } from './Nav.styled'

export const Nav: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <NavIcon edge="start" color="inherit" aria-label="menu" onClick={() => window.location.reload()}>
                    <Image src='/images/lolgorillanav.png' width={219.375} height={40.75} alt='lolgorilla-title-img' />
                </NavIcon>
            </Toolbar>
        </AppBar>
    );
}