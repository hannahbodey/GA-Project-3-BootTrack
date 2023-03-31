import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

//? User Schema for all user profiles
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 15 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isDemo: { type: Boolean, default: false },
  teacher: { type: Boolean, required: true }
})

//? Virtual fields for the user: homework, notes, progress + password confirmation
//? homework, notes, progress all brought in on relationship from daysSchema
userSchema.virtual('homework', {
  ref: 'Day',
  localField: '_id',
  foreignField: 'homeworkSchema.owner'
})

userSchema.virtual('notes', {
  ref: 'Day',
  localField: '_id',
  foreignField: 'notesSchema.owner'
})

userSchema.virtual('progress',{
  ref: 'Day',
  localField: '_id',
  foreignField: 'progressSchema.owner'
})

userSchema
  .virtual('passwordConfirmation')
  .set(function(userPasswordConfirmation){
    this._passwordConfirmation = userPasswordConfirmation
  })

//? To JSON command so that it removes password and shows the virtual fields
userSchema.set('toJSON', {
  virtuals: true,
  transform(doc, ret){
    delete ret.password
  }
})

//? Validation and authentication
//Checking if password and password confirmation match
userSchema.pre('validate', function(next){
  if (this.isModified('password') && this.password !== this._passwordConfirmation){
    this.invalidate('passwordConfirmation', 'Passwords do not match')
  }
  next()
})

//Encrypting password using bcrypt
userSchema.pre('save', function(next){
  if (this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(12))
  }
  next()
})

//Checking bcrypt password and inputted password at login
userSchema.methods.validatePassword = function(nonCryptPassword){
  return bcrypt.compare(nonCryptPassword, this.password)
}

export default mongoose.model('User', userSchema)