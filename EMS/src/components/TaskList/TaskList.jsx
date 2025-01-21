import React from 'react'

const TaskList = () => {
  return (
    <div id='taskList' className='h-[55%] overflow-x-auto w-full mt-10 py-5 flex items-center justify-start gap-5 flex-nowrap'>
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-red-300 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 px-3 py-1 text-sm rounded'>high</h3>
                <h4 className='font-medium'>21 jan 2025</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>Make A Youtube Video</h2>
            <p className='text-sm mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. .</p>
        </div>
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-blue-400 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 px-3 py-1 text-sm rounded'>high</h3>
                <h4 className='font-medium'>21 jan 2025</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>Make A Youtube Video</h2>
            <p className='text-sm mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. .</p>
        </div>
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-green-400 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 px-3 py-1 text-sm rounded'>high</h3>
                <h4 className='font-medium'>21 jan 2025</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>Make A Youtube Video</h2>
            <p className='text-sm mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. .</p>
        </div>
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-red-500 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 px-3 py-1 text-sm rounded'>high</h3>
                <h4 className='font-medium'>21 jan 2025</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>Make A Youtube Video</h2>
            <p className='text-sm mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. .</p>
        </div>
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-purple-500 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 px-3 py-1 text-sm rounded'>high</h3>
                <h4 className='font-medium'>21 jan 2025</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>Make A Youtube Video</h2>
            <p className='text-sm mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. .</p>
        </div>
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-orange-500 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 px-3 py-1 text-sm rounded'>high</h3>
                <h4 className='font-medium'>21 jan 2025</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>Make A Youtube Video</h2>
            <p className='text-sm mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. .</p>
        </div>
    </div>
  )
}

export default TaskList