# 🌤️ AuraWeather - Your All-in-One Weather & Info Hub

AuraWeather is a beautifully designed, feature-rich weather dashboard that provides not just real-time weather information, but also a suite of helpful daily tools. Built with a focus on aesthetics and user experience, this application features dynamic, animated backgrounds that change with the weather, creating an immersive and pleasant interface.

This project was developed using vanilla **HTML, CSS, and JavaScript**, leveraging multiple public APIs to create a single, cohesive user experience.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://your-live-demo-link.netlify.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

![AuraWeather Screenshot](https://github.com/Mohid-Master/AuraWeather-app/blob/main/screenshot.png)
*(Replace the image link above with a link to your own screenshot)*

---

## ✨ Features

AuraWeather is packed with features designed to provide all the essential information for your day at a single glance.

#### **Core Weather Features**
*   **Real-time Data:** Instantly get the current temperature, "feels like" temperature, and weather conditions.
*   **Detailed Information:** Access humidity levels, wind speed, and a clear weather description (e.g., "Partly cloudy").
*   **Dynamic Icons:** Weather conditions are represented by clear, easy-to-understand icons.

#### **Location Services**
*   **GPS Auto-Detection:** Automatically fetches weather for your current location on page load.
*   **Manual City Search:** Search for any city in the world to get its weather information.
*   **Persistent Location:** The app intelligently remembers your last searched location using LocalStorage, so you don't have to search again every time you visit.

#### **Islamic Information Module**
*   **Daily Prayer Times:** Accurate Namaz times (Fajr, Dhuhr, Asr, Maghrib, Isha) for the user's location.
*   **Sunrise & Imsak:** Provides daily Sunrise and Imsak timings.
*   **Smart Hijri Date:** The Islamic date is intelligently calculated, automatically advancing to the next day after Maghrib time.

#### **Aesthetics & User Experience**
*   **Dynamic Animated Backgrounds:** The entire background of the app changes to reflect the current weather (animated sun, clouds, rain).
*   **Glassmorphism UI:** A modern, clean "frosted glass" effect for all information cards.
*   **Fully Responsive:** The layout is optimized for a seamless experience on all devices, from small mobile screens to large desktops.
*   **Live Clock:** A real-time clock that displays the local time in AM/PM format.

#### **Bonus "Mini-Tool"**
*   **Quote of the Day:** Displays an inspiring quote fetched from a custom, reliable API source.

---

## 🛠️ Technologies & APIs Used

This project was built from the ground up using the following technologies and services:

*   **Frontend:**
    *   ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
    *   ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
    *   ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) (ES6+, Async/Await, Geolocation API)

*   **APIs:**
    *   [**WeatherAPI.com**](https://www.weatherapi.com/): For real-time weather data and geocoding services.
    *   [**Al-Adhan API**](https://aladhan.com/prayer-times-api): For all Islamic data including prayer times, Hijri date, and sunrise.
    *   **GitHub Gist:** Used as a simple, 100% reliable custom API to serve the "Quote of the Day."

*   **Tools:**
    *   ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)    *   ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
    *   ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

---

## 🚀 Setup and Installation

To run this project on your local machine, follow these simple steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```

2.  **Get API Keys:**
    *   **WeatherAPI.com:**
        *   Sign up for a free account at [WeatherAPI.com](https://www.weatherapi.com/).
        *   You will find your API key on your dashboard.
    *   **Quote API (GitHub Gist):**
        *   Follow the instructions in the project documentation to create a `quotes.json` file in a public GitHub Gist.
        *   Click the "Raw" button and copy the URL.

3.  **Update the `script.js` file:**
    *   Open the `script.js` file.
    *   Find the following constants and replace the placeholder values with your key and URL:
    ```javascript
    // Paste your WeatherAPI.com key here
    const WEATHER_API_KEY = 'YOUR_WEATHERAPI_COM_KEY'; 

    // Paste the "Raw" URL from your GitHub Gist here
    const QUOTE_API_URL = 'YOUR_GIST_RAW_URL';
    ```

4.  **Run the Application:**
    *   This project is best viewed using a live server to prevent any potential CORS (Cross-Origin Resource Sharing) errors with the APIs.
    *   If you are using Visual Studio Code, it is highly recommended to install the **"Live Server"** extension.
    *   Once installed, simply right-click the `index.html` file and choose **"Open with Live Server"**.

---

## ⚖️ License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.
