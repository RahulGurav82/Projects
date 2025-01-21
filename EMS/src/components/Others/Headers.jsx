import React from 'react'

const Headers = () => {
  return (
    <div className='flex item-end justify-between'>
        <h1 className='text-2xl font-semibold'>Hello <br /> <span className='text-3xl'>Rahul</span></h1>
        <button className='bg-red-600 text-white px-5 rounded-sm text-lg font-medium'>Log Out</button>
    </div>
  )
}

export default Headers