const Login = () => {
  return (
    <main className='form-page'>
      <h1>Login In Now!</h1>
      {/* Email */}
      <label htmlFor='email'>Email</label>
      <input type='text' name='email' placeholder='Email'/>
      {/* Password */}
      <label htmlFor='password'>Password</label>
      <input type='text' name='password' placeholder='Password'/>
      <button className='button'>Login</button>
    </main>
  )
}

export default Login