import asyncHandler from 'express-async-handler'
import generateToken from '../utills/generateToken.js'
import User from '../models/userModel.js'


// @desc        Auth user & get token
// @route       POST /api/users/login
// @access      Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            birthday: user.birthday,
            phone: user.phone,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc        Get user profile
// @route       GET /api/users/profile
// @access      Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            birthday: user.birthday,
            phone: user.phone,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found ')
    }
})

// @desc        Update user profile
// @route       PUT /api/users/profile
// @access      Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.birthday = req.body.birthday || user.birthday
        user.phone = req.body.phone || user.phone

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            birthday: user.birthday,
            phone: user.phone,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })
    }
    else {
        res.status(404)
        throw new Error('User not found ')
    }
})

// @desc        Register a new user
// @route       POST /api/users
// @access      Public
const RegisterUser = asyncHandler(async (req, res) => {
    const { name, email, password, birthday, phone } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password,
        birthday,
        phone
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            birthday: user.birthday,
            phone: user.phone,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc        Get all user
// @route       GET /api/users
// @access      Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    
    const users = await User.find({}).sort('-createdAt')

    res.json(users)
})

// @desc        Delete user
// @route       DELETE /api/users/:id
// @access      Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove()
        res.json({ message: 'User removed' })
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc        Get user by id
// @route       GET /api/users/:id
// @access      Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc        Update user 
// @route       PUT /api/users/:id
// @access      Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.birthday = req.body.birthday || user.birthday
        user.phone = req.body.phone || user.phone
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            birthday: updatedUser.birthday,
            phone: updatedUser.phone,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found ')
    }
})

export {
    authUser,
    getUserProfile,
    RegisterUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}