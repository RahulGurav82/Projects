import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (evt) => {
    evt.preventDefault()
    console.log(email);
    console.log(password);
    setEmail('');
    setPassword('');
  }

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
        <div className='border-2 border-emerald-red-600 p-20 rounded-xl'>
            <form onSubmit={submitHandler} action="" className='flex flex-col items-center justify-center'>
                <input
                value={email}
                onChange={(e)=> {
                    setEmail(e.target.value);
                }}
                 className='border-2 border-emerald-600 py-4 px-5 rounded-full text-xl outline-none bg-transparent' type="email" name="email" id="email" placeholder='Enter Your Email' required/>
                <input
                value={password}
                onChange={(e)=> {
                    setPassword(e.target.value)
                }}
                 className='border-2 border-emerald-600 py-4 px-5 rounded-full text-xl outline-none bg-transparent mt-4' type="password" name="password" id="password" placeholder='Enter Your password' required/>
                <button className='border-2 bg-emerald-600 py-4 px-5 rounded-full text-xl outline-none mt-4 w-full' >Log In</button>
            </form>
        </div>
    </div>
  )
}

export default Login