// --- Element Selectors ---
const cityNameEl = document.getElementById('city-name');
const dateNormalEl = document.getElementById('date-normal');
const dateIslamicEl = document.getElementById('date-islamic');
const weatherIconEl = document.getElementById('weather-icon');
const tempMainEl = document.getElementById('temp-main');
const weatherDescEl = document.getElementById('weather-description');
const localTimeEl = document.getElementById('local-time');
const feelsLikeEl = document.getElementById('feels-like');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('wind-speed');
const prayerTimesListEl = document.getElementById('prayer-times-list');
const quoteTextEl = document.getElementById('quote-text');
const quoteAuthorEl = document.getElementById('quote-author');
const loader = document.getElementById('loader');
const cityInput = document.getElementById('city-input');
// *** NEW: Element selectors for new info ***
const sunriseTimeEl = document.getElementById('sunrise-time');
const sunsetTimeEl = document.getElementById('sunset-time');
const imsakTimeEl = document.getElementById('imsak-time');
console.log("Developed by I am Mohid")

// --- API Keys and URLs ---
const WEATHER_API_KEY = 'b190326769b84d12b01114742251006'; // Your WeatherAPI key
// *** IMPORTANT: PASTE THE "RAW" URL FROM YOUR GITHUB GIST HERE ***
const QUOTE_API_URL = 'https://gist.githubusercontent.com/YOUR_USERNAME/SOME_ID/raw/.../quotes.json';


// --- Main Logic ---
const fetchAllData = async (query) => {
    showLoader();
    try {
        const weatherData = await fetchWeatherData(query);
        const { lat, lon } = weatherData.location;

        localStorage.setItem('weatherLocation', JSON.stringify({ type: 'coords', query: `${lat},${lon}` }));
        
        const [prayerData, quoteData] = await Promise.all([
            fetchPrayerTimes(lat, lon),
            fetchQuote() 
        ]);

        updateUI(weatherData, prayerData, quoteData);

    } catch (error) {
        console.error("Critical Error in fetchAllData:", error);
        alert("Could not fetch weather data. Please check the city name or your connection.");
        hideLoader();
    }
};

// --- Helper Fetch Functions ---
const fetchWeatherData = async (query) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${query}&aqi=no`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Weather API error: ${response.statusText}`);
    return response.json();
};

const fetchPrayerTimes = async (lat, lon) => {
    const date = new Date();
    const dateStr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lon}&method=2`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Prayer Times API error: ${response.statusText}`);
    return response.json();
};

// *** FINALIZED: This is the only fetchQuote function you need. It's reliable. ***
// This function is resilient. It won't crash your app if the quote API is down.
// *** NEW AND IMPROVED fetchQuote FUNCTION ***
// Replace your old fetchQuote function with this one.
const fetchQuote = async () => {
    try {
        const url = 'https://type.fit/api/quotes';
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Quote API status: ${response.status}`);
        const response2 = await fetch(QUOTE_API_URL);
        if (!response2.ok) throw new Error(`Quote API status: ${response2.status}`);
        const data = await response2.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        return data[randomIndex];
        }
        const data = await response.json();
        
        // The API returns an array of quotes. Pick one at random.
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomQuote = data[randomIndex];

        // Return an object that matches the structure our UI expects.
        // The API gives 'text' and 'author'. We'll rename 'text' to 'content'.
        return {
            content: randomQuote.text,
            author: randomQuote.author.replace(', type.fit', '') || "Unknown" // Clean up author name
        };
        
    } catch (error) {
        console.warn("Could not fetch quote. Using a default one.", error);
        // This default fallback is still our safety net
        return { 
            content: "The best way to predict the future is to create it.",
            author: "Peter Drucker"
        };
    }
};
// *** MODIFIED: Uses your own reliable Gist URL ***
// const fetchQuote = async () => {
    // try {

    // } catch (error) {
    //     console.warn("Could not fetch custom quote. Using a default one.", error);
    //     return { content: "The best way to predict the future is to create it.", author: "Peter Drucker" };
    // }
// };

// --- UI Update Function ---
const updateUI = (weather, prayer, quote) => {
    // Weather & Basic Details
    cityNameEl.textContent = `${weather.location.name}, ${weather.location.country}`;
    tempMainEl.textContent = Math.round(weather.current.temp_c);
    weatherDescEl.textContent = weather.current.condition.text;
    weatherIconEl.src = `https:${weather.current.condition.icon}`;
    feelsLikeEl.textContent = Math.round(weather.current.feelslike_c);
    humidityEl.textContent = weather.current.humidity;
    windSpeedEl.textContent = weather.current.wind_kph;
    
    // Prayer Times & Daily Info
    const prayerTimes = prayer.data.timings;
    
    // *** NEW: Populate the new elements ***
    imsakTimeEl.textContent = format12Hour(prayerTimes.Imsak);
    sunriseTimeEl.textContent = format12Hour(prayerTimes.Sunrise);
    sunsetTimeEl.textContent = format12Hour(prayerTimes.Maghrib); // Sunset is Maghrib
    
    // Update the main prayer times list
    prayerTimesListEl.querySelector('li:nth-child(2) span').textContent = format12Hour(prayerTimes.Fajr);
    prayerTimesListEl.querySelector('li:nth-child(3) span').textContent = format12Hour(prayerTimes.Dhuhr);
    prayerTimesListEl.querySelector('li:nth-child(4) span').textContent = format12Hour(prayerTimes.Asr);
    prayerTimesListEl.querySelector('li:nth-child(5) span').textContent = format12Hour(prayerTimes.Maghrib);
    prayerTimesListEl.querySelector('li:nth-child(6) span').textContent = format12Hour(prayerTimes.Isha);

    // Advanced Islamic Date Logic
    const islamicDate = prayer.data.date.hijri;
    const now = new Date();
    const maghribTime = prayer.data.timings.Maghrib.split(':');
    const maghribDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), maghribTime[0], maghribTime[1]);
    let hijriDay = parseInt(islamicDate.day, 10);
    if (now < maghribDate) {
        hijriDay -= 1;
        if (hijriDay === 0) hijriDay = 30; // Simplified fallback for start of month
    }
    dateIslamicEl.textContent = `${islamicDate.weekday.en}, ${hijriDay} ${islamicDate.month.en}, ${islamicDate.year} AH`;

    // Quote
    quoteTextEl.textContent = `"${quote.content}"`;
    quoteAuthorEl.textContent = `- ${quote.author}`;

    updateBackground(weather.current.condition.text, weather.current.is_day);
    hideLoader();
};

// --- GPS, Search, and LocalStorage Handlers ---
const handleSearch = () => {
    if (cityInput.value) {
        localStorage.setItem('weatherLocation', JSON.stringify({ type: 'city', query: cityInput.value }));
        fetchAllData(cityInput.value);
        cityInput.value = '';
    }
};

const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
        (position) => fetchAllData(`${position.coords.latitude},${position.coords.longitude}`),
        (error) => {
            console.error("Geolocation Error:", error.message);
            alert("Location permission denied. Defaulting to London. Use search or allow location.");
            fetchAllData('London');
        }
    );
};

// --- Utility & Event Listeners ---
const showLoader = () => loader.style.display = 'flex';
const hideLoader = () => loader.style.display = 'none';

const format12Hour = (time24) => {
    if (!time24) return 'N/A';
    const [hours, minutes] = time24.split(':');
    const date = new Date(0, 0, 0, hours, minutes);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

setInterval(() => {
    const now = new Date();
    localTimeEl.textContent = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    dateNormalEl.textContent = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}, 1000);

document.getElementById('gps-btn').addEventListener('click', getUserLocation);
document.getElementById('search-btn').addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSearch(); });

window.addEventListener('load', () => {
    try {
        const savedLocation = JSON.parse(localStorage.getItem('weatherLocation'));
        if (savedLocation && savedLocation.query) {
            fetchAllData(savedLocation.query);
        } else {
            getUserLocation();
        }
    } catch (e) {
        getUserLocation();
    }
});

// --- Background Animation Logic (No changes needed) ---
const updateBackground = (conditionText, isDay) => {
    const body = document.body; body.className = '';
    const rainContainer = document.querySelector('.rain'); rainContainer.innerHTML = '';
    const lowerCaseCondition = conditionText.toLowerCase();
    if (!isDay) { body.classList.add('weather-night'); } 
    else if (lowerCaseCondition.includes('rain') || lowerCaseCondition.includes('drizzle')) {
        body.classList.add('weather-rain');
        for (let i = 0; i < 70; i++) {
            const drop = document.createElement('div'); drop.className = 'raindrop';
            drop.style.left = `${Math.random() * 100}%`; drop.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
            drop.style.animationDelay = `${Math.random() * 2}s`; rainContainer.appendChild(drop);
        }
    } else if (lowerCaseCondition.includes('cloud') || lowerCaseCondition.includes('overcast')) { body.classList.add('weather-clouds'); } 
    else if (lowerCaseCondition.includes('sun') || lowerCaseCondition.includes('clear')) { body.classList.add('weather-clear'); } 
    else { body.classList.add('weather-clear'); }
};
console.alert("Developed by I am Mohid")