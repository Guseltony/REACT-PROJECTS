import React, { useEffect, useState } from 'react';
import { IoLocation, IoSearchCircle, IoSearchCircleOutline } from "react-icons/io5";
import { logos } from '../../assets/assets';
import { TbTemperatureCelsius } from 'react-icons/tb';
import axios from 'axios';

export const Weather = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [searchCountry, setSearchCountry] = useState('London');
    const [currentWeather, setCurrentWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [weatherUrl, setWeatherUrl] = useState(null);
    const [forecastArray, setForecastArray] = useState([])


    const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const date = new Date();
    const currentMonth = Months[date.getMonth()];
    const currentDate = date.getDate();
    const currentDay = Days[date.getDay()];

    const handleSearchCountry = () => {
        if (inputValue.trim()) {
            setSearchCountry(inputValue.trim());
            setShowSearch(false);
            setInputValue('');
        }
    };

    const styles = {
        backgroundImage: `url(${logos.weatherBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    };



    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${searchCountry}&units=metric&appid=c9cab9f7bd6a112b4332d177da1aacb1`,
                    { headers: { Accept: 'application/json' } }
                );
                
                setCurrentWeather(response.data);
                setWeatherUrl(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`);
            } catch (error) {
                setError(`Failed to load weather data for ${searchCountry}`);
                setCurrentWeather(null);
                setWeatherUrl(null);
                console.log(error)
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [searchCountry]);

    useEffect(() => {
        const fetchForecastWeather = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${searchCountry}&units=metric&appid=c9cab9f7bd6a112b4332d177da1aacb1`, { headers: { Accept: 'application/json' } });
                setForecastArray(response.data.list)
            } catch (error) {
                console.log(error)
            }
        }
        fetchForecastWeather()
    }, [])
    console.log(forecastArray)

    return (
        <div 
            className=' w-[95%] md:w-[85%] flex justify-center items-center min-h-[650px]' 
            style={styles}
        >
            <div className='relative w-[90%] md:w-[90%] flex flex-col min-h-[550px] rounded-4xl backdrop-filter backdrop-blur-sm bg-opacity-10 bg-black/50 p-4'>
                {/* Search Button */}
                <IoSearchCircleOutline 
                    size={50} 
                    color='#fff' 
                    onClick={() => setShowSearch(true)} 
                    className={`${showSearch ? 'hidden' : 'block'} absolute top-4 left-8 cursor-pointer`} 
                />

                {/* Search Input */}
                {showSearch && (
                    <div className="search flex items-center justify-center mt-6">
                        <input
                            type="text"
                            placeholder="Enter location"
                            className='bg-transparent border-2 border-purple-800 px-4 py-2 w-3xs rounded-3xl focus:border-green-800 focus:border-b-4 focus:border-0 focus:rounded-none outline-none text-white'
                            onChange={(e) => setInputValue(e.target.value)}
                            value={inputValue}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearchCountry()}
                        />
                        <IoSearchCircle 
                            size={50} 
                            color='#fff' 
                            className='cursor-pointer' 
                            onClick={handleSearchCountry}
                        />
                    </div>
                )}

                {/* Location and Date */}
                <div className={`${showSearch ? 'mt-4' : 'mt-12'} flex justify-center items-center gap-2 text-white`}>
                    <IoLocation size={30} color='#fff' />
                    <h1 className='font-bold text-xl text-purple-300 capitalize'>
                        {currentWeather?.name || searchCountry}
                    </h1>
                    <h2 className='text-xl'>
                        {currentDay}, {currentMonth} {currentDate}
                    </h2>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="text-red-500 text-center mt-4">
                        {error}
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    </div>
                )}

                {/* Weather Data */}
                {!loading && currentWeather && (
                    <div className="weather-details flex flex-col md:flex-row md:flex-wrap justify-around items-center text-white mt-10">
                        <div className="text-center md:text-left md:mb-0">
                            <div className="inline-block relative temp-reading">
                                <h3 className='advent inline-flex items-center justify-center text-9xl'>
                                    {Math.round(currentWeather.main.temp)}
                                </h3>
                                <TbTemperatureCelsius className='script absolute -right-6 top-2' size={30} />
                            </div>
                            <h3 className='text-xl capitalize Tektur'>
                                {currentWeather.weather[0].description}
                            </h3>
                            <div className='flex gap-10 mt-8'>
                                <div>
                                    <h3 className='font-semibold chakra text-sm'>Wind</h3>
                                    <p className='script text-xl'>{currentWeather.wind.speed} m/s</p>
                                </div>
                                <div>
                                    <h3 className='font-semibold chakra text-sm'>Humidity</h3>
                                    <p className='script text-xl'>{currentWeather.main.humidity}%</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            {weatherUrl && (
                                <img 
                                    src={weatherUrl} 
                                    alt={currentWeather.weather[0].main}
                                    className='w-48 h-48'
                                />
                            )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 p-4 ">
                            {forecastArray.slice(0, 4).map((list, index) => (
                                <div key={index} className="bg-white/10 rounded-lg p-2 text-center backdrop-blur-sm">
                                    {/* Time */}
                                    <h3 className="font-semibold text-lg">
                                        {new Date(list.dt * 1000).toLocaleTimeString([], { hour: '2-digit', hour12: true })}
                                    </h3>
                                    
                                    {/* Weather Icon */}
                                    <img 
                                        src={`https://openweathermap.org/img/wn/${list.weather[0].icon}.png`} 
                                        alt={list.weather[0].description}
                                        className="mx-auto w-12 h-12"
                                    />
                                    
                                    {/* Temperature */}
                                    <div className="relative inline-flex justify-center items-baseline mt-2">
                                        <span className="text-2xl font-medium">{Math.round(list.main.temp)}</span>
                                        <TbTemperatureCelsius className="absolute top-0 -right-4" size={16} />
                                    </div>
                                    
                                    {/* Description */}
                                    <p className="mt-1 text-sm capitalize">{list.weather[0].description}</p>
                                </div>
                            ))}
                        </div>
                        
                        {/* <div className="forecast">
                            {forecastArray.slice(0, 8).map((list, index) => {
                                const date = new Date(list.dt * 1000);
                                let hr = date.getHours();
                                const ampm = hr >= 12 ? 'PM' : 'AM';
                                hr = hr % 12;
                                hr = hr || 12; // Convert 0 to 12
                                const hour = `${hr}${ampm}`;
                                
                                return (
                                    <div key={index} className="forecast-item grid g">
                                        <h3>{hour}</h3>
                                        <h4 className="capitalize">{list.weather[0].description}</h4>
                                        <div className='relative inline-block'>
                                            <p className='text-2xl'>{Math.round(list.main.temp)}</p>
                                            <TbTemperatureCelsius className='absolute -right-6 top-0' size={20} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div> */}
                    </div>
                )}
            </div>
        </div>
    );
};

// import React, { useEffect, useState } from 'react'
// import { IoLocation, IoSearchCircle, IoSearchCircleOutline } from "react-icons/io5";
// import { logos } from '../../assets/assets'
// import { TbTemperatureCelsius } from 'react-icons/tb';
// import axios from 'axios';


// export const Weather = () => {

//     const [showSearch, setShowSearch] = useState(false)
//     const [inputValue, setInputValue] = useState('')
//     const [searchCountry, setSearchCountry] = useState('')
//     const [currentWeather, setCurrentWeather] = useState(null)
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [currentTemp, setCurrentTemp] = useState(null)
//     const [weatherUrl, setWeatherUrl] = useState(null)

//     const handleSearchCountry = () => {
//         setSearchCountry(inputValue)
//         setShowSearch(false)
//         setInputValue('')
//     }

//     const styles = {
//         backgroundImage : `url(${logos.weatherBg})`,
//         // backgroundColor: "red"
//     }

//     console.log(searchCountry)

//     const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
//     const Days = ['Sunday','Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday']

//     const date = new Date()
//     const getMonth = date.getMonth()
//     const currentDate = date.getDate()
//     const getDay = date.getDay()

//     const currentMonth = Months[getMonth]
//     const currentDay = Days[getDay]
//     console.log(date, currentMonth, currentDate, currentDay)


//     useEffect(() => {
//     const fetchWeatherData = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get(
//                 `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=c9cab9f7bd6a112b4332d177da1aacb1`,
//                 { headers: { Accept: 'application/json' } }
//             );
//             if (response.data.success) {
//                 setCurrentWeather(response.data);
//                 setError(null);
//                 setCurrentTemp(currentWeather.main.temp)
//                 setWeatherUrl(`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`) ;
//             }
//         }
//         catch (err) {
//             setError(err.message);
//             setCurrentWeather(null);
//         }
//         finally {
//             setLoading(false);
//         }
//     };

//     fetchWeatherData();
//     }, [loading, setLoading] );

//     console.log(currentWeather)


//   // Render error state
//     if (error) {
//         return <div className="error">Error: {error}</div>;
//     }

//     if (loading) {
//     return <div className="loading">Loading weather data...</div>;
//     }



// return (
//     <div className='border-2 border-purple-800 w-[95%] md:w-[70%] flex justify-center items-center min-h-[650px]'   style={styles} >
//         <div className='relative w-[90%] md:w-[90%] flex flex-col h-[550px] rounded-4xl backdrop-filter backdrop-blur-sm bg-opacity-10 bg-black/50'>
//             <IoSearchCircleOutline size={50} color='#fff' onClick={() => setShowSearch(true)} className={`${showSearch ? 'hidden' : 'block'} absolute top-0 left-8 cursor-pointer`} />
//             <div>
//                 {showSearch &&
//                     <div className="search flex items-center justify-center mt-6">
//                         <input
//                             type="text"
//                             className='bg-transparent border-2 border-purple-800 px-4 py-2 w-3xs rounded-3xl focus:border-green-800 focus:border-b-4 focus:border-0 focus:rounded-none outline-none'
//                             onChange={(e) => { setInputValue(e.target.value) }}
//                             value={inputValue}
//                         />
//                         <IoSearchCircle size={50} color='#fff' className='cursor-pointer' onClick={() => handleSearchCountry() }/>
//                     </div>
//                 }
//             </div>
//             <div className={`${showSearch ? 'mt-0' : 'mt-12'} flex justify-center items-center gap-2`}>
//                 <IoLocation size={30} color='#fff' className={ `${searchCountry ? 'block' : 'hidden' }` } />
//                 <h1 className='font-bold text-xl text-purple-700 capitalize'>{searchCountry}</h1>
//                 <h2 className='text-xl'>{currentDay}, {currentMonth} {currentDate}</h2>
//             </div>
//             {loading && <div className="weather-details border-2 border-green-800 flex justify-around items-center">
                
//                 <div>
//                     <div className="inline-block relative temp-reading">
//                         <h3 className='inline-flex items-center justify-center text-8xl'> {currentTemp} </h3>
//                         <TbTemperatureCelsius className='absolute -right-6 top-2' size={30} />
//                     </div>
//                     <h3>{currentWeather.weather[0].description}</h3>
//                     <div className='flex gap-10'>
//                         <div>
//                             <h3>Wind</h3>
//                             <p>{currentWeather.wind.speed}m/s</p>
//                         </div>
//                         <div>
//                             <h3>Humidity</h3>
//                             <p>{currentWeather.main.humidity}%</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div>
//                     <img src={weatherUrl} alt="" className='border-2 border-red-700'/>
//                     <p>{ currentWeather.weather[0].main}</p>
//                 </div>
//             </div>}
//         </div>
//     </div>
// )
// }
