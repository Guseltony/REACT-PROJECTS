import React, { useEffect, useState } from 'react'
import { GrAdd } from "react-icons/gr"
import { FaTrash, FaRegCircle } from "react-icons/fa6"
import { FaCheckCircle } from 'react-icons/fa'
import { ImCancelCircle } from 'react-icons/im'
import { RiEdit2Fill } from 'react-icons/ri'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { logos } from '../../assets/assets'

export const Task = () => {

    const [inputValue, setInputValue] = useState('')
    const [task, setTask] = useState([])
    const [taskForm, setTaskForm] = useState(false)
    const [filterType, setFilterType] = useState('all')
    const [editValue, setEditValue] = useState('')
    const [edittingId, setEdittingId] = useState(null)

    const addTask = () => {
        if (inputValue.trim() !== "") {
            setTask((task) => [...task, {text: inputValue, id: Date.now(), completed: false}])
            setInputValue('')
            setTaskForm(false)
        }
    }

    useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTask(savedTasks);
    }, []);

    useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
    }, [task]);



    const deleteTask = (id) => setTask(task.filter((t) => t.id !== id))

    const handleCompleteTask = (id) => setTask(task.map((t) => t.id === id ? { ...t, completed: !t.completed } : t))

    const filterTasks = (filterType) => {
        
        let filteredTasks = [];

        switch (filterType) {

            case 'all':
                filteredTasks = task
                break;
            
            case 'pending':
                filteredTasks = task.filter((t) => !t.completed)
                break;
        
            case 'completed':
                filteredTasks = task.filter((t) => t.completed);
                break;
        
            default:
        }

        return filteredTasks
    }

    const myTasks = filterTasks(filterType)

    const editTask = (id, text) => {
        setEditValue(text)
        setEdittingId(id)
    }

    const saveEdittedTask = (id) => {
        if (editValue.trim() !== "") {
            setTask((prevTask) => 
                prevTask.map((t) => t.id === id ? { ...t, text: editValue } : t )
            )
        }
        setEditValue('')
        setEdittingId(null)
    }




    return (
        <div className='w-[90vw] md:w-[450px] min-h-[600px] relative rounded-4xl flex items-center justify-center'>

            <div className='min-h-[600px] relative rounded-4xl shadow-2xl bg-black bg-opacity-20  w-[100%]'>
                
                <div className='bg-green-700 inline-flex w-10 h-10 justify-center items-center rounded-full absolute bottom-8 right-8 z-10 cursor-pointer' onClick={ () => setTaskForm(true) }>
                    <GrAdd size={25} />
                </div>

                <div className='mb-8 flex items-center justify-center flex-col mt-4'>
                    <h1 className='text-xl font-semibold uppercase'>To-Do List</h1>
                    <p className='text-sm'>Get Organized and manage your time effectively</p>
                </div>


                {
                    taskForm && 
                    (<div className='flex flex-col justify-center items-center w-[100%] h-[100%] absolute top-0 left-0 bg-[#00000099] z-20 rounded-4xl'>
                        <ImCancelCircle
                            className='absolute right-10 top-4 cursor-pointer text-red-600'
                            onClick={() => setTaskForm(false)} 
                            size={25}
                        />
                        <div className='flex flex-col justify-center items-center bg-black w-[90%] py-8 rounded-lg z-30 opacity-100'>
                            <input
                                type="text"
                                onChange={(e) => setInputValue(e.target.value)}
                                value={inputValue}
                                placeholder="Enter Task"
                                className='bg-transparent border-2 border-green-500 outline-none rounded-xl pl-4 py-[10px] w-[90%] text-[#fff]'
                            />

                            <button
                                type='submit'
                                onClick={addTask}
                                className='px-8 py-[12px] bg-green-700 font-bold text-sm rounded-full mt-8 cursor-pointer hover:bg-white hover:text-black'>Add
                            </button>
                        </div>

                        </div>)
                }

                {
                    ( task.length > 0)  && (
                        <div className='flex gap-2 items-center justify-center border-b-2 border-gray-700 pb-2'>
                            <button className={`${filterType === 'all' ? 'bg-green-500 border-0' : 'border-2'} px-2 py-2 font-bold cursor-pointer border-green-800 rounded-xl`} onClick={ () => setFilterType('all') }>All</button>
                            <button className={`${filterType === 'pending' ? 'bg-green-500 border-0' : 'border-2'} px-2 py-2 font-bold cursor-pointer border-green-800 rounded-xl`} onClick={ () => setFilterType('pending') }>Pending</button>
                            <button className={`${filterType === 'completed' ? 'bg-green-500 border-0' : 'border-2'} px-2 py-2 font-bold cursor-pointer border-green-800 rounded-xl`} onClick={ () => setFilterType('completed') }>Completed</button>
                        </div>
                    )
                }
                

                {
                    task.length > 0 ? 
                    myTasks.map(({ text, id, completed }) => (
                        <div key={id}>

                            {
                                (edittingId === id) ? <div className='border-b-2 border-green-500 px-4 py-4 flex items-center justify-between mt-4'>
                                    <input type="text" onChange={(e) => { setEditValue(e.target.value) }} value={editValue} className='bg-transparent outline-none rounded-xl w-[90%] text-[#fff]' />
                                    <IoIosCheckmarkCircle size={25} color='#fff' onClick={() => saveEdittedTask(id)} />

                                </div> :
                                <div className={`${completed ? 'bg-gray-400' : 'bg-green-500'}  px-4 py-4 flex items-center justify-between mt-4` }>
                                    <div className='flex items-center'>
                                        <div onClick={() => handleCompleteTask(id)}>
                                            {
                                                completed ? <FaCheckCircle size={15} className='text-indigo-700' /> : <FaRegCircle size={15} />
                                            }
                                        </div>
                                        <p className={`${completed && 'line-through'} text-base capitalize ml-2 text-[#000]`}>{text}</p>
                                    </div>
                                        <div className='flex gap-2 '>
                                            {
                                                !completed &&
                                            <RiEdit2Fill size={25} color='#EE0097' onClick={() => editTask(id, text)} className='cursor-pointer' />
                                            }
                                            <FaTrash size={25} color='#EE0030' onClick={() => deleteTask(id)} className='cursor-pointer' />
                                    </div>
                                </div>
                            }

                        </div>
                    )) : <div className=' flex items-center justify-center mt-10 flex-col '>
                            <img src={logos.emptyList} alt="empty list" className='w-[250px]' />
                            <h1 className='text-2xl text-center text-gray-400 px-4'>Your list is looking a little lonely. <br /> Add some tasks by pressing the add button.</h1>
                    </div>
                }
                

            </div>
        </div>
    )
}
