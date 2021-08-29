import React from 'react'
import { Helmet } from "react-helmet";


const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title> {title} </title>
            <meta name="description" content={description} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome To Thuận\'s Shoe',
    description: 'I am the Champion !'
}

export default Meta
