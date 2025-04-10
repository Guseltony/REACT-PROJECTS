import React from 'react'
import { logos } from '../../../assets/assets'

export const Hero = () => {

    const styles = {
        backgroundImage: `url(${logos.movieBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    return (
        <>
            <div className='w-[100%] border-2 border-red-800 h-[70vh] flex items-center' style={styles}>
                <div className='border-2 border-amber-600 ml-[30px] lg:ml-[180px] w-[100%] lg:w-[40%]'>
                    <p className='text-sm font-bold mb-4'>Duration: 1Hr 10Mins</p>
                    <h1 className='text-2xl font-semibold mb-4'>Mutants, Mayhem & Margaritas</h1>
                    <p>A retired mutant assassin, now living a quiet life as a taco truck regular, is dragged back into the chaos he left behind when his favorite taco vendor is kidnapped by a flamboyant villain with a plan to dominate the world’s spice trade...</p>
                    <div className='flex gap-4 mt-8'>
                        <button className='uppercase px-8 py-2 rounded-full bg-red-700 font-bold cursor-pointer'>Watch</button>
                        <button className='uppercase px-8 py-2 rounded-full bg-blue-500 font-bold cursor-pointer'>Thriller</button>
                    </div>
                </div>
            </div>
        </>
)
}
