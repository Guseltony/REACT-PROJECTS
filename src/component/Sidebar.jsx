import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'


const Sidebar = () => {

    const [showProductivity, setShowProductivity] = useState(false)

    const handleShowProductivity = () => {
        setShowProductivity(prev => !prev)
    }
    return (
        <>
            <div className='hidden md:flex flex-col pb-40 border-2 border-red-600'>

                <div>
                    <button className=' w-[100%] text-sm uppercase px-2 py-4 mb-2 bg-indigo-700 font-extrabold' onClick={handleShowProductivity}>Productivity</button>
                    {showProductivity &&
                        (<div className='flex flex-col ml-8 gap-2'>
                            <NavLink to={'/to-do'} className='px-2 py-2 bg-amber-600'>
                                ToDo-App
                            </NavLink>

                            <NavLink to={'/weather'} className='px-2 py-2 bg-amber-600'>
                                Weather-App
                            </NavLink>

                            <NavLink to={'/g-movie'} className='px-2 py-2 bg-amber-600'>
                                G-Movie
                            </NavLink>
                        </div>)
                    }
                </div>
            </div>
        </>
    )
}

export default Sidebar