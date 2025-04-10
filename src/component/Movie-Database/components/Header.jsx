import React from 'react'
import './Header.css'
import { GoSearch } from 'react-icons/go'
import logoImg from '../../../assets/images/G-filmora.png'

export const Header = () => {
    return (
    <div className='relative w-[100%] border-2 border-pink-800'>
        <div className='header'>
            <div className="logo">
                <img src={logoImg} alt="" className='w-[200px]' />
            </div>
            <ul>
                <li>Home</li>
                <li>Movies</li>
                <li>Series</li>
                <li>Upcoming</li>
                <li>TV Show</li>
            </ul>
            <div className="searchBtn flex items-center justify-center gap-2">
                <input type="text" placeholder='Spider Man' className='outline-none border-b-2 border-indigo-700 pb-1 px-2'/>
                <GoSearch size={25} strokeWidth={1}/>
            </div>
        </div>
    </div>
)
}
