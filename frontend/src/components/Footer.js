import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <div className="bg-dark" >
                <Col>
                    <Row>
                        <Container style={{ paddingTop: "30px" }}>
                            <Row>
                                <Col md={1} />
                                <Col md={5} style={{ paddingLeft: "20px" }}>
                                    <h5 className='text-center py-3'    style={{ color: "white" }}>About</h5>
                                    <p class="text-justify" style={{ color: "white" }}>
                                    This website is all about gourmet popcorn. Its footer is designed in such a way that any visitor will easily find the particular sweet they are looking for. It also incorporates an interesting retro design to make it visually appealing. Additionally, the website provides a subscription form. This will enable a visitor to know about releases of new flavors.
                                    </p>
                                </Col>
                                <Col md={1} />
                                <Col md={2}>
                                    <h5 className=' py-3'style={{ color: "white" }}>Brands</h5>
                                    <ul class="footer-links">
                                        <li><Link to="/brand/Nike" style={{ color: "white", textDecoration: 'none' }}>Nike</Link></li>
                                        <li><Link to="/brand/Adidas" style={{ color: "white", textDecoration: 'none' }}>Adidas</Link></li>
                                        <li><Link to="/brand/Converse" style={{ color: "white", textDecoration: 'none' }}>Converse</Link></li>
                                    </ul>
                                </Col>
                                <Col md={2}>
                                    <h5 className=' py-3'style={{ color: "white" }}>Categories</h5>
                                    <ul class="footer-links">
                                        <li><Link to="/category/Mens" style={{ color: "white", textDecoration: 'none' }}>Mens</Link></li>
                                        <li><Link to="/category/Womens" style={{ color: "white", textDecoration: 'none' }}>Womens</Link></li>
                                        <li><Link to="/category/Kids" style={{ color: "white", textDecoration: 'none' }}>Kids</Link></li>

                                    </ul>
                                </Col>
                            </Row>

                        </Container>
                    </Row>
                    <hr />
                    <Row>
                        <Container>
                            <Row>
                                <Col className='text-center py-3' style={{ color: "white" }}>Copyright &copy; <a href="https://www.facebook.com/thuantran878/" style={{ color: "white", textDecoration: 'none' }}>Thuận Trần (陳福順)</a> </Col>
                            </Row>
                        </Container>
                    </Row>
                </Col>
            </div>
        </footer>
    )
}

export default Footer
