import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword, details }) => {
    console.log(pages);
    return pages > 1 && (
        <Pagination className='pagination'>
            {[...Array(pages).keys()].map(x => (
                <LinkContainer key={x + 1}
                    to={
                        !isAdmin
                            ? keyword
                                ? `/allproduct/search/${keyword}/page/${x + 1}`
                                : (details === 'Nike' || details === 'Converse' || details === 'Adidas') ? `/brand/${details}/${x + 1}`
                                    : (details === 'Mens' || details === 'Womens' || details === 'Kids') ? `/category/${details}/${x + 1}`
                                        : `/allproduct/page/${x + 1}`
                            : isAdmin === true
                                ? details === 'productlist'
                                    ? !keyword ? `/admin/productlist/${x + 1}`
                                        : `/admin/productlist/search/${keyword}/page/${x + 1}`

                                    : details === 'orderlist' ? `/admin/orderlist/${x + 1}`
                                        : ({})

                                : ({})
                    }>

                    <Pagination.Item active={x + 1 === page}> {x + 1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
}

export default Paginate
