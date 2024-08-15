import React, { useState } from 'react'
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import { Link } from 'react-router-dom';

const SignUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please Enter a valid Email.");
      return;
    }

    if (!name) {
      setError("Please Enter your Name.");
      return;
    }

    if (!password) {
      setError("Please set a Password");
      return;
    }

    setError("");
  }

  return (
    <div className='flex justify-center items-center mt-28'>
      <div className="formcontainer w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleSignUp}>
          <h4 className='text-2xl mb-7 font-medium'>Sign Up</h4>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={name ||'Name'} className='input-box' />
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={email ||'Email'} className='input-box' />
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
          <button type="submit" className='btn-primary'>
            Create Account
          </button>
          <p className='text-sm text-center mt-4'>
            Already have an Account?{" "}
            <Link to="/login" className='font-medium text-primary underline'>Login Here</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp