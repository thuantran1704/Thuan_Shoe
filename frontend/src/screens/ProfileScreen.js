import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Form, Table } from 'react-bootstrap-v5'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetail, updateUserProfile } from '../actions/userActions'
import { listMyOrder } from '../actions/orderActions'
import Meta from '../components/Meta'


const ProfileScreen = ({ location, history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [birthday, setBirthday] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetail = useSelector(state => state.userDetail)
    const { loading, error, user } = userDetail

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            if (!user.name) {
                dispatch(getUserDetail('profile'))
                dispatch(listMyOrder())
            } else {
                setName(user.name)
                setEmail(user.email)
                setBirthday(user.birthday)
                setPhone(user.phone)
            }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (phone.length !== 10) {
            setMessage('Phone number is not in the correct format !')
        }
        else if (password !== confirmPassword) {
            setMessage('Password do not match !')
        }
        else {
            dispatch(updateUserProfile({ id: user._id, name, email, phone, birthday, password }))
            dispatch(getUserDetail('profile'))
        }
    }

    return (
        <Row>
            <Meta title={`${userInfo.name}'s Profile`} />
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'> {message} </Message>}
                {error && <Message variant='danger'> {error} </Message>}
                {success && <Message variant='success'> Profile updated </Message>}

                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter name' value={name}
                            onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='name@example.com' value={email}
                            onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        <Form.Text className="text-muted">
                            Your email'll not be shared with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId='phone'>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type='number' placeholder='Enter your phone number'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='birthday'>
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type='date' placeholder='Enter your birthday' value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password' value={password}
                            onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='comfirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Confirm password' value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? <Loader />
                    : errorOrders ? <Message variant='danger'>{errorOrders}</Message>
                        : (
                            <Table striped bordered hover responsive className='table-secondary'>
                                <thead>
                                    <tr>
                                        <th> DATE </th>
                                        <th> TOTAL </th>
                                        <th> METHOD </th>
                                        <th> PAID </th>
                                        <th> DELIVERED </th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>${' '}{order.totalPrice}</td>
                                            <td>{order.paymentMethod}</td>
                                            <td>
                                                {order.isPaid
                                                    ? order.paidAt.substring(0, 10)
                                                    : (
                                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                    )
                                                }
                                            </td>
                                            <td>
                                                {order.isDelivered
                                                    ? order.deliveredAt.substring(0, 10)
                                                    : (
                                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                    )
                                                }
                                            </td>
                                            <td>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <Button className="btn btn-outline-secondary" variant='light'> Details </Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
            </Col>
        </Row>
    )
}

export default ProfileScreen