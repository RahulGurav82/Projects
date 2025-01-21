import React from 'react'

const TaskListNumber = () => {
  return (
    <div className='flex justify-between gap-4 screen mt-10'>
        <div className='rounded-xl p-10 w-[45%] bg-red-400 py-6 px-10'>
            <h2 className='text-3xl font-semibold'>0</h2>
            <h2 className='font-xl font-medium'>New Task</h2>
        </div>
        <div className='rounded-xl p-10 w-[45%] bg-blue-400 py-6 px-10'>
            <h2 className='text-3xl font-semibold'>0</h2>
            <h2 className='font-xl font-medium'>New Task</h2>
        </div>
        <div className='rounded-xl p-10 w-[45%] bg-green-400 py-6 px-10'>
            <h2 className='text-3xl font-semibold'>0</h2>
            <h2 className='font-xl font-medium'>New Task</h2>
        </div>
        <div className='rounded-xl p-10 w-[45%] bg-yellow-400 py-6 px-10'>
            <h2 className='text-3xl font-semibold'>0</h2>
            <h2 className='font-xl font-medium'>New Task</h2>
        </div>
    </div>
  )
}

export default TaskListNumber