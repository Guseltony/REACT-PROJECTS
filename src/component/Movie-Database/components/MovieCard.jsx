import React from 'react'

const MovieCard = ({img, title, author, date}) => {
  return (
    <div>
      <div className='w-[200px] h-fit'>
        <img src={img} alt="" className='w-[100%] h-[250px] rounded-xl' />
        <h2 className='text-center font-bold capitalize mt-4'>{title}</h2>
        <div className='flex justify-between items-center mt-2'>
          <p>{ author}</p>
          <p>{ date}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard