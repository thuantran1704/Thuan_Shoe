import axios from 'axios'
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_BRAND_REQUEST,
    PRODUCT_BRAND_SUCCESS,
    PRODUCT_BRAND_FAIL,
    PRODUCT_TOP_LIST_REQUEST,
    PRODUCT_TOP_LIST_FAIL,
    PRODUCT_TOP_LIST_SUCCESS,
    PRODUCT_SAME_LIST_REQUEST,
    PRODUCT_SAME_LIST_SUCCESS,
    PRODUCT_SAME_LIST_FAIL,
    PRODUCT_TOP_CATEGORY_REQUEST,
    PRODUCT_TOP_CATEGORY_SUCCESS,
    PRODUCT_TOP_CATEGORY_FAIL,
    PRODUCT_CATEGORY_REQUEST,
    PRODUCT_CATEGORY_FAIL,
    PRODUCT_CATEGORY_SUCCESS
} from '../constants/productConstants'
import { USER_DETAIL_RESET, USER_LIST_RESET, USER_LOGOUT } from '../constants/userConstants'

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAIL_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
    dispatch({ type: USER_LIST_RESET })
    document.location.href = '/login'
}

export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        await axios.delete(`/api/products/${id}`, config)

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: message,
        })
    }
}

export const createProduct = (name, price, images, brand, category, countInStock, description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.post(`/api/products`, {name, price, images, brand, category, countInStock, description}, config)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: message,
        })
    }
}

export const updateProduct = (productId, name, price, images, brand, category, countInStock, description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        const { data } = await axios.put(`/api/products/${productId}`, {productId, name, price, images, brand, category, countInStock, description}, config)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,

        })
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
        dispatch({ type: PRODUCT_UPDATE_RESET })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: message,
        })
    }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        await axios.post(`/api/products/${productId}/reviews`, review, config)

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: message,
        })
    }
}

export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST })
        const { data } = await axios.get(`/api/products/top`)
        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listTopProductsByBrand = (brand) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_LIST_REQUEST })
        const { data } = await axios.get(`/api/products/top/${brand}`)
        dispatch({
            type: PRODUCT_TOP_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listSameProductsByBrand = (brand) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_SAME_LIST_REQUEST })
        const { data } = await axios.get(`/api/products/same/${brand}`)
        dispatch({
            type: PRODUCT_SAME_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_SAME_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listBrandProducts = (brand, pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_BRAND_REQUEST })
        const { data } = await axios.get(`/api/products/brand/${brand}?pageNumber=${pageNumber}`)
        dispatch({
            type: PRODUCT_BRAND_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_BRAND_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listCategoryProducts = (category, pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_CATEGORY_REQUEST })
        const { data } = await axios.get(`/api/products/category/${category}?pageNumber=${pageNumber}`)
        dispatch({
            type: PRODUCT_CATEGORY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_CATEGORY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listTopProductsByCategory = (category) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_CATEGORY_REQUEST })
        const { data } = await axios.get(`/api/products/top4/${category}`)
        dispatch({
            type: PRODUCT_TOP_CATEGORY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_CATEGORY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}