import User from '../models/users.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'


// REGISTER ROUTE
//Endpoint: /register]
export const registerUser = async (req,res) =>{
  try {
    const newUser = await User.create(req.body)

    return res.json({ message: `Welcome ${newUser.username}` })
  } catch (err) {
    console.log(err)
  }
}


//LOGIN ROUTE
//Endpoint: /login
export const loginUser = async (req, res) =>{
  try {
    const { email, password } = req.body
    
    const userToLogin = await User.findOne({ email: email })
    console.log(userToLogin)

    const userIsValidated = await userToLogin.validatePassword(password)

    if (!userToLogin || !userIsValidated){
      throw new Error()
    }

    //JWT 
    const token = jwt.sign({ sub: userToLogin._id }, process.env.SECRET, { expiresIn: '90d' })
    return res.json({ message: `Welcome back, ${userToLogin.username}`, token: token })

  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}