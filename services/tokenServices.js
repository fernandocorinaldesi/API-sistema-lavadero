const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.generateToken = (usuario) => {
    const token = jwt.sign({
        email: usuario.email,
        username: usuario.username,
        id: usuario.id
    },process.env.TOKEN_KEY, {
        expiresIn: process.env.TOKEN_EXP
    })
    return token
}

exports.generateRefreshToken = (usuario) => {
    const refreshToken = jwt.sign({
        email: usuario.email,
        username: usuario.username,
        id: usuario.id
    },process.env.REFRESH_TOKEN_KEY, {
        expiresIn: process.env.REFRESH_TOKEN_EXP
    })
    return refreshToken
}

