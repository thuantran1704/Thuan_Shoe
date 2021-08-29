import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image, Row, Col } from 'react-bootstrap'
import Message from './Message'
import Loader from './Loader'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return (
        loading ? <Loader /> : error
            ? <Message variant='danger'>{error}</Message>
            : (

                <Carousel pause='hover' style={{ backgroundColor: "#220000", marginLeft:"-115px",marginRight:"-110px" }} >
                    {products.map(product => (
                        <Carousel.Item key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <Row>
                                    <Col  md={6} style={{ paddingLeft: '10%' }} >
                                        <Image src={product.images[0].url} alt={product.name} roundedCircle></Image>
                                    </Col>
                                    <Col md={5}>
                                        <Carousel.Caption>
                                            <h2 >{product.name} </h2>
                                            <h3>Only ${product.price} </h3>
                                        </Carousel.Caption>
                                    </Col>
                                </Row>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>

            )
    )
}

export default ProductCarousel
