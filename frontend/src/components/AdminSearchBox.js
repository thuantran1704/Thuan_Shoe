import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap-v5'

const AdminSearchBox = ({ history, type }) => {
    const [keyword, setKeyword] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        if (type === "products") {
            if (keyword.trim()) {
                history.push(`/admin/productlist/search/${keyword}`)
            } else {
                history.push('/admin/productlist')
            }
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Row>
                <Col md={8}>
                    <Form.Control
                        type='text'
                        name='q'
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder='Search ....'
                        className='form-control me-sm-2'
                    >

                    </Form.Control>
                </Col>
                <Col>
                    <Button type='submit'
                        variant='outline-success'
                        className='btn btn-outline-info btn-sm'>
                        Search
                    </Button>
                </Col>

            </Row>
        </Form>
    )
}

export default AdminSearchBox
