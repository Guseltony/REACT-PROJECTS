import React from 'react'
import latestMovieArray from './latestMovieArray'
import MovieCard from './MovieCard'

export const LatestMovie = () => {

    const latestMovie = latestMovieArray.map((movie) => {
        return (
            <MovieCard key={movie.id} {...movie} />
        )
    })
return (
    <div className='mt-10'>
        <h2 className='capitalize font-bold text-xl mb-4'>Latest Movies</h2>
        <div className='flex gap-8'>
            {latestMovie}
        </div>
    </div>
)
}
