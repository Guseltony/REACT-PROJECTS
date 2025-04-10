import React, { createContext, useEffect } from 'react';

// Step 1: Create the Context
export const MoviesContext = createContext();

// Step 2: Create the Provider Component
export const MoviesProvider = ({ children }) => {
  // Define the data you want to share via context
    const header = 'I am happy';
    
    useEffect(() => {
        const fetchMovieData = async () => {
            const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=682bf96c79753639fc1151d0a1e93f44&page=2', { headers: { Accept: 'application/json' } })
            try {
                console.log(response)
                if (response.ok) {
                    const moviesData = response.json()
                    console.log(moviesData)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchMovieData()
    },[])

  // Wrap the shared data in an object (optional but recommended for scalability)
  const value = { header };

  return (
    <MoviesContext.Provider value={value}>
      {children}
    </MoviesContext.Provider>
  );
};