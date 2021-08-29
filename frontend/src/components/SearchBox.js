import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/allproduct/search/${keyword}`)
        } else {
            history.push('/')
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
                        placeholder='Search Products...'
                        className='form-control  me-sm-5'
                        >
                        
                    </Form.Control>
                </Col>
                <Col>
                    <Button type='submit'
                        variant='outline-success'
                        className='p-2'>
                        Search
                    </Button>
                </Col>

            </Row>
        </Form>
    )
}

export default SearchBox
