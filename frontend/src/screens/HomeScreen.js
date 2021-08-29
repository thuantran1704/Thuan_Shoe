import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import ProductCarousel from '../components/ProductCarousel'
import { listProducts, listTopProductsByBrand, listTopProductsByCategory } from '../actions/productActions'
import SimpleImageSlider from "react-simple-image-slider";

// import { ComparisonSlider } from 'react-comparison-slider'

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const brand = "Adidas"
    const category = "Womens"

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const productTopRatedByBrand = useSelector(state => state.productTopRatedByBrand)
    const { loading: loading1, error: error1, products: productsTopRatedByBrand } = productTopRatedByBrand

    const productTopRatedByCategory = useSelector(state => state.productTopRatedByCategory)
    const { loading: loading2, error: error2, products: productsTopRatedByCategory } = productTopRatedByCategory

    const images = [
        { url: "http://res.cloudinary.com/dlodr7b0z/image/upload/v1629892628/shop/z3i6ndgwegrgijgnzyjb.jpg" },
        { url: "http://res.cloudinary.com/dlodr7b0z/image/upload/v1629892698/shop/elspkzrsrc49pitru5ma.jpg" },
        { url: "http://res.cloudinary.com/dlodr7b0z/image/upload/v1629892984/shop/hkiwohtzqhfvwuw1fi2q.jpg" },

    ];
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
        dispatch(listTopProductsByBrand(brand))
        dispatch(listTopProductsByCategory(category))

    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <Meta />

            {!keyword ? <ProductCarousel />
                : <Link to='/' className='btn btn-light'>Go Back</Link>
            }
            <hr />
            <Row>
                <Col md={4}>
                    <Link to={"/brand/Nike"}>

                        <div class="card bg-dark text-dark">
                            <img src="../images/nike.png" alt="Card image" width="415"
                                height="550" />
                            <div class="card-img-overlay">
                            </div>
                        </div>
                    </Link>
                </Col>
                <Col md={4}>
                    <Link to={"/brand/Converse"}>

                        <div class="card bg-dark text-dark">
                            <img src="../images/Converse.jpg" alt="Card image" width="415"
                                height="550" />
                        </div>
                    </Link>
                </Col><Col md={4}>
                    <Link to={"/brand/Adidas"}>

                        <div class="card bg-dark text-dark">
                            <img src="../images/adidas.jpg" alt="Card image" width="415"
                                height="550" />
                        </div>
                    </Link>
                </Col>

            </Row>
            <br />
            <h2 class="section-title section-title-center"><b></b><span class="section-title-main">Most Rated of Adidas </span><b></b></h2>
            {
                loading1 ? <Loader />
                    : error1 ? <Message variant='danger'> {error1} </Message>
                        : (
                            <>
                                <Row>
                                    {productsTopRatedByBrand.map((product) => (
                                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                            <Product product={product} />
                                        </Col>
                                    ))}
                                </Row>
                            </>
                        )
            }
            <hr />
            <div className='text-center py-3'>
                <SimpleImageSlider
                    width={1560}
                    height={600}
                    images={images}
                    showBullets={true}
                    showNavs={true}
                    style={{marginLeft:"-130px"}}
                />
            </div>
            <br />
            <h2 class="section-title section-title-center"><b></b><span class="section-title-main">Women's favorite shoes</span><b></b></h2>
            {
                loading2 ? <Loader />
                    : error2 ? <Message variant='danger'> {error2} </Message>
                        : (
                            <>
                                <Row>
                                    {productsTopRatedByCategory.map((product) => (
                                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                            <Product product={product} />
                                        </Col>
                                    ))}
                                </Row>
                            </>
                        )
            }
            <hr />

            <h2 class="section-title section-title-center"><b></b><span class="section-title-main">Lastest Products</span><b></b></h2>
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
                                <div class="section-title section-title-center"><b></b><Link to="/allproduct">See All Products</Link><b></b></div>
                            </>
                        )

            }

        </>
    )
}

export default HomeScreen
