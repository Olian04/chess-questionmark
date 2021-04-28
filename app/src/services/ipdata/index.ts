import { config } from './config';

export const fetchCountryCode = async () => {
  const url = config.baseUrl + config.apiKey;
  const res = await fetch(url);
  const data = await res.json();
  return data.country_code;
};
