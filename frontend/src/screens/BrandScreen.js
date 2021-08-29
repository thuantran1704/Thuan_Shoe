import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import { listBrandProducts } from '../actions/productActions'

const BrandScreen = ({ match }) => {
    const brand = match.params.brand
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()
    const productBrand = useSelector(state => state.productBrand)
    const { loading, error, products, page, pages } = productBrand

    console.log(products);
    useEffect(() => {
        dispatch(listBrandProducts(brand, pageNumber)

        )
    }, [dispatch, brand, pageNumber])

    return (
        <>
            <Meta title={`Home | Brand | ${brand}`} />
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item">Brand</li>
                <li class="breadcrumb-item active">{brand}</li>
            </ol>
            <h1 style={{ paddingLeft: '40%' }}>{brand} shoes</h1>
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
                                    details={`${brand}`}
                                />
                            </>
                        )
            }

        </>
    )
}

export default BrandScreen
