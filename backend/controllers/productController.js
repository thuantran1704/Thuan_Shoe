import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


// @desc        Fetch all products
// @route       GET /api/products
// @access      Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 8
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}  

    const count = await Product.countDocuments({ ...keyword })

    const products = await Product.find({ ...keyword }).sort('brand').sort('-createdAt').limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({ products, page, pages: Math.ceil(count / pageSize), count })
})

// @desc        Fetch all products by brand
// @route       GET /api/products
// @access      Public
const getProductsByBrand = asyncHandler(async (req, res) => {
    const pageSize = 8
    const page = Number(req.query.pageNumber) || 1

    const input = req.params.brand

    const productsSize = await Product.find({ brand: input })
    const count = productsSize.length

    const products = await Product.find({ brand: input }).sort('-createdAt').limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc        Fetch all products by category
// @route       GET /api/products
// @access      Public
const getProductsByCategory = asyncHandler(async (req, res) => {
    const pageSize = 8
    const page = Number(req.query.pageNumber) || 1

    const input = req.params.category

    const productsSize = await Product.find({ category: input })
    const count = productsSize.length

    const products = await Product.find({ category: input }).sort('-createdAt').limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({ products, page, pages: Math.ceil(count / pageSize) })
})


// @desc        Fetch single products
// @route       GET /api/products/:id
// @access      Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found !')
    }
})

// @desc        Create a product
// @route       POST /api/products
// @access      Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, images, category, brand, countInStock } = req.body
    const product = await Product.create({
        name, price, description, images, category, brand, countInStock
    })
    res.status(201).json(product)
})

// @desc        Delete product
// @route       DELETE /api/products/:id
// @access      Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ message: 'Product removed' })
    }
    else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc        Update product 
// @route       PUT /api/products/:id
// @access      Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = req.body.name || product.name
        product.price = req.body.price || product.price
        product.images = req.body.images || product.images
        product.category = req.body.category || product.category
        product.brand = req.body.brand || product.brand
        product.countInStock = req.body.countInStock || product.countInStock
        product.description = req.body.description || product.description

        const updatedProduct = await product.save()
        res.json({
            _id: updatedProduct._id,
            name: updatedProduct.name,
            price: updatedProduct.price,
            images: updatedProduct.images,
            category: updatedProduct.category,
            brand: updatedProduct.brand,
            countInStock: updatedProduct.countInStock,
            description: updatedProduct.description,
        })
    } else {
        res.status(404)
        throw new Error('Product not found ')
    }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
// userId: req.user._id,
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        )

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length

        await product.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4)
    res.json(products)
})

// @desc    Get top 4 rated products by brand
// @route   GET /api/products/top
// @access  Public
const getTopProductsByBrand = asyncHandler(async (req, res) => {
    const input = req.params.brand
    const products = await Product.find({ brand: input }).sort({ rating: -1 }).limit(4)

    res.json(products)
})

// @desc    Get top 4 rated products by category
// @route   GET /api/products/top
// @access  Public
const getTopProductsByCategory = asyncHandler(async (req, res) => {
    const input = req.params.category
    const products = await Product.find({ category: input }).sort('-createdAt').sort({ rating: -1 }).limit(4)
    //
    res.json(products)
})

// @desc    Get same products
// @route   GET /api/products/top
// @access  Public
const getSameProductsByBrand = asyncHandler(async (req, res) => {
    const input = req.params.brand
    const products = await Product.find({ brand: input }).sort({ rating: -1 }).limit(10)

    res.json(products)
})

export {
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    createProduct,
    createProductReview,
    getTopProducts,
    getProductsByBrand,
    getTopProductsByBrand,
    getSameProductsByBrand,
    getTopProductsByCategory,
    getProductsByCategory
}