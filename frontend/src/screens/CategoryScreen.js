import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import { listCategoryProducts } from '../actions/productActions'

const CategoryScreen = ({ match }) => {
    const category = match.params.category
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()
    const productCategory = useSelector(state => state.productCategory)
    const { loading, error, products, page, pages } = productCategory

    console.log(products);
    useEffect(() => {
        dispatch(listCategoryProducts(category, pageNumber)

        )
    }, [dispatch, category, pageNumber])

    return (
        <>
            <Meta title={`Home | Category | ${category}`} />
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item">Category</li>
                <li class="breadcrumb-item active">{category}</li>
            </ol>
            <h1 style={{ paddingLeft: '40%' }}>{category} shoes</h1>
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'> {error} </Message>
                        : (
                            <>
                                <Row>
                                    {products && products.map((product) => (
                                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                            <Product product={product} />
                                        </Col>
                                    ))}
                                </Row>
                                <Paginate
                                    pages={pages}
                                    page={page}
                                    details={`${category}`}
                                />
                            </>
                        )
            }

        </>
    )
}

export default CategoryScreen
