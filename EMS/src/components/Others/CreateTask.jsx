import React from 'react'

const CreateTask = () => {
  return (
    <div className='p-5 bg-[#1c1c1c] mt-7 rounded'>
    <form action="" className='flex flex-wrap items-start justify-between w-full '>
        <div className='w-1/2'>
            <div>
                <h3 className='text-sm text-gray-300 mb-0.5'>Task Title</h3>
                <input className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px]'
                type="text" placeholder='male ui design' />   
            </div>
            <div>
                <h3 className='text-sm text-gray-300 mb-0.5'>Date</h3>
                <input className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px]'
                type="date" />
            </div>
            <div>
                <h3 className='text-sm text-gray-300 mb-0.5'>assign to</h3>
                <input className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px]'
                 type="text" placeholder='Enter Employee Name' />
            </div>
            <div>
                <h3 className='text-sm text-gray-300 mb-0.5'>category</h3>
                <input className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px]' 
                 type="text" placeholder='Design, dev'/>
            </div>
        </div>

        <div className='w-2/5 flex flex-col items-start'>
            <h3 className='text-sm text-gray-300 mb-0.5'>Description</h3>
            <textarea className='text-sm py-2 tx-4 w-full h-44 rounded outline-none bg-transparent border-[1px] border-gray-600 '
             name="" id="" rows={10} cols={30}></textarea>
            <button className='bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full '>Create Task</button>
        </div>
    </form>
</div>
  )
}

export default CreateTask