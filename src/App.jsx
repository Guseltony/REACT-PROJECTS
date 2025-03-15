import { Routes, Route } from 'react-router-dom'
import ToDoApp from './projects/ToDoApp'
import Sidebar from './component/sidebar'
import WeatherApp from './projects/WeatherApp'
import { Header } from './component/Header'


function App() {

  return (
    <>
      
      <div className="flex flex-row w-[100%] px-[2rem]">

        <div className="border-2 border-red-600 fixed w-[300px]">
          <Sidebar />
        </div>

        <div className='flex flex-col w-[calc(100vw-300px)] ml-[300px] relative'>

          <div className="w-[100%] border-2 border-green-500 absolute top-0 right-0">
            <Header />
          </div>

          <div className="w-[100%] border-2 border-yellow-500 mt-72 flex justify-center items-center">
            <Routes>
              <Route path='/to-do' element={<ToDoApp />} />
              <Route path='/weather' element={ <WeatherApp/> } />
            </Routes>
          </div>
        </div>

      </div>
    
    </>
  )
}

export default App
