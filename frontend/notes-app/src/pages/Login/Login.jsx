import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please Enter a valid Email");
      return;
    } 

    if (!password) {
      setError("Please enter your Password");
      return;
    }

    setError("");

  }

  return (
    <div className='flex justify-center items-center mt-28'>
      <div className="formcontainer w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleLogin}>
          <h4 className='text-2xl mb-7 font-medium'>Login</h4>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={email ||'Email'} className='input-box' />
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
          <button type="submit" className='btn-primary'>
            Login
          </button>
          <p className='text-sm text-center mt-4'>
            Not registered yet?{" "}
            <Link to="/signup" className='font-medium text-primary underline'>Create an Account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login