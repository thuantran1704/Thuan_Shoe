import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Image, Row, Col, Toast } from 'react-bootstrap-v5'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductCreateScreen = ({ history }) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [images, setImages] = useState([])
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading] = useState(false)
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate } = productCreate

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET })
            history.push('/admin/productlist')
        }
    }, [dispatch, history, successCreate])

    const submitHandler = (e) => {
        e.preventDefault()
        if (name.trim() === "") {
            setMessage('Name must not be empty !')
        }
        else if (price <= 0) {
            setMessage('Price must be greater than 0 !')
        }
        else if (images.length === 0) {
            setMessage('Must have at least 1 image !')
        }
        else if (brand.trim() === "") {
            setMessage('Brand must not be empty !')
        }
        else if (category.trim() === "") {
            setMessage('Category must not be empty !')
        }
        else if (description.trim() === "") {
            setMessage('Description must not be empty !')
        }
        else if (countInStock < 0) {
            setMessage('Count In Stock must not be lower than 0 !')
        }
        else {
            dispatch(createProduct(name, price, images, brand, category, countInStock, description))
        }
    }

    const uploadFileHandler = async (e) => {

        const file = e.target.files[0]
        if (!file) {
            return alert.error('File not exist!')
        }
        if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
            return alert.error('File format is incorrect!')
        }
        if (file.size > 1024 * 1024 * 5) {
            return alert.error('File too large!')
        }

        let formData = new FormData()
        formData.append('file', file)

        const res = await axios.post('/api/upload', formData, {
            headers: { 'content-type': 'multipart/form-data' }
        })
        console.log(res.data);
        setImages(oldArray => [...oldArray, res.data])
    }

    return (
        <>
            <Row>
                <Col>
                    <Link to='/admin/productlist' className='btn btn-light my-3'> Go Back </Link>

                </Col>
                {/* {message &&
                    <Toast show={showA} onClose={toggleShowA} delay={6000} autohide bg='danger'>
                        <Toast.Header>
                            <strong className="me-auto">Warning !</strong>

                        </Toast.Header>
                        <Toast.Body>{message}</Toast.Body>
                    </Toast>
                } */}
            </Row>
            <FormContainer>
                <h1>Create Product</h1>
                {loadingCreate ? <Loader />
                    : errorCreate ? <Message variant='danger'>{errorCreate}</Message>
                        : (
                            <>
                                {message && <Message variant='danger'> {message} </Message>}
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='name'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type='name' placeholder='Enter name' value={name}
                                            onChange={(e) => setName(e.target.value)}></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='price'>
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type='number' placeholder='Enter price' value={price}
                                            onChange={(e) => setPrice(e.target.value)}></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='image1'>
                                        <Form.Label>Image From Left</Form.Label>
                                        {!images[0] ?
                                            (
                                                <>
                                                    <Form.Control type='text' placeholder='Enter image URL' value={images}
                                                        onChange={(e) => setImages[0](e.target.value)}></Form.Control>
                                                    <Form.File id='image-file'
                                                        // label='Choose Image'
                                                        custom
                                                        onChange={uploadFileHandler}>

                                                    </Form.File>
                                                </>
                                            ) : (
                                                <Image src={images[0].url} width="150" height="150" style={{ marginLeft: "20px" }} />
                                            )}
                                        {uploading && <Loader />}
                                    </Form.Group>


                                    <Form.Group controlId='image2'>
                                        <Form.Label>Image From Right</Form.Label>
                                        {!images[1] ?
                                            (
                                                <>
                                                    <Form.Control type='text' placeholder='Enter image URL' value={images}
                                                        onChange={(e) => setImages[1](e.target.value)}></Form.Control>
                                                    <Form.File id='image-file'
                                                        // label='Choose Image'
                                                        custom
                                                        onChange={uploadFileHandler}>

                                                    </Form.File>
                                                </>
                                            ) : (
                                                <Image src={images[1].url} width="150" height="150" style={{ marginLeft: "20px" }} />
                                            )}
                                        {uploading && <Loader />}
                                    </Form.Group>
                                    <Form.Group controlId='image3'>
                                        <Form.Label>Image From Front</Form.Label>
                                        {!images[2] ?
                                            (
                                                <>
                                                    <Form.Control type='text' placeholder='Enter image URL' value={images}
                                                        onChange={(e) => setImages[2](e.target.value)}></Form.Control>
                                                    <Form.File id='image-file'
                                                        // label='Choose Image'
                                                        custom
                                                        onChange={uploadFileHandler}>

                                                    </Form.File>
                                                </>
                                            ) : (
                                                <Image src={images[2].url} width="150" height="150" style={{ marginLeft: "20px" }} />
                                            )}
                                        {uploading && <Loader />}
                                    </Form.Group>

                                    <Form.Group controlId='image4'>
                                        <Form.Label>Image From Behind</Form.Label>
                                        {!images[3] ?
                                            (
                                                <>
                                                    <Form.Control type='text' placeholder='Enter image URL' value={images}
                                                        onChange={(e) => setImages[3](e.target.value)}></Form.Control>
                                                    <Form.File id='image-file'
                                                        // label='Choose Image'
                                                        custom
                                                        onChange={uploadFileHandler}>

                                                    </Form.File>
                                                </>
                                            ) : (
                                                <Image src={images[3].url} width="150" height="150" style={{ marginLeft: "20px" }} />
                                            )}
                                        {uploading && <Loader />}
                                    </Form.Group>

                                    <Form.Group controlId='brand'>
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Control type='text' placeholder='Enter brand' value={brand}
                                            onChange={(e) => setBrand(e.target.value)}></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='category'>
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control type='text' placeholder='Enter category' value={category}
                                            onChange={(e) => setCategory(e.target.value)}></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='countInStock'>
                                        <Form.Label>Count In Stock</Form.Label>
                                        <Form.Control type='number' placeholder='Enter Count In Stock' value={countInStock}
                                            onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='description'>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type='text' placeholder='Enter description' value={description}
                                            onChange={(e) => setDescription(e.target.value)}></Form.Control>
                                    </Form.Group>
                                    <br></br>
                                    <Button className="btn btn-primary" type='submit' variant='primary'
                                    >
                                        Create
                                    </Button>
                                </Form>
                            </>
                        )}
            </FormContainer>

        </>
    )

}

export default ProductCreateScreen