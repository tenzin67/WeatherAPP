import React, { useState, useEffect } from 'react';
import './WeatherApp.css';
import search1 from '../Assets/search1.png';
import clear from '../Assets/clear.png';
import clouds from '../Assets/clouds.png';
import drizzler from '../Assets/drizzler.png';
import rain from '../Assets/rain.png';
import snow from '../Assets/snow.png';
import wind from '../Assets/wind.png';
import humid3 from '../Assets/humid3.png';

export const WeatherApp = () => {
    const api = '5d6ad8cf214266e55d19eecf6cf13041';
    const [wicon, setWicon] = useState(clouds); // Initial value

    const search = async () => {
        const element = document.getElementsByClassName('cityInput');
        if (element[0].value === '') {
            return 0;
        }
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api}`;
        
        try {
            const response = await fetch(URL);
            const data = await response.json();

            const humid = document.getElementsByClassName('humidpercentage');
            const windSpeed = document.getElementsByClassName('windrate');
            const temperature = document.getElementsByClassName('weathertemp');
            const location = document.getElementsByClassName('weatherloc');

            temperature[0].innerHTML = `${data.main.temp}°C`;
            location[0].innerHTML = data.name;
            humid[0].innerHTML = `${data.main.humidity}%`;
            windSpeed[0].innerHTML = `${data.wind.speed} km/h`;

            // Update wicon based on weather condition
            if (data.weather[0].icon === '01d' || data.weather[0].icon === '01n') {
                setWicon(clear);
            } else if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n') {
                setWicon(clouds);
            } else if (data.weather[0].icon === '03d' || data.weather[0].icon === '03n') {
                setWicon(drizzler);
            } else if (data.weather[0].icon === '04d' || data.weather[0].icon === '04n') {
                setWicon(drizzler);
            } else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n') {
                setWicon(rain);
            } else if (data.weather[0].icon === '10d' || data.weather[0].icon === '10n') {
                setWicon(rain);
            } else if (data.weather[0].icon === '13d' || data.weather[0].icon === '13n') {
                setWicon(snow);
            } else {
                setWicon(clear);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
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

            {/* Weather */}
            <div className="weatherimg">
                <img src={wicon} alt="Weather Icon" />
            </div>
            <div className="weathertemp"> -°C</div>
            <div className="weatherloc"> --</div>
            <div className="datacontainer">
                <div className="element">
                    <img src={humid3} alt="" className="icon" />
                    <div className="data">
                        <div className="humidpercentage"> -%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind} alt="" className="icon" />
                    <div className="data">
                        <div className="windrate"> -km/h</div>
                        <div className="text">WindSpeed</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
