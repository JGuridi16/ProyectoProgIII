import React from 'react';
import Header from './header';
import Router from '../router';
import { isBrowser } from 'react-device-detect';
import Spinner from 'react-bootstrap/Spinner';
import './style.scss';

const whiteWords = {
    color: 'white'
};

const bold = {
    fontWeight: 'bold'
};

const navLinkStyle = {
    ...whiteWords,
    textDecoration: 'none',
    fontSize: 15
};

const activeNavLinkStyle = {
    ...whiteWords,
    ...bold
};

const userNameStyle = {
    ...activeNavLinkStyle,
    marginTop: 15,
    fontSize: 15,
    textTransform: 'capitalize'
};

const jobInformationStyle = {
    ...whiteWords,
    marginTop: 5,
    fontSize: 15
};

const sidebarWrapper = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20
};

const userProfilePicture = {
    width: 100,
    height: 'auto'
};

class Layout extends React.Component {
    state = {
        drawerPos: 0
    };

    handleDrawer = () => {
        if (this.state.drawerPos < 2) {
            this.setState((state) => ({
                drawerPos: state.drawerPos + 2
            }));
        } else {
            this.setState({
                drawerPos: 0
            });
        }
    };

    render() {
        let drawerClass = [];
        let mainClass = [];
        if (this.state.drawerPos === 1) {
            drawerClass.push('drawerMin');
            mainClass.push('mainMin');
        } else if (this.state.drawerPos === 2) {
            if (isBrowser) {
                drawerClass.push('drawerOpen');
            } else {
                drawerClass.push('drawerOpenMobile');
            }
            mainClass.push('mainOpen');
        } else {
            drawerClass = [];
            mainClass = [];
        }
        return (
            <>
                <aside className="sidebar">

                </aside>
                <div className="App">
                    <Header toggleSidebar={this.handleDrawer} />

                    <main className={mainClass.join(' ')}>
                        {this.props.loading && (
                            <div
                                className={
                                    'display-flex flex-direction-row flex-center'
                                }
                            >
                                <Spinner
                                    animation="grow"
                                    variant="primary"
                                    className={
                                        'is-absolute center-spinner-vertically'
                                    }
                                    size="lg"
                                />
                            </div>
                        )}
                        <Router />
                    </main>
                </div>
            </>
        );
    }
}

export default Layout;
