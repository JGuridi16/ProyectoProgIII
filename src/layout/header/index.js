import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Form } from 'react-bootstrap';
import UserDropdown from '../../components/UserDropDown';
import { isBrowser, isMobile } from "react-device-detect";

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

const Header = ({ toggleSidebar, opeationSuccess }) => {

    return (
        <>
            <Navbar bg="primary" variant="dark" className="px-4">
                <Nav className="mr-auto">
                    <div style={HuStyle}> 
                        <NavLink className="mr-3"
                            to="/"
                            exact
                            style={navLinkStyle}
                            activeStyle={activeNavLinkStyle}
                        >
                            Inicio
                        </NavLink>
                    </div>
                </Nav>
            </Navbar>
            <Form inline>
                <UserDropdown />
            </Form>
        </>
    )
}


export default Header;