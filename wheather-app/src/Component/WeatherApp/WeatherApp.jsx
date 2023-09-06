import React from 'react'
import './WeatherApp.css'
import search1 from '../Assets/search1.png'
import clear from '../Assets/clear.png'
import clouds from '../Assets/clouds.png'
import drizzler from '../Assets/drizzler.png'
import rain from '../Assets/raining.png'
import snow from '../Assets/snow.png'
import wind from '../Assets/wind.png'
import humid3 from '../Assets/humid3.png'

export const WeatherApp = () => {

    const api = '59627e83ad0477d17a5b550957b27730'

    const search = async () => {
        const element = document.getElementsByClassName('cityInput')
        if (element[0].value === '') {
            return 0
        }
        let URL = `http://api.weatherstack.com/current?access_key=${api}&query=${element[0].value}`;
        let response = await fetch(URL);
        let data = await response.json()
        const humid = document.getElementsByClassName('humidpercentage')
        const windSpeed = document.getElementsByClassName('windrate')
        const temperature = document.getElementsByClassName('weathertemp')
        const location = document.getElementsByClassName('weatherloc')

        temperature[0].innerHTML = `${data.current.temperature}°C`; // Display temperature in Celsius
        location[0].innerHTML = data.location.name;
        humid[0].innerHTML = `${data.current.humidity}%`; // Display humidity in percentage
        windSpeed[0].innerHTML = `${data.current.wind_speed} km/h`; // Display wind speed in km/h
    }

    return (
        <div className='Container'>
            <div className="topbar">
                {/* Search */}
                <input type="text" className='cityInput' placeholder='search' />
                <div className="searchicon" onClick={() => { search() }}>
                    <img src={search1} alt="" />
                </div>
            </div>

            {/* weather */}
            <div className="weatherimg">
                <img src={clouds} alt="" />
            </div>
            <div className="weathertemp">-°C</div>
            <div className="weatherloc">--</div>
            <div className="datacontainer">

                <div className="element">
                    <img src={humid3} alt="" className="icon" />
                    <div className="data">
                        <div className="humidpercentage">-%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>

                <div className="element">
                    <img src={wind} alt="" className="icon" />
                    <div className="data">
                        <div className="windrate">-km/h</div>
                        <div className="text">WindSpeed</div>
                    </div>
                </div>

            </div>
        </div>
    )
}
