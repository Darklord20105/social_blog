import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from "../utils/history"
import Auth from "../utils/auth";

// reactstrap components
import {
    Button,
    Collapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    UncontrolledTooltip
} from "reactstrap";

export const auth = new Auth();

const LoginButton = (func) => {
    console.log(func)
    return (
        <NavItem>
            <Button
                className="nav-link d-block btn btn-info btn-neutral"
                style={{ width: "-webkit-fill-available" }}
                color="info"
                id="upgrade-to-pro"
                onClick={() => func.func.login()}
            >
                <i className="now-ui-icons arrows-1_share-66 mr-1"></i>
                <p>Log In</p>
            </Button>
            <UncontrolledTooltip target="#upgrade-to-pro">
                Login With Your Account
        </UncontrolledTooltip>
        </NavItem>
    )
}

const ProfileStatus = (func) => {
    console.log(func)
    return (
        <UncontrolledDropdown nav>
            <DropdownToggle
                caret
                color="default"
                href="#pablo"
                nav
                onClick={e => e.preventDefault()}
            >
                <i className="now-ui-icons users_circle-08 mr-1"></i>
                <p>My Account </p>
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem to="/profile" tag={Link}>
                    <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                    Edit My Profile
                </DropdownItem>
                <DropdownItem
                    onClick={() => { func.func.logout() }}
                >
                    <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
                    Log Out
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

const NavigationBar = (props) => {
    const [navbarColor, setNavbarColor] = React.useState("navbar-info");
    const [collapseOpen, setCollapseOpen] = React.useState(false);
    console.log(props)
    console.log(auth)

    React.useEffect(() => {
        const updateNavbarColor = () => {
            if (
                document.documentElement.scrollTop > 399 ||
                document.body.scrollTop > 399
            ) {
                setNavbarColor("");
            } else if (
                document.documentElement.scrollTop < 400 ||
                document.body.scrollTop < 400
            ) {
                setNavbarColor("navbar-info");
            }
        };
        window.addEventListener("scroll", updateNavbarColor);
        return function cleanup() {
            window.removeEventListener("scroll", updateNavbarColor);
        };
    });

    return (
        <>
            {collapseOpen ? (
                <div
                    id="bodyClick"
                    onClick={() => {
                        document.documentElement.classList.toggle("nav-open");
                        setCollapseOpen(false);
                    }}
                />
            ) : null}
            <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
                <Container>
                    <div className="navbar-translate">
                        <NavbarBrand
                            tag={Link}
                            id="navbar-brand"
                            to="/"
                        >Now UI Kit React
                            {/* <Link >Now UI Kit React</Link> */}
                        </NavbarBrand>
                        <UncontrolledTooltip target="#navbar-brand">
                            Designed by Invision. Coded by Creative Tim
                            </UncontrolledTooltip>
                        <button
                            className="navbar-toggler navbar-toggler"
                            onClick={() => {
                                document.documentElement.classList.toggle("nav-open");
                                setCollapseOpen(!collapseOpen);
                            }}
                            aria-expanded={collapseOpen}
                            type="button"
                        >
                            <span className="navbar-toggler-bar top-bar"></span>
                            <span className="navbar-toggler-bar middle-bar"></span>
                            <span className="navbar-toggler-bar bottom-bar"></span>
                        </button>
                    </div>
                    <Collapse
                        className="justify-content-end"
                        isOpen={collapseOpen}
                        navbar
                    >
                        <Nav navbar>
                            <NavItem>
                                <NavLink
                                    to="/posts" tag={Link}
                                    id="go-to-blog"
                                >
                                    <i className="now-ui-icons arrows-1_cloud-download-93"></i>
                                    <p>Blog</p>
                                </NavLink>
                                <UncontrolledTooltip target="#go-to-blog">
                                    See Whats New in Our Blog
                                </UncontrolledTooltip>
                            </NavItem>
                            {!props.is_authenticated
                                ? <LoginButton func={auth} />
                                : <ProfileStatus func={auth} />
                            }
                            <NavItem>
                                <NavLink
                                    href="https://twitter.com/CreativeTim?ref=creativetim"
                                    target="_blank"
                                    id="twitter-tooltip"
                                >
                                    <i className="fab fa-twitter"></i>
                                    <p className="d-lg-none d-xl-none">Twitter</p>
                                </NavLink>
                                <UncontrolledTooltip target="#twitter-tooltip">
                                    Follow us on Twitter
                                </UncontrolledTooltip>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href="https://www.facebook.com/CreativeTim?ref=creativetim"
                                    target="_blank"
                                    id="facebook-tooltip"
                                >
                                    <i className="fab fa-facebook-square"></i>
                                    <p className="d-lg-none d-xl-none">Facebook</p>
                                </NavLink>
                                <UncontrolledTooltip target="#facebook-tooltip">
                                    Like us on Facebook
                                </UncontrolledTooltip>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
                                    target="_blank"
                                    id="instagram-tooltip"
                                >
                                    <i className="fab fa-instagram"></i>
                                    <p className="d-lg-none d-xl-none">Instagram</p>
                                </NavLink>
                                <UncontrolledTooltip target="#instagram-tooltip">
                                    Follow us on Instagram
                                </UncontrolledTooltip>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </>
    );
}

function mapStateToProps(state) {
    return {
        is_authenticated: state.auth_reducer.is_authenticated,
    }
}

export default connect(mapStateToProps)(NavigationBar);
