const Register = () => {
  return (
    <main className='form-page'>
      <h1>Register below!</h1>
      {/* Username */}
      <label htmlFor='username'>Username</label>
      <input type='text' name='username' placeholder='Username'/>
      {/* Email */}
      <label htmlFor='email'>Email</label>
      <input type='text' name='email' placeholder='Email'/>
      {/* Password */}
      <label htmlFor='password'>Password</label>
      <input type='text' name='password' placeholder='Password'/>
      {/* Password Confirmation */}
      <label htmlFor='passwordConfirmation'>Password Confirmation</label>
      <input type='text' name='passwordConfirmation' placeholder='Password Confirmation'/>
      <button className='button'>Register</button>
    </main>
  )
}

export default Register