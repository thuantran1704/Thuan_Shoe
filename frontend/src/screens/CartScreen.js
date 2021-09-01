import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Image, ListGroup, Button, Form } from 'react-bootstrap-v5' 
import Message from '../components/Message.js'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
    const sizeF = [
        '36',
        '37',
        '38',
        '39',
        '40',
        '41',
        '42',
    ]

    const productId = match.params.id

    const qty = location.search
        ? Number(location.search.split('qty=')[1].substring(0,1)) : 1

    const size = location.search
        ? Number(location.search.split('size=')[1]) : 36

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty, size))
        }
    }, [dispatch, productId, qty, size])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                    <>
                        <ListGroup variant='flush'>

                            <ListGroup.Item >
                                <Row>
                                    <Col md={5} >
                                        <div style={{ marginLeft: "12%" }} >Product</div>
                                    </Col>

                                    <Col md={1} > <div style={{ marginLeft: "10%" }}>Price</div></Col>
                                    <Col md={2} >
                                        <div style={{ marginLeft: "10%" }}>Quantity</div>
                                    </Col>

                                    <Col md={2} >
                                        <div style={{ marginLeft: "10%" }}>Size</div>
                                    </Col>
                                </Row>

                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup variant='flush'>
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3} style={{ marginTop: "3%" }}>
                                            <Link to={`/product/${item.product}`} style={{ textDecoration: 'none' }}>{item.name}</Link>
                                        </Col>
                                        <Col md={1} style={{ marginTop: "5%" }}>${item.price}</Col>
                                        <Col md={2} style={{ marginTop: "4%" }}>
                                            <Form.Control
                                                as='select'
                                                value={item.qty}
                                                onChange={(e) =>
                                                    dispatch(
                                                        addToCart(item.product, Number(e.target.value),item.size)
                                                    )
                                                }
                                            >
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                        {/* -------------------- size --------------------*/}
                                        <Col md={2} style={{ marginTop: "4%" }}>
                                            <Form.Control
                                                as='select'
                                                value={item.size}
                                                onChange={(e) =>
                                                    dispatch(
                                                        addToCart(item.product, item.qty, Number(e.target.value))
                                                    )}>
                                                {sizeF.map(s => (
                                                    <option key={s + 1} value={s}>
                                                        {s}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>

                                        {/* <Col md={1}></Col> */}
                                        <Col md={1} style={{ marginTop: "4%" }}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>

                                </ListGroup.Item>
                            ))}

                            <ListGroup.Item>
                                <Row>
                                    <Col md={5} />
                                    <Col>
                                        <Link to='/'>Keep Shopping</Link>

                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>
                                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                items
                            </h2>
                            $
                            {cartItems
                                .reduce((acc, item) => acc + item.qty * item.price, 0)
                                .toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>

                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    Proceed To Checkout
                                </Button>
                            </Row>

                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
