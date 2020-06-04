import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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

export const LoginButton = (func) => {
  return (
    <NavItem>
      <Button
        className="nav-link btn-neutral"
        color="info"
        id="upgrade-to-pro"
        onClick={() => func.func.auth.login()}
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

export const ProfileStatus = (func) => {
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
          onClick={() => func.func.auth.logout()}
        >
          <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
        Log Out
      </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

const Header = (props) => {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
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
              href="https://demos.creative-tim.com/now-ui-kit-react/#/index?ref=nukr-index-navbar"
              target="_blank"
              id="navbar-brand"
            >
              Now UI Kit React
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
                ? <LoginButton func={props} />
                : <ProfileStatus func={props} />
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

export default connect(mapStateToProps)(Header);

// original routing
// <div>
    //   <Link to='/' style={{ padding: '5px' }}>
    //     Home
    //     </Link>
    //   <Link to='/profile' style={{ padding: '5px' }}>
    //     Profile
    //     </Link>
    //   <Link to='/posts' style={{ padding: '5px' }}>
    //     Forum
    //     </Link>
    //   {/* <Link to='/component1' style={{ padding: '5px' }}>
    //     Component 1
    //     </Link>
    //   <Link to='/container1' style={{ padding: '5px' }}>
    //     Container 1
    //     </Link>
    //   <Link to='/form1' style={{ padding: '5px' }}>
    //     Form 1
    //     </Link>
    //   <Link to='/renderlist' style={{ padding: '5px' }}>
    //     List
    //     </Link> */}

    //   {/* <Link to='/privateroute' style={{ padding: '5px' }}>
    //     Private Route
    //     </Link> */}
    //   {!props.is_authenticated
    //     ? <button onClick={() => props.auth.login()}>Login</button>
    //     : <button onClick={() => props.auth.logout()}>Logout</button>
    //   }
    //   <br />
    //   <br />
    //   <br />
    // </div>