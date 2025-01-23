import React from 'react'
import Headers from '../Others/Headers'
import CreateTask from '../Others/CreateTask'
import AllTask from '../Others/AllTask'

const AdminDash = () => {
  return (
    <div className='w-full h-screen p-7'>
        <Headers />
        <CreateTask />
        <AllTask />
    </div>
  )
}

export default AdminDash