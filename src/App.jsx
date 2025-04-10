import { Routes, Route } from 'react-router-dom'
import ToDoApp from './projects/ToDoApp'
import Sidebar from './component/sidebar'
import WeatherApp from './projects/WeatherApp'
import { Header } from './component/Header'
import MovieApp from './projects/MovieApp'


function App() {

  return (
    <>
      
      <div className="flex flex-row w-[100%] md:px-[2rem]">

        <div className="hidden md:block border-2 border-red-600 fixed top-0 bottom-0 left-0 w-fit px-10 py-8 h-[700px]">
          <Sidebar />
        </div>

        <div className='flex flex-col w-[100vw] md:w-[calc(100vw-300px)] md:ml-[300px] relative border-2 border-red-600'>

          <div className="w-[100%] border-2 border-green-500 absolute top-0 right-0">
            <Header />
          </div>

          <div className="w-[100%] border-2 border-yellow-500 mt-[300px] lg:mt-72 flex justify-center items-center">
            <Routes>
              <Route path='/to-do' element={<ToDoApp />} />
              <Route path='/weather' element={<WeatherApp />} />
              <Route path='/G-Movie' element={<MovieApp />} />
            </Routes>
          </div>
        </div>

      </div>
    
    </>
  )
}

export default App
