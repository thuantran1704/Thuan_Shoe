import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, NavDropdown } from 'react-bootstrap-v5'
import { LinkContainer } from 'react-router-bootstrap'

const Navigation = () => {
    return (
        <>
            <ul class="nav justify-content-center">

                <Nav class="nav-item">
                    <Link class="nav-link active" to="/">Home</Link>
                </Nav>
                <Nav className="ml-auto">

                    <NavDropdown title='Brands'>
                        <LinkContainer to='/brand/Nike'>
                            <NavDropdown.Item><strong>Nike</strong></NavDropdown.Item>
                        </LinkContainer>
                        <div class="dropdown-divider" />

                        <LinkContainer to='/brand/Adidas'>
                            <NavDropdown.Item><strong>Adidas</strong></NavDropdown.Item>
                        </LinkContainer>
                        <div class="dropdown-divider" />

                        <LinkContainer to='/brand/Converse'>
                            <NavDropdown.Item><strong>Converse</strong></NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                </Nav>

                <Nav className="ml-auto">
                    <NavDropdown title='Categories'>
                        <LinkContainer to='/category/Mens'>
                            <NavDropdown.Item><strong>Mens</strong></NavDropdown.Item>
                        </LinkContainer>
                        <div class="dropdown-divider" />

                        <LinkContainer to='/category/Womens'>
                            <NavDropdown.Item><strong>Womens</strong></NavDropdown.Item>
                        </LinkContainer>
                        <div class="dropdown-divider" />

                        <LinkContainer to='/category/Kids'>
                            <NavDropdown.Item><strong>Kids</strong></NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                </Nav>
                <Nav class="nav-item">
                    <Link class="nav-link" to="/about" tabindex="-1" aria-disabled="true">About</Link>
                </Nav>

            </ul>
            <hr />
        </>
    )
}

export default Navigation