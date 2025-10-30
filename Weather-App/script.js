// Weather condition descriptions based on WMO weather codes
// Source: https://open-meteo.com/en/docs (WMO weather codes)
const weatherDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail"
};

// Cache common DOM elements to avoid repeated lookups
const els = {
  cityField: document.getElementById("cityField"),
  searchBtn: document.getElementById("searchBtn"),
  weatherContainer: document.getElementById("weatherContainer"),
  cityName: document.getElementById("cityName"),
  temperature: document.getElementById("temperature"),
  condition: document.getElementById("condition"),
  windSpeed: document.getElementById("windSpeed"),
  errorMessage: document.getElementById("errorMessage"),
  suggestions: document.getElementById("suggestions"),
  recentSearches: document.getElementById("recentSearches"),
  weatherIcon: document.getElementById("weatherIcon"),
  weatherSkeleton: document.getElementById("weatherSkeleton"),
  unitToggle: document.getElementById("unitToggle"),
};

// Simple in-memory cache for recent lookups (city -> {coords, weather})
const cityCache = new Map();

// Small helper: toggle loading UI on the button and container
function setLoading(isLoading) {
  if (!els.searchBtn) return;
  els.searchBtn.disabled = isLoading;
  els.searchBtn.textContent = isLoading ? "Searching…" : "Search";
  els.searchBtn.setAttribute("aria-busy", String(isLoading));
  if (els.weatherSkeleton && els.weatherContainer) {
    if (isLoading) {
      els.weatherContainer.classList.remove("hidden");
      els.weatherSkeleton.classList.remove("hidden");
    } else {
      els.weatherSkeleton.classList.add("hidden");
    }
  }
}

// Debounce helper to limit how often a function runs
function debounce(fn, delay = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

// Emoji icon mapping for a friendly, dependency-free UI
function getIconForCode(code, isDay) {
  // Basic grouping based on WMO ranges
  if ([95,96,99].includes(code)) return "⛈️"; // thunder
  if ([71,73,75,77,85,86].includes(code)) return "❄️"; // snow
  if ([61,63,65,66,67,80,81,82,51,53,55,56,57].includes(code)) return "🌧️"; // rain/drizzle/showers
  if ([45,48].includes(code)) return "🌫️"; // fog
  if ([3].includes(code)) return "☁️"; // overcast
  if ([1,2].includes(code)) return isDay ? "🌤️" : "☁️"; // mostly clear/partly cloudy
  if (code === 0) return isDay ? "☀️" : "🌙"; // clear day/night
  return "🌡️";
}

// Apply a themed background to body based on weather
function applyTheme(code, isDay) {
  const b = document.body;
  b.classList.remove("clear-day","clear-night","cloudy","rainy","snowy","foggy","thunder");
  let cls = "cloudy";
  if ([95,96,99].includes(code)) cls = "thunder";
  else if ([71,73,75,77,85,86].includes(code)) cls = "snowy";
  else if ([61,63,65,66,67,80,81,82,51,53,55,56,57].includes(code)) cls = "rainy";
  else if ([45,48].includes(code)) cls = "foggy";
  else if ([3,2,1].includes(code)) cls = "cloudy";
  else if (code === 0) cls = isDay ? "clear-day" : "clear-night";
  b.classList.add(cls);
}

// Remember last result to support unit toggle re-render
const lastState = { weather: null, city: "", country: "" };

function toFahrenheit(celsius) { return (celsius * 9) / 5 + 32; }
function formatTemp(celsius) {
  const useF = !!(els.unitToggle && els.unitToggle.checked);
  const val = useF ? toFahrenheit(Number(celsius)) : Number(celsius);
  const unit = useF ? "°F" : "°C";
  return `${val.toFixed(1)}${unit}`;
}

// Fetch with timeout using AbortController
async function fetchWithTimeout(url, options = {}, timeoutMs = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

/** Trigger a search for the current city value */
function searchWeather() {
  const city = els.cityField.value.trim();
  if (city) {
    getCoordinates(city);
  } else {
    showError("Please enter a city name");
  }
}

els.searchBtn.addEventListener("click", searchWeather);

// Allow Enter key to trigger search
els.cityField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchWeather();
  }
});

// Units toggle re-renders with the latest values
if (els.unitToggle) {
  els.unitToggle.addEventListener("change", () => {
    if (lastState.weather) {
      displayWeather(lastState.weather, lastState.city, lastState.country);
    }
  });
}

// Suggestions (typeahead) for city input
const fetchSuggestions = debounce(async (query) => {
  try {
    if (!query || query.length < 2) {
      els.suggestions.classList.add("hidden");
      els.suggestions.innerHTML = "";
      return;
    }
    const res = await fetchWithTimeout(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5`);
    if (!res.ok) return;
    const data = await res.json();
    const items = (data.results || []).map(r => ({
      name: r.name,
      country: r.country,
      latitude: r.latitude,
      longitude: r.longitude,
    }));
    renderSuggestions(items);
  } catch (e) {
    // silently ignore
  }
}, 350);

function renderSuggestions(list) {
  els.suggestions.innerHTML = "";
  if (!list.length) {
    els.suggestions.classList.add("hidden");
    return;
  }
  list.forEach((item, idx) => {
    const li = document.createElement("li");
    li.setAttribute("role", "option");
    li.tabIndex = 0;
    li.textContent = `${item.name}, ${item.country}`;
    li.addEventListener("click", () => {
      els.cityField.value = item.name;
      els.suggestions.classList.add("hidden");
      // Save coords in cache and go straight to weather
      const key = item.name.toLowerCase();
      cityCache.set(key, { coords: { ...item, name: item.name, country: item.country } });
      getWeather(item.latitude, item.longitude, item.name, item.country);
    });
    els.suggestions.appendChild(li);
  });
  els.suggestions.classList.remove("hidden");
}

if (els.cityField) {
  els.cityField.addEventListener("input", (e) => {
    fetchSuggestions(e.target.value.trim());
  });
  els.cityField.addEventListener("blur", () => {
    setTimeout(() => els.suggestions.classList.add("hidden"), 200);
  });
}

/**
 * Resolve a city name to coordinates using Open-Meteo Geocoding API.
 * Success -> calls getWeather()
 */
async function getCoordinates(city) {
  showError("");
  setLoading(true);
  const key = city.toLowerCase();
  try {
    // Use cache if available to reduce API calls
    if (cityCache.has(key) && cityCache.get(key).coords) {
      const { latitude, longitude, name, country } = cityCache.get(key).coords;
      await getWeather(latitude, longitude, name, country);
      return;
    }
    const response = await fetchWithTimeout(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      throw new Error("Location not found");
    }

    const { latitude, longitude, name, country } = data.results[0];
    cityCache.set(key, { coords: { latitude, longitude, name, country } });
    await getWeather(latitude, longitude, name, country);
  } catch (error) {
    const message = error.name === "AbortError" ? "Request timed out" : error.message;
    showError(message || "Failed to fetch location");
  } finally {
    setLoading(false);
  }
}

/**
 * Fetch current weather for provided coordinates.
 * Renders via displayWeather().
 */
async function getWeather(latitude, longitude, city, country) {
  try {
    const response = await fetchWithTimeout(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    if (!response.ok) {
      throw new Error("Weather data not available");
    }

    const data = await response.json();
    // Cache by city name to avoid refetching quickly
    const key = (city || "").toLowerCase();
    if (key) {
      const prev = cityCache.get(key) || {};
      cityCache.set(key, { ...prev, weather: data.current_weather });
    }
    // Update URL to be shareable (?city=...)
    if (city) {
      const url = new URL(window.location);
      url.searchParams.set("city", city);
      window.history.replaceState({}, "", url);
    }
    const w = data.current_weather;
    applyTheme(w.weathercode, !!w.is_day);
    displayWeather(w, city, country);
  } catch (error) {
    const message = error.name === "AbortError" ? "Request timed out" : error.message;
    showError(message || "Failed to fetch weather");
  }
}

/**
 * Render weather values into the DOM.
 */
function displayWeather(weather, city, country) {
  if (!weather) {
    showError("Weather unavailable");
    return;
  }

  const weatherCondition = weatherDescriptions[weather.weathercode] || "Unknown Condition";

  els.weatherContainer.classList.remove("hidden");
  els.cityName.textContent = `${city}, ${country}`;
  if (els.weatherIcon) {
    els.weatherIcon.textContent = getIconForCode(weather.weathercode, !!weather.is_day);
  }
  els.temperature.textContent = `Temperature: ${formatTemp(weather.temperature)}`;
  els.condition.textContent = `Condition: ${weatherCondition}`;
  els.windSpeed.textContent = `Wind Speed: ${Number(weather.windspeed).toFixed(1)} km/h`;
  els.errorMessage.textContent = "";

  // persist last
  lastState.weather = weather;
  lastState.city = city;
  lastState.country = country;

  // add to recent searches
  if (city && country) addRecent(`${city}, ${country}`);
}

/** Show an error and hide the weather container */
function showError(message) {
  els.weatherContainer.classList.add("hidden");
  els.errorMessage.textContent = message || "";
}

// Recent searches (localStorage)
const RECENT_KEY = "recentCities";
function getRecent() {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
function setRecent(list) {
  localStorage.setItem(RECENT_KEY, JSON.stringify(list));
}
function renderRecent() {
  const list = getRecent();
  els.recentSearches.innerHTML = "";
  list.forEach(label => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.type = "button";
    chip.textContent = label;
    chip.addEventListener("click", () => {
      const [city] = label.split(",");
      els.cityField.value = city.trim();
      searchWeather();
    });
    els.recentSearches.appendChild(chip);
  });
}
function addRecent(label) {
  const list = getRecent();
  const exists = list.find(l => l.toLowerCase() === label.toLowerCase());
  const newList = [label, ...list.filter(l => l.toLowerCase() !== label.toLowerCase())].slice(0,5);
  if (!exists || newList.length !== list.length) {
    setRecent(newList);
    renderRecent();
  }
}

// Init: render recent and handle URL ?city= param
function init() {
  renderRecent();
  const params = new URLSearchParams(window.location.search);
  const city = params.get("city");
  if (city) {
    els.cityField.value = city;
    searchWeather();
  }
}
document.addEventListener("DOMContentLoaded", init);