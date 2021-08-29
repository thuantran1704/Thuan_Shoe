import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listOrders } from '../actions/orderActions'
import { ORDER_DETAILS_RESET } from '../constants/orderConstants'
import Meta from '../components/Meta'

const OrderListScreen = ({ history, match }) => {
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders, pages, page, count } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders(pageNumber))
            dispatch({ type: ORDER_DETAILS_RESET })
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo, pageNumber])

    return (
        <>
            <Meta title={'Manager Orders'} />

            <h1>Orders {count && `(${count})`}</h1>
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'> {error}</Message>
                        : (
                            <>
                                <Table striped bordered hover responsive className='table-sm'>
                                    <thead>
                                        <tr>
                                            <th>USER</th>
                                            <th>DATE</th>
                                            <th>TOTAL</th>
                                            <th>METHOD</th>
                                            {/* <th>PAID</th>
                                            <th>DELIVERED</th> */}
                                            <th>STATUS</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order._id}>
                                                <td>{order.user && order.user.name}</td>
                                                <td>{order.createdAt.substring(0, 10)}</td>
                                                <td>{order.totalPrice}</td>
                                                <td>{order.paymentMethod}</td>

                                                {/* <td>
                                                    {
                                                        order.isPaid ? (order.paidAt.substring(0, 10))
                                                            : (<i className='fas fa-times' style={{ color: 'red' }}></i>)
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        order.isDelivered ? (order.deliveredAt.substring(0, 10))
                                                            : (<i className='fas fa-times' style={{ color: 'red' }}></i>)
                                                    }
                                                </td> */}
                                                <td>
                                                    {order.isCancelled ? (<i className='fas fa-times' style={{ color: 'red' }}> Cancelled</i>) :
                                                        order.isDelivered ? (<i className='fas fa-check' style={{ color: 'green' }}> Done</i>) :
                                                            order.paymentMethod === "ShipCOD" ? (<i className='fas fa-truck' style={{ color: 'primary' }}>    Delivery Now</i>) :
                                                                order.paymentMethod === "PayPal" && order.isPaid
                                                                    ? (<i className='fas fa-truck' style={{ color: 'primary' }}>    Delivery Now</i>)
                                                                    : (<i className='fab fa-cc-paypal' style={{ color: 'orange' }}> Waiting to Paid</i>)
                                                    }
                                                </td>
                                                <td>
                                                    <LinkContainer to={`/order/${order._id}`}>
                                                        <Button variant='light' className='btn-sm'>
                                                            Details
                                                        </Button>
                                                    </LinkContainer>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <Paginate
                                    pages={pages}
                                    page={page}
                                    isAdmin={true}
                                    details='orderlist' />
                            </>
                        )
            }
        </>
    )
}

export default OrderListScreen
