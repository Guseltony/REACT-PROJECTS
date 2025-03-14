import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'


const Sidebar = () => {

    const [showProductivity, setShowProductivity] = useState(false)

    const handleShowProductivity = () => {
        setShowProductivity(prev => !prev)
    }
    return (
        <>
            <div className='flex flex-col pb-40'>

                <div>
                    <button className='border border-white' onClick={handleShowProductivity}>Productivity</button>
                    {showProductivity &&
                        (<div className='flex flex-col ml-8'>
                            <NavLink to={'/to-do'}>
                                ToDo-App
                            </NavLink>

                            <NavLink to={'/weather'}>
                                Weather-App
                            </NavLink>
                        </div>)
                    }
                </div>
            </div>
        </>
    )
}

export default Sidebar