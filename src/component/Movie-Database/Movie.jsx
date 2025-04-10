import React from 'react'
import { GoSearch } from 'react-icons/go'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import MostViewed from './components/MostViewed'
import { LatestMovie } from './components/LatestMovie'


export const Movie = () => {
  return (
      <div className='w-[100%]'>
        <Header />
        <Hero />
        <MostViewed />
        <LatestMovie />
      </div>
  )
}
