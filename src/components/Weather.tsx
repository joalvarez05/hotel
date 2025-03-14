import { useEffect, useState } from "react";
import { Cloud, CloudRain, Sun, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import useScrollAnimation from "@/hooks/useInView.ts";
import { useTranslation } from "react-i18next";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: [{ description: string; icon: string; main: string }];
}

interface ForecastData {
  list: Array<{
    dt_txt: string;
    main: {
      temp: number;
      humidity: number;
      feels_like: number;
    };
    weather: [{ description: string; icon: string; main: string }];
  }>;
}

const Weather: React.FC = () => {
  const { t, i18n } = useTranslation("global");
  const { ref, inView } = useScrollAnimation();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = "6d51cd4aa4deb04d9eaa166f1616a848";
  const CITY = "Buenos Aires";
  const CACHE_TIME = 5 * 60 * 1000;

  useEffect(() => {
    const fetchData = async () => {
      const cachedWeatherData = localStorage.getItem("weatherData");
      const cachedForecastData = localStorage.getItem("forecastData");
      const cachedTime = localStorage.getItem("cacheTime");

      const currentTime = new Date().getTime();

      if (
        cachedWeatherData &&
        cachedForecastData &&
        cachedTime &&
        currentTime - Number(cachedTime) < CACHE_TIME
      ) {
        setWeather(JSON.parse(cachedWeatherData));
        setForecast(JSON.parse(cachedForecastData));
        setLoading(false);
      } else {
        try {
          const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}&lang=${i18n.language}`
            ),
            fetch(
              `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&appid=${API_KEY}&lang=${i18n.language}`
            ),
          ]);

          const weatherData = await weatherResponse.json();
          const forecastData = await forecastResponse.json();

          localStorage.setItem("weatherData", JSON.stringify(weatherData));
          localStorage.setItem("forecastData", JSON.stringify(forecastData));
          localStorage.setItem("cacheTime", currentTime.toString());

          setWeather(weatherData);
          setForecast(forecastData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching weather data:", error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [i18n.language]); 

  const getWeatherIcon = (main: string) => {
    switch (main.toLowerCase()) {
      case "clear":
        return <Sun className="w-10 h-10 text-yellow-400" />;
      case "rain":
        return <CloudRain className="w-10 h-10 text-blue-400" />;
      default:
        return <Cloud className="w-10 h-10 text-gray-400" />;
    }
  };

  const translateWeatherDescription = (description: string) => {
    const descriptionsMap: { [key: string]: string } = {
      clear: t("weather.clear"),
      rain: t("weather.rain"),
      cloudy: t("weather.cloudy"),
      clouds: t("weather.clouds"),
      // Añade aquí más descripciones según sea necesario
    };
    return descriptionsMap[description.toLowerCase()] || description;
  };

  const getDayName = (dateStr: string) => {
    const days = [
      t("weather.sunday"),
      t("weather.monday"),
      t("weather.tuesday"),
      t("weather.wednesday"),
      t("weather.thursday"),
      t("weather.friday"),
      t("weather.saturday"),
    ];
    const date = new Date(dateStr);
    return days[date.getDay()];
  };

  const getForecastDays = () => {
    if (!forecast) return [];

    const uniqueDays = new Map();

    forecast.list.forEach((item) => {
      const date = new Date(item.dt_txt).toLocaleDateString();
      if (!uniqueDays.has(date)) {
        uniqueDays.set(date, item);
      }
    });

    return Array.from(uniqueDays.values()).slice(0, 4);
  };

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto rounded-lg bg-white shadow-lg">
        <div className="flex items-center justify-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-4 md:p-8 shadow-lg">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 2 }}
        className="rounded-lg overflow-hidden"
      >
        <div className="w-full max-w-7xl mx-auto justify-center grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-2">
            <h2 className="text-2xl font-bold text-center text-white mb-1">
              {CITY}
            </h2>
            <h3 className="text-md font-medium text-center text-white mb-6">
              {t("weather.intro", { city: CITY })}
            </h3>

            {weather && (
              <div className="space-y-6">
                {/* Current Weather */}
                <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="text-center">
                    {getWeatherIcon(weather.weather[0].main)}
                    <div className="mt-2">
                      <span className="text-4xl font-bold text-blue-900">
                        {Math.round(weather.main.temp)}°C
                      </span>
                      <p className="text-gray-600 capitalize mt-1">
                        {translateWeatherDescription(weather.weather[0].main)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {t("weather.feels_like")}:{" "}
                        {Math.round(weather.main.feels_like)}°C
                      </p>
                      <p className="text-sm text-gray-500">
                        {t("weather.humidity")}: {weather.main.humidity}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Forecast */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                  {getForecastDays().map((day, index) => (
                    <div
                      key={index}
                      className="bg-white py-2 rounded-lg shadow-sm text-center transform transition-transform duration-200 hover:scale-105"
                    >
                      <p className="font-semibold text-blue-900 mb-2">
                        {index === 0
                          ? t("weather.today")
                          : getDayName(day.dt_txt)}
                      </p>
                      <div className="flex justify-center">
                        {getWeatherIcon(day.weather[0].main)}
                      </div>
                      <p className="text-2xl font-bold text-blue-900 mt-2">
                        {Math.round(day.main.temp)}°C
                      </p>
                      <p className="text-sm text-gray-600 capitalize">
                        {translateWeatherDescription(day.weather[0].main)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <h4 className="text-3xl font-semibold text-white text-center mb-1">
              {t("weather.location_title")}
            </h4>
            <p className="text-md font-medium text-center text-white mb-6">
              {t("weather.location_description")}
            </p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1234.7929356020893!2d-58.38880786249812!3d-34.588944528226406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca99c609fc2f%3A0x392ca99351808a75!2sRecoleta%2C%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1740431473590!5m2!1ses-419!2sar"
              height="400"
              allowFullScreen
              className="rounded-lg w-full shadow-lg brightness-90 hover:brightness-100 duration-300 border-2 border-gray-200 "
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Weather;
