import User from '../models/users.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { assessError, Unauthorized, NotFound } from '../config/errors.js'

const secret = process.env.SECRET

// REGISTER ROUTE
//Endpoint: /register]
export const registerUser = async (req,res) =>{
  try {
    const newUser = await User.create(req.body)

    return res.status(201).json({ message: `Welcome ${newUser.username}` })
  } catch (err) {
    return assessError(err, res)
  }
}


//LOGIN ROUTE
//Endpoint: /login
export const loginUser = async (req, res) =>{
  try {
    const { email, password } = req.body
    
    const userToLogin = await User.findOne({ email: email })
    console.log(userToLogin)
    if (!userToLogin) {
      throw new Unauthorized('Invalid credentials')
    }

    const userIsValidated = await userToLogin.validatePassword(password)
    if (!userIsValidated) {
      throw new Unauthorized('Invalid credentials')
    }

    //JWT 
    const token = jwt.sign({ sub: userToLogin._id }, secret, { expiresIn: '7d' })
    return res.json({ message: `Welcome back, ${userToLogin.username}`, token: token })

  } catch (err) {
    return assessError(err, res)
  }
}