import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap-v5'
import Message from '../components/Message'
import Loader from '../components/Loader'
import AdminSearchBox from '../components/AdminSearchBox'
import Paginate from '../components/Paginate'
import { listProducts, deleteProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Meta from '../components/Meta'

const ProductListScreen = ({ history, match }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page, count } = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDelete = useSelector(state => state.productDelete)
    const {
        error: errorDelete,
        success: successDelete } = productDelete

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        dispatch(listProducts(keyword, pageNumber))

    }, [dispatch, history, successDelete,keyword, userInfo, pageNumber])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure ?')) {
            dispatch(deleteProduct(id))
        }
    }

    return (
        <>
            <Meta title={'Manager Products'} />

            <Row className='align-items-center'>
                <Col md={4}>
                    <h1>Products {count && `(${count})`}</h1>
                </Col>
                <Col className='btn btn-right'>
                    <Route render={({ history }) => <AdminSearchBox history={history} type="products" />} />

                </Col>
                <Col className='btn btn-right'>
                    <LinkContainer to={`/admin/product/create`}>
                        <Button className='btn btn-primary'>
                            <i className='fas fa-plus'></i>
                            {' '} Create Product
                        </Button>

                    </LinkContainer>

                </Col>

            </Row>
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'> {error}</Message>
                        : (
                            <>
                                <Table striped bordered hover responsive className='table-secondary'>
                                    <thead>
                                        <tr>
                                            <th>NAME</th>
                                            <th>PRICE</th>
                                            <th>CATEGORY</th>
                                            <th>BRAND</th>
                                            <th>METHOD</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product => (
                                            <tr key={product._id}>
                                                <td>{product.name}</td>
                                                <td>${product.price}</td>
                                                <td>{product.category}</td>
                                                <td>{product.brand}</td>
                                                <td>
                                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                        <Button variant='light' className='btn-sm'>
                                                            <i className='fas fa-edit'></i>
                                                            EDIT
                                                        </Button>
                                                    </LinkContainer>
                                                    <Button variant='danger' className='btn-sm'
                                                        onClick={() => deleteHandler(product._id)}>
                                                        <i className='fas fa-trash'></i>
                                                        {' '}DELETE
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <Paginate
                                    pages={pages}
                                    page={page}
                                    keyword={keyword ? keyword : ''}
                                    isAdmin={true}
                                    details='productlist' />
                            </>
                        )
            }
        </>
    )
}

export default ProductListScreen
