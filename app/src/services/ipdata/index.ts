import { config } from './config';

export const fetchCountryCode = async () => {
  const url = config.baseUrl + config.apiKey;
  const res = await fetch(url);
  if (res.ok) {
    const data = await res.json();
    return data.country_code;
  }
  return 'SE';
};

export const getFlag = (countryCode: string) => {
  return `https://ipdata.co/flags/${countryCode.toLowerCase()}.png`;
};
