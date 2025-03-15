import React, { useState } from 'react'
import { GrAdd } from "react-icons/gr"
import { FaTrash, FaRegCircle } from "react-icons/fa6"
import { FaCheckCircle } from 'react-icons/fa'

export const Task = () => {

    const [inputValue, setInputValue] = useState('')
    const [task, setTask] = useState([])

    const displayTask = () => {
        setTask((task) => [...task, {text: inputValue, id: Date.now(), completed: false}])
        setInputValue('')
    }

    const deleteTask = (id) => setTask(task.filter((t) => t.id !== id))

    const handleCompleteTask = (id) => setTask(task.map((t) => t.id === id ? { ...t, completed: !t.completed} : t ))






    return (
        <div className='w-[450px] min-h-[600px] border-2 border-amber-700 relative'>
            
            <div className='bg-green-700 inline-flex w-10 h-10 justify-center items-center rounded-full absolute bottom-8 right-8 z-10'>
                <GrAdd size={25} />
            </div>

            <div>
                <h1>To-Do List</h1>
                <p>Get Organized and manage your time effectively</p>
            </div>
            
            <div className='flex flex-col justify-center items-center w-[100%] h-[100%] absolute top-0 left-0 bg-gray-700'>
                <input
                    type="text"
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    placeholder="Enter Task"
                    className='bg-transparent border-2 border-green-500 outline-none rounded-full px-2 py-[10px] w-[70%] text-[#fff]'
                />

                <button
                    type='submit'
                    onClick={displayTask}
                    className='px-8 py-[12px] bg-green-700 font-bold text-sm rounded-full mt-8 cursor-pointer'>Add
                </button>
            </div>

            {
                task.map(({ text, id, completed }) => (
                    <div key={id} className={`${completed ? 'bg-gray-400' : 'bg-green-500'}  px-4 py-4 flex items-center justify-between mt-4`}>
                        <div className='flex items-center'>
                            <div onClick={() => handleCompleteTask(id)}>
                                {
                                    completed ? <FaCheckCircle size={15} className='text-indigo-700' /> : <FaRegCircle size={15} />
                                }
                            </div>
                            <p className={`${completed && 'line-through'} text-xl capitalize ml-2 text-[#000]`}>{text}</p>
                        </div>
                        <div className='border-2 border-fuchsia-600 cursor-pointer'>
                            <FaTrash size={25} color='#fff' onClick={() => deleteTask(id)} />
                        </div>
                    </div>
                ))
            }
            

        </div>
    )
}
