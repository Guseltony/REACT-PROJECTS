import React, { useContext } from 'react'
import trendingArray from './trendingMovie'
import MovieCard from './MovieCard'
import { MoviesContext } from './MovieContext'
import styled from 'styled-components';
// import { MoviesContext } from './MovieContext'
// import MovieCard from './MovieCard'

const MostViewed = () => {

    const SearchInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  width: 200px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
`;

    const { header } = useContext(MoviesContext)
    
    const TrendingMovies = trendingArray.map((movie, index) => {
        return (
            <MovieCard key={ index} {...movie} />
        )
    })
    return (
    <div className='mt-10'>
            <h1>{header}</h1>
            <SearchInput type='text' placeholder='AM alive'/>
          <h2 className='capitalize font-bold text-xl mb-4'>Trends Now</h2>
          <div className='flex gap-8'>
            {TrendingMovies}
            </div>
    </div>
  )
}

export default MostViewed