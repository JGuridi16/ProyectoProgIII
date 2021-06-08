import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useHistory } from "react-router";

const UserDropdown = (props) => {
    const history = useHistory();

    const logout = () => {
        props.SetUser({});
        props.SetLoggedIn(false);
        history.push({
            pathname: "/",
            state: {}
        });
    };

    return (
        <DropdownButton
            alignRight
            title={
                <i className={'fa fa-user'}></i>
            }
            id="dropdown-menu-align-right"
        >
            <Dropdown.Item>{'Miguelito'}</Dropdown.Item>
            <Dropdown.Item onClick={logout}>Salir</Dropdown.Item>
        </DropdownButton>
    );
};

export default UserDropdown;