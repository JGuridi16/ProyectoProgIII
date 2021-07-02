import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Navbar, Nav, Form, Button, Container, Row } from 'react-bootstrap';
import UserDropdown from '../../components/UserDropDown';
import { isBrowser, isMobile } from "react-device-detect";
import { gapi } from 'gapi-script';

const navLinkStyle = {
    color: 'white',
    textDecoration: 'none'
}

const activeLinkStyle = {
    fontWeight: 'bold'
}

const HuStyle = {
    marginTop: 10,
}

const marginLeft = {
    marginLeft: 150
}

const bardsStyle = {
    color: 'white'
}

const browserBarsStyle = {
    ...marginLeft,
    ...bardsStyle
}

const whiteWords = {
    color: 'white'
};

const bold = {
    fontWeight: 'bold'
};

const activeNavLinkStyle = {
    ...whiteWords,
    ...bold
};



const Header = ({ toggleSidebar, opeationSuccess, isLoggedIn, setIsLoggedIn }) => {
    const history = useHistory();

    const signOut = () => {
        let auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut()
        .then(() => {
            setIsLoggedIn(false);
            history.push('/');
            window.location.reload();
        });
    }
    return (
        <>
            <Navbar bg="primary" variant="dark" className="px-4">
                <Container className="mr-auto">
                    <Row className="d-flex justify-between">
                        <div style={HuStyle}>
                            <NavLink className="mr-3"
                                to="/"
                                exact
                                style={navLinkStyle}
                                activeStyle={activeNavLinkStyle}
                            >
                                Inicio
                            </NavLink>
                            <Button className="text-white" onClick={() => signOut()}>Log out</Button>
                        </div>
                    </Row>
                </Container>
            </Navbar>
            <Form inline>
                <UserDropdown />
            </Form>
        </>
    )
}


export default Header;