import React from 'react'
import { logos } from '../assets/assets'

export const Header = () => {
    return (
        <div className='py-10'>
            <h1 className='ptSans text-2xl lg:text-6xl mb-8 font-bold text-center'>Turning Ideas into Interactive Magic – Explore My Frontend World</h1>
            <div className='flex gap-4 justify-center items-center'>
                <img 
                    src={logos.htmlLogo} 
                    className='w-[50px]' 
                    alt="htmlLogo" 
                />
                <img 
                    src={logos.javascriptLogo} 
                    className='w-[50px]' 
                    alt="javascriptLogo" 
                />
                <img 
                    src={logos.reactLogo} 
                    className='w-[50px]' 
                    alt="reactLogo" 
                />
                <img 
                    src={logos.tailwindLogo} 
                    className='w-[100px]' 
                    alt="tailwindLogo" 
                />
                <img 
                    src={logos.typescriptLogo} 
                    className='w-[50px]' 
                    alt="typescriptLogo" 
                />
            </div>
        </div>
    )
}
