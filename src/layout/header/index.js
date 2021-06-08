import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Form } from 'react-bootstrap';
import UserDropdown from '../../components/UserDropDown';
import { isMobile } from "react-device-detect";
import { ToastContainer, toast } from 'react-toastify';

const navLinkStyle = {
    color: 'white',
    textDecoration: 'none'
};

const activeLinkStyle = {
    fontWeight: 'bold'
};

const HuStyle = {

};

const marginLeft = {
    marginLeft: 150
};

const bardsStyle = {
    color: 'white'
};

const browserBarsStyle = {
    ...marginLeft,
    ...bardsStyle
};

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

    useEffect(() => {
        
    }, [opeationSuccess]);

    return (
        <>
            <ToastContainer />
            <Navbar bg="primary" variant="dark">
                <Nav className="mr-auto">
                    <div style={HuStyle}>
                        <NavLink className="mr-1 navlink"
                            to="/"
                            exact
                            style={navLinkStyle}
                            activeStyle={activeNavLinkStyle}
                        >
                            Inicio
                        </NavLink>
                    </div>


                </Nav>
                <Form inline>
                    {
                        isMobile &&
                        <Nav.Link style={bardsStyle} onClick={toggleSidebar}>
                            <i className="fa fa-bars"></i>
                        </Nav.Link>
                    }
                    <UserDropdown />
                </Form>
            </Navbar>
        </>
    );
};


export default Header;