import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'

const AllProductScreen = ({ match }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList
    
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <Meta />
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                <li class="breadcrumb-item">Product</li>
                <li class="breadcrumb-item active">All</li>
            </ol>


            <h2 class="section-title section-title-center"><b></b><span class="section-title-main">All Products</span><b></b></h2>
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'> {error} </Message>
                        : (
                            <>
                                <Row>
                                    {products.map((product) => (
                                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                            <Product product={product} />
                                        </Col>
                                    ))}
                                </Row>
                                <Paginate
                                    pages={pages}
                                    page={page}
                                    keyword={keyword ? keyword : ''}
                                />
                            </>
                        )
            }

        </>
    )
}

export default AllProductScreen
