import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap-v5'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'
// import { Link } from 'react-router-dom'

const Header = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand >Thuận's Shoe</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Collapse className='justify-content-end' id='basic-navbar-nav'>
                        {/* <Nav class="mx-auto order-0">
                            //add something here like brand, category in future
                        </Nav> */}
                        <Nav className="ml-auto">
                            <Route render={({ history }) => <SearchBox history={history} />} />
                            {userInfo && userInfo.isAdmin ? (
                                <NavDropdown title='Manager' id='adminmenu'>
                                    
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>  Users </NavDropdown.Item>
                                    </LinkContainer>
                                    <div class="dropdown-divider" />

                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item> Products </NavDropdown.Item>
                                    </LinkContainer>
                                    <div class="dropdown-divider" />

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item> Orders </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/cart'>
                                    <Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                                </LinkContainer>)
                            }

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            {/* <i className="fa fa-user fa-fw" /> */}
                                            {' '}Profile </NavDropdown.Item>
                                    </LinkContainer>
                                    <div class="dropdown-divider" />

                                    <NavDropdown.Item onClick={logoutHandler}>
                                        {/* <i className="fa fa-sign-out fa-fw" /> */}
                                        Logout </NavDropdown.Item>
                                </NavDropdown>

                            )
                                : <LinkContainer to='/login'>
                                    <Nav.Link><i className='fas fa-user'></i> Sign In</Nav.Link>
                                </LinkContainer>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </header >
    )
}

export default Header

