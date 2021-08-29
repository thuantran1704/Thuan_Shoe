import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder, cancelOrder } from '../actions/orderActions'
import { ORDER_CANCEL_RESET, ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants'
import Meta from '../components/Meta'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';


function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

const OrderScreen = ({ match, history }) => {
    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderCancel = useSelector(state => state.orderCancel)
    const { loading: loadingCancel, success: successCancel } = orderCancel

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }

            document.body.appendChild(script)
        }

        if (!order || successPay || successDeliver || successCancel || order._id !== orderId) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch({ type: ORDER_CANCEL_RESET })
            dispatch(getOrderDetails(orderId))
        }
        else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }

    }, [dispatch, orderId, successPay, successDeliver, successCancel, order, userInfo, history])

    if (!loading) {

        // Calculate prices
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        order.itemsPrice = addDecimals(order.orderItems.reduce(
            (acc, item) => Number((acc + item.price * item.qty).toFixed(2)), 0))
    }

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    const cancelHandler = () => {
        setOpen(false);
        dispatch(cancelOrder(order))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return (

        loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
                : <>
                    <Row>
                        <Col md={8}>
                            <h1>Order {order._id}</h1>
                            <Meta title={`${order.user.name}'s Order`} />
                        </Col>
                        {userInfo && userInfo.isAdmin &&
                            <Col md={4}>
                                <Row>
                                    <Link to='/admin/orderlist' className='btn btn-dark my-3'> Go Back Order List</Link>
                                </Row>
                            </Col>
                        }

                    </Row>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2> Shipping </h2>
                                    <p><strong>Name : </strong> {order.user.name}</p>
                                    <p>
                                        <strong>Email : </strong>
                                        <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                                    <p>
                                        <strong>Address : </strong>
                                        {order.shippingAddress.address},{' '}
                                        {order.shippingAddress.city},{' '}
                                        {order.shippingAddress.country},{' '}
                                        {order.shippingAddress.postalCode}
                                    </p>
                                    {
                                        order.isDelivered
                                            ? <Message variant='success'>Delivered at {order.deliveredAt.substring(0, 10)}</Message>
                                            : <Message variant='info'>Not Delivered</Message>
                                    }
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method:</strong> {' '} {order.paymentMethod}
                                    </p>
                                    {
                                        order.paymentMethod === 'PayPal' && order.isPaid
                                            ? <Message variant='success'>Paid on {order.paidAt.substring(0, 10)}</Message>
                                            : order.paymentMethod === 'PayPal' && !order.isPaid &&
                                            <Message variant='info'>Not Paid</Message>
                                    }
                                    {
                                        order.paymentMethod === 'ShipCOD'
                                        && <Message variant='success'>Receive and Pay {order.paidAt}</Message>
                                    }

                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    {order.orderItems.length === 0
                                        ? <Message>Your order is empty</Message>
                                        : (
                                            <ListGroup variant='flush'>
                                                {order.orderItems.map((item, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <Row>
                                                            <Col md={2}>
                                                                <Image src={item.image} alt={item.name} fluid rounded />
                                                            </Col>
                                                            <Col  >
                                                                <Row >
                                                                    <Link to={`/product/${item.product}`} style={{ textDecoration: 'none' }}>
                                                                        {item.name}
                                                                    </Link>
                                                                </Row>
                                                            </Col>
                                                            <Col md={4} >
                                                                {item.qty} x ${item.price} = ${item.qty * item.price}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        )}
                                </ListGroup.Item>

                            </ListGroup>
                        </Col>

                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>${order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>${order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>${order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total</Col>
                                            <Col>${order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {userInfo && !userInfo.isAdmin && !order.isCancelled && !order.isPaid && order.paymentMethod === 'PayPal' && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}
                                            {
                                                sdkReady ? (<Loader />) :
                                                    (
                                                        <PayPalButton amount={order.totalPrice}
                                                            onSuccess={successPaymentHandler} />
                                                    )
                                            }
                                        </ListGroup.Item>
                                    )}

                                    {loadingDeliver && <Loader />}
                                    {userInfo && userInfo.isAdmin && order.paymentMethod === 'PayPal' && order.isPaid && !order.isDelivered && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                                    Mark As Delivered
                                                </Button>
                                            </Row>

                                        </ListGroup.Item>
                                    )}
                                    {/*--------------------- cancel order ---------------------*/}
                                    {loadingCancel && <Loader />}
                                    {userInfo && !userInfo.isAdmin && order.isCancelled === false && !order.isDelivered && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Button type='button' className='btn btn-block' color="primary" onClick={handleClickOpen}>
                                                    Cancel Order
                                                </Button>
                                                <Dialog
                                                    open={open}
                                                    onClose={handleClose}
                                                    PaperComponent={PaperComponent}
                                                    aria-labelledby="draggable-dialog-title"
                                                >
                                                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                                        Submit
                                                    </DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText>
                                                            {'     '}Are you sure to cancel this order ? {'     '}
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button autoFocus onClick={handleClose} color="primary">
                                                            Cancel
                                                        </Button>
                                                        <Button onClick={cancelHandler} color="primary">
                                                            Submit
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </Row>

                                        </ListGroup.Item>
                                    )}

                                    {userInfo && userInfo.isAdmin && !order.isCancelled && order.paymentMethod === 'ShipCOD' && !order.isDelivered && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                                    Mark As Delivered
                                                </Button>
                                            </Row>

                                        </ListGroup.Item>
                                    )}

                                    {userInfo && order.isCancelled && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    <Message variant='danger'><h5>This order was Cancelled</h5></Message>
                                                </Col>
                                            </Row>

                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
    )
}

export default OrderScreen
