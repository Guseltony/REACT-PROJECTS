import React, { useEffect, useState } from 'react';
import { IoLocation, IoSearchCircle, IoSearchCircleOutline } from "react-icons/io5";
import { logos } from '../../assets/assets';
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from 'react-icons/tb';
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
    const [tempFormat, setTempFormat] = useState('celsius')
    const [celsTemp, setCelsTemp] = useState(true)
    const [fahrTemp, setFahrTemp] = useState(false)


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

    const handleCelsiusTemp = () => {
        setTempFormat('celsius')
        setCelsTemp(true)
        setFahrTemp(false)
    }
    const handleFahrenTemp = () => {
        setTempFormat('fahrenheit')
        setCelsTemp(false)
        setFahrTemp(true)
    }


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
    }, [searchCountry])
    console.log(forecastArray)

    return (
        <div 
            className=' w-[100%] md:w-[85%] flex justify-center items-center min-h-[650px]' 
            style={styles}
        >
            <div className='relative w-[95%] md:w-[90%] flex flex-col min-h-[550px] rounded-4xl backdrop-filter backdrop-blur-sm bg-opacity-10 bg-black/50 p-4'>
                {/* Search Button */}
                <IoSearchCircleOutline 
                    size={40} 
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
                            onKeyDown={(e) => e.key === 'Enter' && handleSearchCountry()}
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
                            {
                                tempFormat  === 'celsius' ? 
                                    <div className="inline-block relative temp-reading">
                                        <h3 className='advent inline-flex items-center justify-center text-9xl'>
                                            {Math.round(currentWeather.main.temp)}
                                        </h3>
                                        <TbTemperatureCelsius className='script absolute -right-6 top-2' size={30} />
                                    </div> :
                                    <div className="inline-block relative temp-reading">
                                        <h3 className='advent inline-flex items-center justify-center text-9xl'>
                                            {Math.round(Math.round(currentWeather.main.temp) * (9/5) + 32)}
                                        </h3>
                                        <TbTemperatureFahrenheit className='script absolute -right-6 top-2' size={30} />
                                    </div>
                            }
                            <br />
                            <div className="tempFormat-btn w-[80px] h-[40px] inline-flex flex-row rounded-full bg-transparent bg-gradient-to-br from-gray-800 to-gray-600 box-border shadow-[inset_2px_2px_0_#7d7c7e,inset_-2px_-2px_0_#1c1c1c] items-center justify-around mb-4">
                                <div className={`${celsTemp ? 'bg-green-600' : ''} rounded-full w-[30px] h-[30px] flex items-center justify-center transition-all ease-in duration-500`} onClick={() => handleCelsiusTemp()}>
                                    <TbTemperatureCelsius size={15} strokeWidth={3} />
                                </div>
                                <div className={`${fahrTemp ? 'bg-green-600' : ''} rounded-full w-[30px] h-[30px] flex items-center justify-center transition-all ease-in duration-500`} onClick={() => handleFahrenTemp()}>
                                    <TbTemperatureFahrenheit size={15} strokeWidth={3} />
                                </div>
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
                            {/* weather image */}
                            
                            {weatherUrl && (
                                <img 
                                    src={weatherUrl} 
                                    alt={currentWeather.weather[0].main}
                                    className='w-48 h-48'
                                />
                            )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 p-4 ">
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
                    </div>
                )}
            </div>
        </div>
    );
};