const API = process.env.REACT_APP_API_KEY;
const URL = 'https://api.openweathermap.org/data/2.5/weather';
const URLCity = 'http://api.openweathermap.org/geo/1.0/direct';

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export function fetchWeather(lat: number, lon: number) {
  const options = {
    method: 'GET'
  };

  return fetch(`${URL}?lat=${lat}&lon=${lon}&appid=${API}&lang=ru`, options).then(checkResponse);;
}

export function fetchCity(city: string) {
  const options = {
    method: 'GET'
  };

  return fetch(`${URLCity}?q=${city}&limit=1&appid=${API}`, options).then(checkResponse);;
}
